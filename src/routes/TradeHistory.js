import { Box, Container, Sheet, Typography } from "@mui/joy";
import { useGetClientOrdersQuery } from "../services/orderServiceApi";
import TradeHistoryTable from "../components/Table/Table";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { FolderOff, Upload } from "@mui/icons-material";

const TradeHistory = () => {
  const state = useSelector(state => state);
  const { authReducer: user } = state || {};
  const { userDetails } = user || {};

  const { isLoading, data } = useGetClientOrdersQuery(userDetails?.id || skipToken, {
    pollingInterval: 3000
  });
  
  return (
    <>
      <Sheet container>
        {
          isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) :
            <Container sx={{ pt: 2 }}>
              <Typography level="h4">Trade history</Typography>
              {
                data && data.length < 1 ?
                  <Box sx={{ textAlign: "center", opacity: 0.45 }}>
                    <Typography level="h5" mb={2}>You haven't placed any orders </Typography>
                    <Upload sx={{ fontSize: '4em' }} />
                  </Box>
                  :
                  <TradeHistoryTable data={data} />

              }
            </Container>
        }
      </Sheet>
    </>
  );
};

export default TradeHistory;
