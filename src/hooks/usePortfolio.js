import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useClosePortfolioMutation, useCreatePortfolioMutation } from "../services/clientServiceApi";
import { ConfirmContext } from "../context/ConfirmContext";
import useToast from "./useToast";
import { useNavigate } from "react-router-dom";

const usePortfolio = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const showConfirmDialog = useContext(ConfirmContext);
  const navigate = useNavigate();

  const [createPortfolioRequest, {
    isLoading: isLoadingCreatePortfolio,
    isError: isErrorCreatePortfolio,
    error: errorCreatePortfolio,
    isSuccess: isSuccessCreatePortfolio,
  }] = useCreatePortfolioMutation();


  const [closePortfolioRequest, {
    isLoading: isLoadingClosePortfolio,
    isError: isErrorClosePortfolio,
    error: errorClosePortfolio,
    isSuccess: isSuccessClosePortfolio,
  }] = useClosePortfolioMutation();

  const { handleSubmit, control } = useForm();

  const onSubmitCreatePortfolioForm = handleSubmit((data) => {
    createPortfolioRequest(data.portfolioName)
  });

  const confirmClosePortfolio = (portfolioId) => {
    showConfirmDialog({
      message: `Are you sure you want to close your portfolio with id: ${portfolioId}?`,
      title: 'Confirm close portfolio',
      confirmAction: () => closePortfolioRequest(portfolioId),
      confirmButtonText: "Yes, I want to close this portfolio"
    })
  };

  // Create portfolio
  useEffect(() => {
    if (isSuccessCreatePortfolio) {
      toast({
        message: 'Portfolio created successfully!'
      })
      setOpen(false);
    }
  }, [isSuccessCreatePortfolio]);

  useEffect(() => {
    if (isErrorCreatePortfolio) {
      toast({
        message: 'Failed to create portfolio!',
        description: errorCreatePortfolio?.data?.message,
        isSuccess: false,
      })
    }
  }, [isErrorCreatePortfolio, errorCreatePortfolio]);

  // Close portfolio
  useEffect(() => {
    if (isSuccessClosePortfolio) {
      toast({
        message: 'Portfolio closed successfully!'
      })
      setOpen(false);
      navigate('/app/portfolio')
    }
  }, [isSuccessClosePortfolio]);

  useEffect(() => {
    if (isErrorCreatePortfolio) {
      toast({
        message: 'Failed to close portfolio!',
        description: errorClosePortfolio?.data?.message,
        isSuccess: false,
      })
    }
  }, [isErrorClosePortfolio, errorClosePortfolio]);

  return {
    Controller,
    control,
    onSubmitCreatePortfolioForm,
    open,
    setOpen,
    isLoadingCreatePortfolio,
    isLoadingClosePortfolio,
    confirmClosePortfolio
  }
};

export default usePortfolio;