import { Stack, Sheet } from "@mui/joy"
import { NavLink } from "react-router-dom";
import './menu.css';

const Menu = () => {
  const menuLinks = [
    { title: "Dashboard", to: "/app/" },
    { title: "Portfolio", to: "/app/portfolio" },
    { title: "Trade history", to: "/app/trade-history" },
  ];

  const sheetStyle = { background: 'none', color: '#fff' }
  return (
    <Stack direction="row" spacing={3}>
      {
        menuLinks.map(({ title, to }) => (
          <Sheet key={title} sx={sheetStyle}>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? "menu-item active"
                  : isPending
                    ? "menu-item pending"
                    : "menu-item"
              }
              to={to}
            >
              {title}
            </NavLink>
          </Sheet>
        ))
      }
    </Stack>
  )
};

export default Menu;