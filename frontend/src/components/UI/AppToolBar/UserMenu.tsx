import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../../types';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunks';
import { selectLogoutLoading } from '../../../features/users/usersSlise';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutLoading = useAppSelector(selectLogoutLoading);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={'/add-one-news'}>Add one news</MenuItem>
        <MenuItem onClick={handleLogout} disabled={logoutLoading}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;