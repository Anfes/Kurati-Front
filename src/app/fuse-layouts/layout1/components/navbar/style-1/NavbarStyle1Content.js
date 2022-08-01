import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import UserNavbarHeader from 'app/fuse-layouts/shared-components/UserNavbarHeader';
import { logoutUser } from 'app/auth/store/userSlice';
import clsx from 'clsx';
import { memo } from 'react';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: '#F9FCFF',
  color: '#023E73',
  '& ::-webkit-scrollbar-thumb': {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
      }`,
  },
  '& ::-webkit-scrollbar-thumb:active': {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
      }`,
  },
}));

const StyledContent = styled(FuseScrollbars)(({ theme }) => ({
  overscrollBehavior: 'contain',
  overflowX: 'hidden',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  background:
    'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 40px, 100% 10px',
  backgroundAttachment: 'local, scroll',
  height: '100%  '
}));

const ItemList = styled(ListItem)(({ theme, ...props }) => ({
  height: 40,
  width: '100%',
  borderRadius: '6px',
  margin: '0 0 4px 0',
  paddingRight: 12,
  paddingLeft: props.itempadding,
  cursor: 'pointer',
  textDecoration: 'none!important',
  '&:hover': {
    color: '#023E73',
    fontWeight: 'bold !important'
  },
  '&.active': {
    fontWeight: 'bold !important',
    color: '#023E73',
    backgroundColor: '#D0E9FF',
    pointerEvents: 'none',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .fuse-list-item-text-primary': {
      color: '#023E73',
      fontWeight: 'bold !important'
    },
    '& > .fuse-list-item-icon': {
      color: 'inherit',
    },
  },
  '& >.fuse-list-item-icon': {
    marginRight: 12,
    color: 'inherit',
  },
  '& > .fuse-list-item-text': {},
}));

function NavbarStyle1Content(props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Root className={clsx('flex flex-auto flex-col overflow-hidden h-full', props.className)}>
      <AppBar
        position="static"
        className="flex flex-row items-center flex-shrink h-48 md:h-64 min-h-48 md:min-h-64 px-12 shadow-0 justify-end"
        style={{ background: '#D1E3F5' }}
      >
        <NavbarToggleButton className="w-40 h-40 p-0" />
      </AppBar>
      <StyledContent option={{ suppressScrollX: true, wheelPropagation: false }}>
        <div className='flex flex-col h-full'>
          <div>
            <UserNavbarHeader />
          </div>
          <div >
            <Navigation layout="vertical" />
          </div>
          <div className='absolute bottom-0 w-full' >
            <Divider style={{ background: '#BDD7EF' }} className='my-10' />
            <ItemList
              button
              component={NavLinkAdapter}
              to='/ayuda'
              activeClassName="active"
              className="fuse-list-item"
              role="button"
            >
              <HelpOutlineRoundedIcon
                className={clsx('fuse-list-item-icon')}
                color="action"
                style={{ display: 'flex', alignItems: 'center' }}
              />
              <p className="fuse-list-item-text" classes={{ primary: 'text-13' }} >
                Ayuda
              </p>
            </ItemList>
            <ItemList
              button
              activeClassName="active"
              className="fuse-list-item"
              role="button"
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              <LogoutRoundedIcon
                className={clsx('fuse-list-item-icon')}
                color="action"
                style={{ display: 'flex', alignItems: 'center' }}
              />
              <p className="fuse-list-item-text" classes={{ primary: 'text-13' }} >
                Salir
              </p>
            </ItemList>
            <div className='flex w-full justify-center my-16'>
              <p className='text-primaryBlack font-400 mx-6'>
                Powered by
              </p>
              <p className='text-primary font-600'>
                VIGPRO trámites
              </p>
            </div>
          </div>
        </div>
      </StyledContent>
    </Root>
  );
}

export default memo(NavbarStyle1Content);
