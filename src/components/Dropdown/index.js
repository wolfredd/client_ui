import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Person } from '@mui/icons-material';
import useSignout from '../../hooks/useSignout';
import { useSelector } from 'react-redux';

export default function UserMenu() {
  const state = useSelector(state => state);
  const { authReducer: user } = state || {};
  const { userDetails } = user || {};

  const { processSignOut } = useSignout();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const createHandleClose = (index) => () => {
    setAnchorEl(null);
    if (typeof index === 'number') {
      setSelectedIndex(index);
    }
  };

  return (
    <div>
      <Button
        id="selected-demo-button"
        aria-controls={open ? 'selected-demo-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        startDecorator={<Person />}
      >
        {userDetails?.firstName} {userDetails?.lastName}
      </Button>
      <Menu
        id="selected-demo-menu"
        anchorEl={anchorEl}
        sx={{ minWidth: '200px' }}
        open={open}
        onClose={createHandleClose(-1)}
        aria-labelledby="selected-demo-button"
      >
        <MenuItem
          {...(selectedIndex === 2 && { selected: true, variant: 'soft' })}
          onClick={
            () => {
              processSignOut();
              createHandleClose(2);
            }
          }
        >
          Log out
        </MenuItem>
      </Menu>
    </div >
  );
}