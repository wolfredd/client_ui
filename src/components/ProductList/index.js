import { Card, Grid, Table, Typography } from "@mui/joy";
import { tickerMap } from "../../utils/tickerDetails";
import { setActiveMarketProduct } from "../../store/slices/orders";
import { useDispatch } from "react-redux";

const ProductList = ({ data, exchange }) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Stock</th>
            <th style={{ textAlign: 'right' }}>Bid Price</th>
            <th style={{ textAlign: 'right' }}>Ask Price</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(data) && data.map(prod => (
              <ProductItem key={prod?.TICKER} data={prod} exchange={exchange} />
            ))
          }
        </tbody>
      </Table>
    </div>
  )
};

const ProductItem = ({ data, exchange }) => {
  const dispatch = useDispatch();


  const { TICKER: ticker, BID_PRICE: buy, ASK_PRICE: sell } = data;
  const { name, image } = tickerMap[ticker] || {}
  return (
    <tr
      onClick={() => dispatch(setActiveMarketProduct({ exchange, product: data }))}
      style={{ cursor: 'pointer' }}
    >
      <td style={{ width: '200px', paddingTop: '10px', }}>
        <img alt="name" style={{ maxWidth: '100px', maxHeight: '28px' }} src={image} />
        <Typography level="body2" sx={{ fontSize: '11px' }} >{name}</Typography>
      </td>
      <td sm={4} style={{ maxWidth: '100px', paddingTop: '10px', fontSize: '12px', textAlign: 'right' }}>{buy}</td>
      <td sm={4} style={{ maxWidth: '100px', paddingTop: '10px', fontSize: '12px', textAlign: 'right' }}>{sell}</td>
    </tr>
  )
}

export default ProductList;
