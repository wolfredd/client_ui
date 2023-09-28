import { Controller, useForm } from 'react-hook-form';
import { useRegisterMutation } from '../services/authServiceApi';
import { useEffect } from 'react';
import useToast from './useToast';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const navigate = useNavigate();
  const [handleRegisterRequest, { isLoading, isSuccess, isError, error }] = useRegisterMutation();
  const { toast } = useToast();
  const { handleSubmit, control, watch, formState: { errors } } = useForm();

  const onFormSubmit = handleSubmit(data => {
    handleRegisterRequest(data);
  });

  useEffect(() => {
    if (isSuccess) {
      toast({ message: "Registration successful" })
      navigate("/login");
    }
  }, [isSuccess, toast, navigate]);

  useEffect(() => {
    if (isError) {
      toast({
        message: "Registration failed",
        description: error.data?.message,
        isSuccess: false
      })
    }
  }, [isError, toast, error])

  const validateConfirmPassword = (value) => {
    return value === watch('password') || "Passwords don't match.";
  };
  return {
    onFormSubmit,
    control,
    Controller,
    isLoading,
    validateConfirmPassword,
    errors,
  }
};

export default useSignUp;
