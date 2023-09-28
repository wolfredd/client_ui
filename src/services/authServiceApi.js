import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from '../config';

export const authServiceApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.clientServiceUrl }),
  tagTypes: ["AUTH"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `/auth/register`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["AUTH"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `/auth/authenticate`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["AUTH"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterMutation, useLoginMutation } = authServiceApi;

