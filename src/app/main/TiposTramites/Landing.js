import { Grid, Typography } from '@mui/material';

import CustomNavbar from '@components/CustomNavbar';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@mui/styles';
import CustomButton from '@components/CustomButton';

const useStyles = makeStyles((theme) =>
  createStyles({
    backgrounLanding: {
      backgroundImage: 'url(/assets/images/backgrounds/landing_image.png)',
      // backgroundImage: 'url(/assets/images/backgrounds/login.png)',
      width: '100%',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

function Landing() {
  const classes = useStyles();
  return (
    <div>
      <CustomNavbar />
      <Grid
        container
        className={clsx(classes.backgrounLanding, 'bg-purple min-h-160 flex items-center')}
      >
        <Grid container justifyContent="center">
          <Grid item xs={11} lg={10}>
            <div className="w-3/5">
              <Typography className="text-64 font-bold" color="#31F2D0">
                Kurati
              </Typography>
              <Typography className="text-36 font-semibold text-white">
                Tu aliado digital para acceder a procedimientos y tratamientos médicos de alta
                calidad.
              </Typography>
              <div className="mt-16">
                <CustomButton label="¡Conoce Kurati ahora!" className="secondary" height="large" />
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        {/* <Grid item xs={11} lg={10}>
          ruleta----------------------
        </Grid> */}
      </Grid>
    </div>
  );
}

export default Landing;
