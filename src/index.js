import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store'
import { Provider } from 'react-redux'
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { toast } from './components/JoyToaster';
import CustomSnackbar from './components/JoyToaster/Toaster';
import { ToastContext } from './context/ToastContext';

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <CssBaseline />
        <Provider store={store}>
          <ToastContext.Provider value={toast}>
            <CustomSnackbar />
            <RouterProvider router={router} />
          </ToastContext.Provider>
        </Provider>
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
