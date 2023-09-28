import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { Chip, IconButton } from '@mui/joy';
import { Close, Edit } from '@mui/icons-material';
import { tickerMap } from '../../utils/tickerDetails';
import useTradeHistory from '../../hooks/useTradeHistory';
import { formatDate } from '../../utils/helper';

export default function TradeHistoryTable({ data = [] }) {
  const stripe = 'odd';
  const { confirmOrderCancellation } = useTradeHistory();

  return (
    <Sheet variant="outlined" sx={{ mt: 2, borderRadius: 'sm' }}>
      <Table aria-label="striped table" stripe={stripe}>
        <thead>
          <tr>
            <th>Date/time</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>cumQty</th>
            <th>Side</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(data) && data.map(trade => {
              let statusColor = "warning"
              if (trade?.status == "CANCELLED") {
                statusColor = "danger"
              }
              if (trade?.status == "FILLED") {
                statusColor = "success"
              }
              return (
                <tr key={trade.id}>
                  <td>{formatDate(new Date(trade.timestamp) || new Date())}</td>
                  <td>
                    <img
                      alt={trade.product}
                      style={{ maxWidth: '48px', maxHeight: '24px' }}
                      src={tickerMap[trade.product]?.image}
                    />
                    {/* {trade.product} */}
                  </td>
                  <td>{trade.quantity}</td>
                  <td>{trade.cumulativeQuantity || 0}</td>
                  <td>{trade.side}</td>
                  <td>{trade.type}</td>
                  <td>{trade.price || 'N/A'}</td>
                  <td>
                    <Chip
                      size="sm"
                      color={statusColor}
                      variant="soft">
                      {trade.status || 'PENDING'}
                    </Chip>
                  </td>
                  <td>
                    {
                      (!trade?.status || trade?.status == "PENDING") &&
                      <>
                        {/* <IconButton size='sm' sx={{ mr: 1 }}><Edit /></IconButton> */}
                        <IconButton
                          onClick={() => confirmOrderCancellation(trade.id)}
                          size="sm" color="danger"
                        >
                          <Close />
                        </IconButton>
                      </>
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Sheet>
  );
}