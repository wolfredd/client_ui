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
import { Box, Sheet } from '@mui/joy';
import usePortfolio from '../../hooks/usePortfolio';

export default function PortfolioForm() {
  const {
    Controller,
    control,
    onSubmitCreatePortfolioForm,
    open,
    setOpen,
    isLoadingCreatePortfolio
  } = usePortfolio();
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
          Create new Portfolio
        </Button>
      </Sheet>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Create new portfolio
          </Typography>
          <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
            Fill in the information for your portfolio.
          </Typography>
          <form
            onSubmit={onSubmitCreatePortfolioForm}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Portfolio name</FormLabel>
                <Controller
                  control={control}
                  name="portfolioName"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input {...field} type="text" />
                  )}
                />
              </FormControl>
              <Button disabled={isLoadingCreatePortfolio} type="submit">
                {isLoadingCreatePortfolio ? 'Processing' : 'Create Portfolio'}
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment >
  );
}