import { useContext, useEffect } from "react";
import { ToastContext } from "../context/ToastContext";
import { useCancelOrderMutation } from "../services/orderServiceApi";
import { ConfirmContext } from "../context/ConfirmContext";

const useTradeHistory = () => {
  const toast = useContext(ToastContext);
  const showConfirmDialog = useContext(ConfirmContext);
  const [cancelOrderRequest, { data, isSuccess, isError, error }] = useCancelOrderMutation();
  const confirmOrderCancellation = (orderId) => {
    showConfirmDialog({
      message: `Are you sure you want to cancel this order`,
      confirmAction: () => cancelOrderRequest(orderId),
      confirmButtonText: "Yes, I want to cancel this order"
    })
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order cancellation successful!")
    }
  }, [data, isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error("Your order could not be cancelled!")
    }
  }, [error, isError]);

  return {
    confirmOrderCancellation,
  }
};

export default useTradeHistory;