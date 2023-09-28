import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';
import { ConfirmContext } from '../../context/ConfirmContext';
import { useState } from 'react';

export default function ConfirmDialogWrapper({ children }) {
  const [open, setOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(() => () => { console.log('Confirm action called') });
  const [confirmButtonText, setConfirmButtonText] = useState();

  const showConfirmDialog = ({
    title = "Confirmation",
    message = "Are you sure want to continue with this action",
    confirmAction = () => { },
    confirmButtonText = "Yes"
  }) => {
    setOpen(true);
    setConfirmMessage(message);
    setConfirmTitle(title);
    setConfirmAction(() => () => { confirmAction(); setOpen(false) });
    setConfirmButtonText(confirmButtonText)

  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            {confirmTitle}
          </Typography>
          <Divider />
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
            {confirmMessage}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={() => confirmAction()}>
              {confirmButtonText}
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
      <ConfirmContext.Provider value={showConfirmDialog}>
        {children}
      </ConfirmContext.Provider>
    </>
  );
}
