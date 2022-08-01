import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Grid, AppBar, Toolbar } from '@mui/material';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import useMediaQuery from '@mui/material/useMediaQuery';

function FooterLayout1(props) {
  const footerTheme = useSelector(selectFooterTheme);
  const matches = useMediaQuery('(min-width:600px)');
  const navBar = useMediaQuery('(min-width:1200px)');

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        className={clsx('shadow-md', props.className)}
        color="default"
        style={{ backgroundColor: 'white', bottom: 0, minHeight: 60, top: matches ? '95%' : '92%' }}
      >
        <Grid container >
          <Grid item xs={12} lg={12}>

            <Toolbar
            style={{marginLeft:'4%', marginRight:'3.8%'}}
            className="min-h-48 p-8 sm:p-12 flex items-center overflow-x-auto flex-col md:flex-row justify-center md:justify-between">
              <div className='flex'>
                <p className='text-primaryBlack font-400 mr-4'>
                  Powered by
                </p>
                <p className='text-primary font-600 '>
                  VIGPRO trámites
                </p>
              </div>
              <p className='text-primaryBlack font-400'>
                Todos los derechos reservados · 2021
              </p>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout1);
