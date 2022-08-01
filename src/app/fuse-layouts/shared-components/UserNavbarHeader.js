import React, { useEffect, useState } from "react";
import { isEmpty, isNil } from "lodash";
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

import API from "app/services/constants/api";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  '& .username, & .email': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },

  '& .avatar': {
    background: theme.palette.background.default,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    '& > img': {
      borderRadius: '50%',
    },
  },
}));

function UserNavbarHeader(props) {
  const user = useSelector(({ auth }) => auth.user);
  const [urlImgen, setUrlImgen] = useState('');

  useEffect(() => {
    if (!isEmpty(user) && !isNil(user.usr_avatar)) {
      setUrlImgen(`${API.url_bucket}/${user.usr_id}/${user.usr_avatar}`);
    } else {
      setUrlImgen('');
    }
  }, [user]);

  return (
    <StyledAppBar
      position="static"
      color="primary"
      className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 p-5 shadow-0"
      style={{ background: '#D1E3F5' }}
    >
      <Typography
        className="username text-18  font-semibold mb-4 mx-58 overflow-x-hidden"
        color="inherit"
        style={{ color: '#4C647A', textAlign:'center' }}
      >
        {user.data.name} {user.data.lastname}
      </Typography>
      <Typography
        className="email text-13 opacity-50 whitespace-nowrap font-medium"
        color="inherit"
        style={{ color: '#647F97' }}
      >
        {user.data.displayName}
      </Typography>
      <div className="flex items-center justify-center absolute bottom-0 -mb-36">
        <Avatar
          className="avatar w-72 h-72 box-content"
          alt="user photo"
          src={
            user.data.photoURL && user.data.photoURL !== ''
              ? urlImgen
              : 'assets/images/avatars/profile.jpg'
          }
        />
      </div>
    </StyledAppBar>
  );
}

export default UserNavbarHeader;
