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
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useTopupAccountMutation } from '../../services/orderServiceApi';
import useToast from '../../hooks/useToast';
import { useEffect } from 'react';

export default function AccountTopupForm({ isLoading, data }) {
  const state = useSelector(state => state);
  const { authReducer: user } = state || {};
  const { userDetails } = user || {};
  const [handleTopUpRequest, { isLoading: isLoadingAccount, isSuccess, isError }] = useTopupAccountMutation();
  const { toast } = useToast()

  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, reset } = useForm();

  const handleAccountTopFormSubmit = handleSubmit((data) => {
    handleTopUpRequest({ amount: data.amount, clientId: userDetails?.id })
  });

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast({ message: 'Account top up successful!' })
      reset({ amount: 0 });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({ message: 'Account top up failed!', isSuccess: false })
    }
  }, [isError]);

  return (
    <React.Fragment>
      <Box
        sx={{ cursor: 'pointer' }}
        onClick={(() => setOpen(true))}
      >
        Credit: {isLoading ? '--' : data}
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Top up your account
          </Typography>
          <form
            onSubmit={handleAccountTopFormSubmit}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Controller
                  control={control}
                  name="amount"
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} autoFocus required type="number" />}
                />

              </FormControl>
              <Button type="submit">Process</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}