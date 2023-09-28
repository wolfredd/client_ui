import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '../config';

export const orderServiceApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.orderServiceUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authReducer?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ORDERS", "PRODUCT"],
  endpoints: (builder) => ({
    getClientOrders: builder.query({
      query: (clientId) => `/order/client/${clientId}/all`,
      providesTags: ["ORDERS", "ACCOUNT-BALANCE"],
    }),
    placeOrder: builder.mutation({
      query: (body) => ({
        url: "/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ORDERS"],
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["ORDERS"],
    }),
    getProducts: builder.query({
      query: () => `/product/all`,
      providesTags: ["PRODUCT"],
    }),
    getOpenOrders: builder.query({
      query: ({ product, exchange }) => `/order/product/${product}/status/open/exchange/${exchange}`,
      providesTags: ["ORDERS"],
    }),
    getClosedOrders: builder.query({
      query: ({ product, exchange }) => `/order/product/${product}/status/closed/exchange/${exchange}`,
      providesTags: ["ORDERS"],
    }),
    getAccountBalance: builder.query({
      query: (clientId) => `/account-balance/${clientId}`,
      providesTags: ["ACCOUNT-BALANCE"],
    }),
    topupAccount: builder.mutation({
      query: ({ clientId, amount }) => ({
        url: `/account-balance/${clientId}`,
        method: "POST",
        body: { amount }
      }),
      invalidatesTags: ["ACCOUNT-BALANCE"],
    }),
    getPriceHistory: builder.query({
      query: ({ product, exchange }) => `/order/price-history/${product}/${exchange}`,
      providesTags: ["ORDERS"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetClientOrdersQuery,
  usePlaceOrderMutation,
  useCancelOrderMutation,
  useGetProductsQuery,
  useGetClosedOrdersQuery,
  useGetOpenOrdersQuery,
  useGetAccountBalanceQuery,
  useGetPriceHistoryQuery,
  useTopupAccountMutation,
} = orderServiceApi;

