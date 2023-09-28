import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { retrieveTokenFromLocalStorage } from "../utils/helper";
import { saveUserDetails, signIn } from "../store/slices/auth";
import { useGetClientPortfolioQuery, useGetCurrentClientQuery } from "../services/clientServiceApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const useApp = () => {
  const dispatch = useDispatch();
  const [allowClientDataRequest, setAllowClientDataRequest] = useState(skipToken);
  const [allowFetchPortfolio, setAllowFetchPortfolio] = useState(skipToken);
  const {
    data: clientData,
    isLoading: isLoadingClientData,
    isSuccess: isSuccessDataClientData
  } = useGetCurrentClientQuery(allowClientDataRequest);

  const state = useSelector(state => state);
  const { authReducer: user } = state || {};
  const { token } = user || {};
  const navigate = useNavigate();
  const { data, isLoading } = useGetClientPortfolioQuery(allowFetchPortfolio);

  useEffect(() => {
    const localToken = retrieveTokenFromLocalStorage();
    if (localToken) {
      dispatch(signIn({ token: localToken }))
    }
    if (!token && !localToken) navigate('/login')
  }, [token, navigate, dispatch]);

  useEffect(() => {
    if (token) {
      setAllowClientDataRequest(Math.random());
    }
  }, [token]);

  useEffect(() => {
    if (clientData) {
      dispatch(saveUserDetails(clientData))
      setAllowFetchPortfolio(clientData?.id)
    }
  }, [clientData, dispatch]);

  return {
    token
  }
};

export default useApp;