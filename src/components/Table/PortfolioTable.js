import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import { Grid } from '@mui/joy';
import PortfolioCard from '../Card/PortfolioCard';

export default function PortfolioTable({ data = [], stocks = [] }) {
  const getStockCount = (portfolioId) => {
    return stocks.filter(stock => stock.portfolioId === portfolioId).length;
    return 2;
  }
  return (
    <Sheet variant="outlined" sx={{ mt: 2, borderRadius: 'sm', p: 2 }}>
      <Grid container spacing={2}>
        {
          Array.isArray(data) && data.map(({ portfolioName, id }) => (
            <Grid key={id} xs={6} md={3}>
              <PortfolioCard title={portfolioName} id={id} numStocks={getStockCount(id)} />
            </Grid>
          ))
        }
      </Grid>
    </Sheet>
  );
}