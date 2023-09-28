import { useForm } from "react-hook-form";
import { usePlaceOrderMutation } from "../services/orderServiceApi";
import { ToastContext } from "../context/ToastContext";
import { useContext, useEffect } from "react";
import { useGetClientPortfolioQuery } from "../services/clientServiceApi";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const useOrderForm = () => {
  const toast = useContext(ToastContext);
  const userDetails = useSelector(({ authReducer: { userDetails } }) => userDetails)
  const { handleSubmit, control, reset, watch, formState: { errors } } = useForm();
  const [placeOrderRequest, { data, isLoading, isSuccess, isError, error }] = usePlaceOrderMutation();
  const { data: portfolioData } = useGetClientPortfolioQuery(userDetails?.id || skipToken);

  const processPlaceOrderForm = handleSubmit((data) => {
    placeOrderRequest({ clientId: userDetails?.id, ...data });
  });


  useEffect(() => {
    if (data && isSuccess) {
      toast.success("Order successfully created!")
      reset({
        portfolio: "",
        product: "",
        quantity: "",
        side: "",
        type: "",
      });
    }
  }, [data, toast, isSuccess, reset])

  useEffect(() => {
    if (isError) {
      const statusMsg = (error?.status === 400) ? "Invalid request data" : "An unexpected error occurred"
      const errMsg = error?.data?.message || statusMsg;
      toast.error("Failed to create order!", {
        description: errMsg,
      })
    }
  }, [isError, error, toast])

  return {
    processPlaceOrderForm,
    control,
    isLoading,
    watch,
    errors,
    portfolioData,
  }
};

export default useOrderForm;