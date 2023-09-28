import { Box, Card, Grid, Sheet, Typography } from "@mui/joy"
import SubmitOrderForm from "../components/OrderForm";
import ProductList from "../components/ProductList";
import TradingAreaChart from "../components/AreaChart";
import { useGetClosedOrdersQuery, useGetOpenOrdersQuery, useGetPriceHistoryQuery, useGetProductsQuery } from "../services/orderServiceApi";
import ProductTabbedCard from "../components/Tab/ProductTabs";
import { CardContent, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { tickerMap } from "../utils/tickerDetails";
import GenericTabbedCard from "../components/Tab/GenericTabs";
import OrderBook from "../components/OrderBook";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import { setActiveMarketProduct } from "../store/slices/orders";

const Dashboard = () => {
  const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery(null, {
    pollingInterval: 3000
  });
  const orderReducer = useSelector(({ orderReducer }) => orderReducer);
  const { exchange, product } = orderReducer || {};
  const { TICKER, LAST_TRADED_PRICE, BID_PRICE, ASK_PRICE, MAX_PRICE_SHIFT } = product || {};
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (products && !(exchange)) {
      const prodData = Object.entries(products);
      if (prodData.length > 0) {
        const [exchangeName, productList] = prodData[0];
        dispatch(setActiveMarketProduct({
          exchange: exchangeName,
          product: productList.length > 0 ? productList[0] : {}
        }))
      }
    }
  }, [products, dispatch, exchange]);

  const {
    data: openOrders,
    isLoading: isLoadingOpenOrders,
    isError: isErrorOpenOrders,
    isSuccess: isSuccessOpenOrders
  } = useGetOpenOrdersQuery(!exchange || !product ? skipToken : { exchange, product: TICKER })

  const {
    data: closedOrders,
    isLoading: isLoadingClosedOrders,
    isError: isErrorClosedOrders,
    isSuccess: isSuccessClosedOrders
  } = useGetClosedOrdersQuery(!exchange || !product ? skipToken : { exchange, product: TICKER })

  const {
    data: priceHistory,
    isLoading: isLoadingPriceHistory,
    isError: isErrorPriceHistory,
    isSuccess: isSuccessPriceHistory
  } = useGetPriceHistoryQuery(!exchange || !product ? skipToken : { exchange, product: TICKER })

  return (
    <div style={{ paddingTop: "20px" }}>
      <Sheet sx={{ padding: '10px' }}>
        <Grid container spacing={2}>
          <Grid md={3} xs={12}>
            {
              isLoadingProducts ? <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <CircularProgress /></Box> :
                <ProductTabbedCard productData={products} />
            }
          </Grid>
          <Grid md={6} xs={12}>
            <GenericTabbedCard
              data={{
                headers: ["Market Trend", "Open Orders", "Closed Orders"],
                contentList: [
                  <>
                    <Typography level="body3" mb={2}>Exchange: {exchange}</Typography>
                    <img src={tickerMap[TICKER]?.image} style={{ width: 'auto', maxHeight: '36px', maxWidth: '80px' }} />
                    <Typography level="h4" mb={2}>Price history for {tickerMap[TICKER]?.name} ({TICKER})</Typography>
                    <Grid container spacing={2} mb={2}>
                      <Grid>
                        <Card size="sm" variant="outlined">
                          <Typography level="body3">Last Traded Price</Typography>
                          <Typography level="h5">{LAST_TRADED_PRICE}</Typography>
                        </Card>
                      </Grid>
                      <Grid>
                        <Card size="sm" variant="outlined">
                          <Typography level="body3">Bid Price</Typography>
                          <Typography level="h5">{BID_PRICE}</Typography>
                        </Card>
                      </Grid>
                      <Grid>
                        <Card size="sm" variant="outlined">
                          <Typography level="body3">Ask Price</Typography>
                          <Typography level="h5">{ASK_PRICE}</Typography>
                        </Card>
                      </Grid>
                      <Grid>
                        <Card size="sm" variant="outlined">
                          <Typography level="body3">Max Price Shift</Typography>
                          <Typography level="h5">{MAX_PRICE_SHIFT}</Typography>
                        </Card>
                      </Grid>
                    </Grid>
                    <div style={{ position: 'relative', height: "400px", width: "100%" }}>
                      <TradingAreaChart data={priceHistory} isLoading={isLoadingPriceHistory} />
                    </div>
                  </>,
                  <OrderBook data={openOrders} isLoading={isLoadingOpenOrders} />,
                  <OrderBook data={closedOrders} isLoading={isLoadingClosedOrders} />
                ]
              }}
            />

          </Grid>
          <Grid md={3} xs={12}>
            <SubmitOrderForm />
          </Grid>
        </Grid>
      </Sheet>
    </div>
  )
}

export default Dashboard;