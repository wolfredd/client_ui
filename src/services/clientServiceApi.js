import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '../config';

export const clientServiceApi = createApi({
  reducerPath: 'clientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.clientServiceUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authReducer?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["PORTFOLIO", "AUTH", "STOCK"],
  endpoints: (builder) => ({
    getClientStocks: builder.query({
      query: (clientId) => `/stock/getstocksbyclientid/${clientId}`,
      providesTags: ["STOCK"],
    }),
    getClientPortfolio: builder.query({
      query: (clientId) => `/portfolio/getports/${clientId}`,
      providesTags: ["PORTFOLIO"],
    }),
    getCurrentClient: builder.query({
      query: () => `/client/currentClient`,
      providesTags: ["AUTH"]
    }),
    createPortfolio: builder.mutation({
      query: (portfolioName) => ({
        url: `/portfolio/createport/${portfolioName}`,
        method: 'POST',
      }),
      invalidatesTags: ["PORTFOLIO"]
    }),
    closePortfolio: builder.mutation({
      query: (portfolioId) => ({
        url: `/portfolio/deleteport/${portfolioId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["PORTFOLIO", "STOCK"]
    }),
    addStockToPortfolio: builder.mutation({
      query: ({ portfolioId, stockName }) => ({
        url: `/stock/createstock/${portfolioId}?stockname=${stockName}`,
        method: 'POST',
      }),
      invalidatesTags: ["STOCK"]
    })
  }),
});

export const {
  useGetClientPortfolioQuery,
  useGetClientStocksQuery,
  useGetCurrentClientQuery,
  useCreatePortfolioMutation,
  useAddStockToPortfolioMutation,
  useClosePortfolioMutation,
} = clientServiceApi;

