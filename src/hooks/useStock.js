import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useToast from "./useToast";
import { useAddStockToPortfolioMutation } from "../services/clientServiceApi";

const useStock = (portfolioId = null) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [createStockRequest, {
    isLoading: isLoadingCreateStock,
    isError: isErrorCreateStock,
    error: errorCreateStock,
    isSuccess: isSuccessCreateStock,
  }] = useAddStockToPortfolioMutation();

  const { handleSubmit, control, setValue } = useForm();

  const onSubmitCreateStockForm = handleSubmit((data) => {
    createStockRequest(data)
  });

  useEffect(() => {
    setValue("portfolioId", portfolioId);
  }, [portfolioId]);

  useEffect(() => {
    if (isSuccessCreateStock) {
      toast({
        message: 'Stock added successfully!'
      })
      setOpen(false);
    }
  }, [isSuccessCreateStock]);

  useEffect(() => {
    if (isErrorCreateStock) {
      toast({
        message: 'Failed to add stock to your portfolio!',
        description: errorCreateStock?.data?.message,
        isSuccess: false,
      })
    }
  }, [isErrorCreateStock, errorCreateStock]);

  return {
    Controller,
    control,
    onSubmitCreateStockForm,
    open,
    setOpen,
    isLoadingCreateStock,
  }
};

export default useStock;