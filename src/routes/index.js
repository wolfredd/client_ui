import {
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "../error-page";
import Dashboard from './Dashboard'
import App from './App';
import TradeHistory from "./TradeHistory";
import Signup from "./Signup";
import Login from "./Login";
import LandingPage from "./Home";
import Portfolio from "./Portfolio";
import PortfolioHome from "./PortfolioHome";
import PortfolioDetails from "./PortfolioDetails";

export const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/app",
        element: <Dashboard />,
      },
      {
        path: "/app/portfolio",
        element: <Portfolio />,
        children: [
          {
            path: "",
            element: <PortfolioHome />
          },
          {
            path: ":portfolioId",
            element: <PortfolioDetails />
          }
        ]
      },
      {
        path: "/app/trade-history",
        element: <TradeHistory />
      },
      {
        path: "/app/account",
        element: <>We have the account balance here</>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
]);

