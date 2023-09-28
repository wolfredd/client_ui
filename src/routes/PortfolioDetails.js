import { Box, Button, Divider, Sheet, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetClientPortfolioQuery, useGetClientStocksQuery } from "../services/clientServiceApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Add, Close, Delete, FolderOpen } from "@mui/icons-material";
import StockForm from "../components/StockForm";
import StockTable from "../components/Table/StockTable";
import usePortfolio from "../hooks/usePortfolio";
import { useEffect } from "react";

const PortfolioDetails = () => {
  const navigate = useNavigate();
  const { portfolioId } = useParams();
  const state = useSelector(state => state);
  const { authReducer } = state || {};
  const { userDetails } = authReducer || {};
  const { data, isLoading, isSuccess } = useGetClientPortfolioQuery(userDetails?.id || skipToken);
  const { data: stocks, isLoading: isLoadingStocks, isSuccess: isSuccessStocks } = useGetClientStocksQuery(userDetails?.id || skipToken);
  const filteredStocks = stocks?.filter(stockItem => stockItem.portfolioId == portfolioId);
  const portfolioName = data?.find(({ id }) => portfolioId == id)?.portfolioName;
  const { confirmClosePortfolio, isLoadingClosePortfolio } = usePortfolio();

  useEffect(() => {
    if (isSuccess && !portfolioName) {
      navigate("/app/portfolio");
    }
  }, [isSuccess, portfolioName]);

  return (
    <>
      <Divider></Divider>
      <Typography level="h5" sx={{ textAlign: 'center' }}>{portfolioName}</Typography>
      <StockForm portfolioId={portfolioId} />

      {
        (isSuccessStocks && filteredStocks.length < 1) && (
          <Box sx={{ textAlign: "center", opacity: 0.45 }}>
            <Typography level="h5" mb={2}>You don't have any stocks in this portfolio</Typography>
            <FolderOpen sx={{ fontSize: '4em' }} />
          </Box>
        )
      }

      {
        (isSuccessStocks && filteredStocks.length > 0) && (
          <StockTable data={filteredStocks} />
        )
      }

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
        {
          portfolioName != "Default" &&
          <Button
            disabled={isLoadingClosePortfolio}
            variant="solid"
            color="danger"
            startDecorator={<Delete />}
            onClick={() => confirmClosePortfolio(portfolioId)}
          >
            {isLoadingClosePortfolio ? 'Processing...' : `Close ${portfolioName} portfolio`}
          </Button>
        }

      </Box>

    </>
  );
};

export default PortfolioDetails;
