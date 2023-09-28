import { Container, Sheet, Typography } from "@mui/joy";
import { Outlet } from "react-router-dom";

const Portfolio = () => {

  return (
    <>
      <Sheet container>
        <Container sx={{ pt: 2, minHeight: '500px' }}>
          <Typography level="h4">Portfolio</Typography>
          <Outlet />
        </Container>
      </Sheet>
    </>
  );
};

export default Portfolio;
