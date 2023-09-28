import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { orderServiceApi } from '../services/orderServiceApi'
import { authServiceApi } from '../services/authServiceApi'
import { clientServiceApi } from '../services/clientServiceApi'
import authReducer from './slices/auth';
import orderReducer from './slices/orders';

export const store = configureStore({
  reducer: {
    authReducer,
    orderReducer,
    // Add the generated reducer as a specific top-level slice
    [orderServiceApi.reducerPath]: orderServiceApi.reducer,
    [authServiceApi.reducerPath]: authServiceApi.reducer,
    [clientServiceApi.reducerPath]: clientServiceApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      orderServiceApi.middleware,
      authServiceApi.middleware,
      clientServiceApi.middleware,
    ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)


