import { Button, Card, CardContent, FormControl, FormHelperText, FormLabel, Input, Option, Select, Typography } from "@mui/joy";
import { Controller } from "react-hook-form";
import useOrderForm from "../../hooks/useOrderForm";

const SubmitOrderForm = () => {
  const { control, processPlaceOrderForm, watch, errors, isLoading, portfolioData } = useOrderForm();

  return (
    <div>
      <form onSubmit={processPlaceOrderForm}>
        <Card
          variant="outlined"
          sx={{
            // maxWidth: "350px",
            margin: "0 auto"
          }}>
          <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Place an order</Typography>
          <CardContent>
            <FormControl error={!!errors.portfolio} sx={{ mb: 1.4 }}>
              <FormLabel sx={{ fontSize: '11px' }}>Select Portfolio</FormLabel>
              <Controller
                control={control}
                name="portfolio"
                rules={{ required: true }}
                render={({ field: { onChange, ...rest } }) =>
                  <Select placeholder="Select portfolio" size="sm" onChange={(_, val2) => onChange(val2)} {...rest}>
                    {
                      Array.isArray(portfolioData) && portfolioData.map(({ portfolioName, id }) => (
                        <Option key={id} value={id}>{portfolioName}</Option>
                      ))
                    }
                  </Select>
                }
              />
              {errors.portfolio && <FormHelperText>Portfolio is required</FormHelperText>}
            </FormControl>

            {
              watch("portfolio") &&
              <FormControl error={!!errors.product} sx={{ mb: 1.4 }}>
                <FormLabel sx={{ fontSize: '11px' }}>Select Product</FormLabel>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="product"
                  render={({ field: { onChange, ...rest } }) =>
                    <Select placeholder="Product" size="sm" onChange={(_, val) => onChange(val)} {...rest}>
                      <Option value="AAPL">Apple</Option>
                      <Option value="IBM">IBM</Option>
                      <Option value="MSFT">Microsoft</Option>
                      <Option value="NFLX">Netflix</Option>
                      <Option value="GOOGL">Google</Option>
                      <Option value="AMZN">Amazon</Option>
                      <Option value="TSLA">Tesla</Option>
                      <Option value="ORCL">Oracle</Option>
                    </Select>
                  }
                />
                {errors.product && <FormHelperText>Product is required</FormHelperText>}
              </FormControl>
            }

            <FormControl error={!!errors.quantity} sx={{ mb: 1.4 }}>
              <FormLabel sx={{ fontSize: '11px' }}>Quantity</FormLabel>
              <Controller
                control={control}
                rules={{ required: true, min: 1 }}
                name="quantity"
                render={({ field }) => <Input placeholder="Enter quantity" size="sm" type="text" {...field} />
                }
              />
              {errors.quantity && <FormHelperText>Quantity must be greater than 0</FormHelperText>}
            </FormControl>

            <FormControl error={!!errors.side} sx={{ mb: 1.4 }}>
              <FormLabel sx={{ fontSize: '11px' }}>Side</FormLabel>
              <Controller
                control={control}
                name="side"
                rules={{ required: true }}
                render={({ field: { onChange, ...rest } }) =>
                  <Select placeholder="Select side" size="sm" onChange={(_, val) => onChange(val)} {...rest}>
                    <Option value="BUY">Buy</Option>
                    <Option value="SELL">Sell</Option>
                  </Select>
                }
              />
              {errors.side && <FormHelperText>Order side is required</FormHelperText>}
            </FormControl>

            <FormControl error={!!errors.type} sx={{ mb: 1.4 }}>
              <FormLabel sx={{ fontSize: '11px' }}>Order Type</FormLabel>
              <Controller
                control={control}
                rules={{ required: true }}
                name="type"
                render={({ field: { onChange, ...rest } }) =>
                  <Select placeholder="Select order type" size="sm" onChange={(_, val) => onChange(val)} {...rest}>
                    <Option value="MARKET">Market</Option>
                    <Option value="LIMIT">Limit</Option>
                  </Select>
                }
              />
              {errors.type && <FormHelperText>Order type is required</FormHelperText>}
            </FormControl>
            {
              watch("type") === "LIMIT" &&
              <FormControl error={!!errors.price} sx={{ mb: 1.4 }}>
                <FormLabel sx={{ fontSize: '11px' }}>Price</FormLabel>
                <Controller
                  control={control}
                  name="price"
                  rules={{ required: true }}
                  render={({ field }) => <Input placeholder="Enter price" size="sm" {...field} type="number" />}
                />
                {errors.price && <FormHelperText>Price is required for limit orders</FormHelperText>}
              </FormControl>
            }

            <Button
              size="sm"
              type="submit"
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
};

export default SubmitOrderForm;