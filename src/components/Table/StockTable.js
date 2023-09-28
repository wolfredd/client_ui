import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { Chip, IconButton } from '@mui/joy';
import { Close, Edit } from '@mui/icons-material';
import { tickerMap } from '../../utils/tickerDetails';
import { formatDate } from '../../utils/helper';

export default function StockTable({ data = []}) {
  const stripe = 'odd';

  return (
    <Sheet variant="outlined" sx={{ mt: 2, borderRadius: 'sm' }}>
      <Table aria-label="striped table" stripe={stripe}>
        <thead>
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Stock</th>
            <th>Quantity</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(data) && data.map((stockItem, index) => {
              return (
                <tr key={stockItem.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      alt={stockItem.product}
                      style={{ maxWidth: '48px', maxHeight: '24px' }}
                      src={tickerMap[stockItem.stockName]?.image}
                    />
                    {/* {stockItem.product} */}
                  </td>
                  <td>{stockItem.stockName}</td>
                  <td>{stockItem.quantity}</td>
                  {/* <td>
                    <IconButton
                      onClick={() => {}}
                      size="sm" color="danger"
                    >
                      <Close />
                    </IconButton>
                  </td> */}
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Sheet>
  );
}