import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { Chip, IconButton } from '@mui/joy';
import { Close, Edit } from '@mui/icons-material';
import { tickerMap } from '../../utils/tickerDetails';
import { formatDate } from '../../utils/helper';

export default function OrderBookTable({ data = [] }) {
  const stripe = "odd";
  return (
    <Sheet sx={{ mt: 2, borderRadius: 'sm', height: 500, overflow: 'scroll' }}>
      <Table aria-label="table" variant="soft" borderAxis="bothBetween" hoverRow stripe={stripe}>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>cum. Qty</th>
            <th>cum. Price</th>
            <th>Type</th>
            <th>Side</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(data) && data.map((order, index) => {
              const rowColor = order.side == 'BUY' ? '#DAF5FF' : '#DFFFD8';
              return (
                <tr key={order.orderID}>
                  <td style={{ width: '20px' }}>{index + 1}</td>
                  <td>{order?.product}</td>
                  <td>{order?.quantity}</td>
                  <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {order?.price}
                  </td>
                  <td>{order?.cumulatitiveQuantity}</td>
                  <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {order?.cumulatitivePrice}
                  </td>
                  <td>{order?.orderType}</td>
                  <td style={{ background: rowColor }}>{order?.side}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Sheet>
  );
}