import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    exchange: null,
    product: null
  },
  reducers: {
    setActiveMarketProduct(state, action) {
      const { exchange, product } = action.payload;
      state.exchange = exchange;
      state.product = product;
    },
  },
})

const { reducer } = orderSlice
// Extract and export each action creator by name
export const { setActiveMarketProduct } = orderSlice.actions
// Export the reducer, either as a default or named export
export default reducer



