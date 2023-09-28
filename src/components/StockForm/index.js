import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import { Box, Option, Select, Sheet } from '@mui/joy';
import useStock from '../../hooks/useStock';
import { tickerMap } from '../../utils/tickerDetails';

export default function StockForm({ portfolioId }) {
  const {
    Controller,
    control,
    onSubmitCreateStockForm,
    open,
    setOpen,
    isLoadingCreateStock
  } = useStock(portfolioId);

  return (
    <React.Fragment>
      <Sheet sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          Add stock to portfolio
        </Button>
      </Sheet>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Add stock to Portfolio
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Select stock to add
          </Typography>
          <form
            onSubmit={onSubmitCreateStockForm}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Stock name</FormLabel>
                <Controller
                  control={control}
                  name="stockName"
                  rules={{ required: true }}
                  render={({ field: { onChange, ...rest } }) => (
                    <Select placeholder="Select stock" size="sm" onChange={(_, val2) => onChange(val2)} {...rest}>
                      <Option value="">Select stock</Option>
                      {
                        Object.keys(tickerMap).map(ticker => <Option key={ticker} value={ticker}>{ticker}</Option>)
                      }
                    </Select>
                  )}
                />
              </FormControl>
              <Button disabled={isLoadingCreateStock} type="submit">
                {isLoadingCreateStock ? 'Processing' : 'Add to portfolio'}
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}