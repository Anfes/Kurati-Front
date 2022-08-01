import React, { useEffect, useState } from "react";
import { isEmpty, isNil } from "lodash";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';

import API from "app/services/constants/api";

function UserMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const [userMenu, setUserMenu] = useState(null);
  const [urlImgen, setUrlImgen] = useState('');

  useEffect(() => {
    if (!isEmpty(user) && !isNil(user.usr_avatar)) {
      setUrlImgen(`${API.url_bucket}/${user.usr_id}/${user.usr_avatar}`);
    } else {
      setUrlImgen('');
    }
  }, [user]);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user.data.displayName}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="textSecondary">
            {user.role.toString()}
            {(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
          </Typography>
        </div>

        { user.data.photoURL && user.data.photoURL !== '' ? (
          <Avatar className="md:mx-4" alt="user photo" src={urlImgen} />
        ) : (
          // <Avatar className="md:mx-4">{user.data.displayName}</Avatar>
          <Avatar src='assets/images/avatars/profile.jpg' className="md:mx-4" />
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/login" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/perfil-usuario" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="Mi perfil" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
