import PortfolioTable from "../components/Table/PortfolioTable";
import PortfolioForm from "../components/PortfolioForm";
import { useGetClientPortfolioQuery, useGetClientStocksQuery } from "../services/clientServiceApi";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { CircularProgress } from "@mui/material";

const PortfolioHome = () => {
  const state = useSelector(state => state);
  const { authReducer } = state || {};
  const { userDetails } = authReducer || {};
  const { data, isLoading } = useGetClientPortfolioQuery(userDetails?.id || skipToken);
  const { data: stocks, isLoading: isLoadingStocks } = useGetClientStocksQuery(userDetails?.id || skipToken);

  return (
    <>
      {
        isLoading ? <CircularProgress /> :
      <>
        <PortfolioForm />
        <PortfolioTable data={data} stocks={stocks} />
      </>
        }
    </>
  );
};

export default PortfolioHome;
