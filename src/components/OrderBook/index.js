import { Box } from "@mui/joy";
import OrderBookTable from "../Table/OrderBookTable";
import { CircularProgress } from "@mui/material";

const OrderBook = ({ data, exchange, product, isLoading }) => {
  return (
    <>
      {
        isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box> :
          <OrderBookTable data={data} />
      }
    </>
  )
};

export default OrderBook;
