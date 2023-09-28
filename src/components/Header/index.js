import { Card, CardContent, Sheet, Stack } from "@mui/joy";
import UserMenu from "../Dropdown";
import Menu from "./Menu";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAccountBalanceQuery } from "../../services/orderServiceApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import AccountTopupForm from "../AccountTopUpForm";

const Header = () => {
  const state = useSelector(state => state);
  const { authReducer } = state || {};
  const { userDetails } = authReducer || {};
  const { data, isLoading, isSuccess } = useGetAccountBalanceQuery(userDetails?.id || skipToken, {
    pollingInterval: 3000,
  });

  return (
    <Card variant="outlined" sx={{ borderRadius: 0, background: '#096bde' }}>
      <CardContent >
        <Sheet sx={{ borderRadius: 0, background: '#096bde' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Sheet sx={{ background: '#096bde' }}>
              <NavLink to="/app/"><Logo /></NavLink>
            </Sheet>
            <Sheet sx={{ background: 'none' }}>
              <Menu />
            </Sheet>
            <Sheet sx={{ background: '#096bde' }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Sheet sx={{
                  fontSize: '1em',
                  fontWeight: 'bold',
                  border: '2px solid #fff',
                  color: '#fff',
                  background: 'none',
                  px: 1,
                  py: 0.5
                }}>
                  <AccountTopupForm isLoading={isLoading} data={data} />
                </Sheet>
                <Sheet sx={{ borderRadius: 0, background: '#096bde' }}><UserMenu /></Sheet>
              </Stack>
            </Sheet>
          </Stack>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header;