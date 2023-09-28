import { Controller, useForm } from 'react-hook-form';
import { useLoginMutation } from '../services/authServiceApi';
import { useEffect } from 'react';
import useToast from './useToast';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../store/slices/auth';
import { useDispatch } from 'react-redux';
import { saveAuthTokenToLocalStorage } from '../utils/helper';

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [handleLoginRequest, { isLoading, isSuccess, data, isError, error }] = useLoginMutation();
  const { toast } = useToast();
  const { handleSubmit, control } = useForm();

  const onFormSubmit = handleSubmit(data => {
    handleLoginRequest(data);
  });

  useEffect(() => {
    if (isSuccess) {
      saveAuthTokenToLocalStorage(data?.token);
      dispatch(signIn(data));
      navigate("/app");
    }
  }, [isSuccess, dispatch, navigate, data, toast]);

  useEffect(() => {
    if (isError) {
      toast({
        message: "Invalid email/password combination",
        description: error.data?.message,
        isSuccess: false
      })
    }
  }, [isError, toast, error])

  return {
    onFormSubmit,
    control,
    Controller,
    isLoading,
  }
};

export default useSignIn;
