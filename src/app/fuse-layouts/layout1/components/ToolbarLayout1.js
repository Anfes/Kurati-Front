import FuseSearch from '@fuse/core/FuseSearch';
import { ThemeProvider } from '@mui/material/styles';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';

function ToolbarLayout1(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const navbar = useSelector(({ fuse }) => fuse.navbar);
  const toolbarTheme = useSelector(selectToolbarTheme);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color="default"
        sx={{ backgroundColor: toolbarTheme.palette.background.paper }}
        position="static"
      >
        <Toolbar className="p-0 min-h-48 md:min-h-64">
          <div className="flex flex-1 px-16">
            {config.navbar.display && config.navbar.position === 'left' && (
              <>
                <Hidden lgDown>
                  {config.navbar.style === 'style-1' && !navbar.open && (
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-0" navbar={navbar}/>
                  )}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" navbar={navbar} />
                </Hidden>
              </>
            )}
            <div className='flex items-center'>
              <a href='/dashboard'>
                <img src='/assets/images/logos/logo_vigpro.png' style={{width:'10.8rem'}} />
              </a>
              <div className='mx-10 h-16 w-2 bg-primary' />
              <p className='text-primary font-600 text-16'>
                Trámites
              </p>
            </div>
          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto">
            <FuseSearch />
            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === 'right' && (
            <>
              <Hidden lgDown>
                {!navbar.open && <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
