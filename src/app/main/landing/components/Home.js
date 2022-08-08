import { Grid, IconButton, Typography } from '@mui/material';
import CustomButton from '@components/CustomButton';
import { MessageIcon } from '@components/FuseSvgIcon';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    backgrounLanding: {
      backgroundImage:
        'linear-gradient(0deg, #FFFFFF 13.48%, rgba(49, 0, 153, 0.7) 100%), url(/assets/images/backgrounds/landing_image.jpg)',
      // backgroundImage: 'url(/assets/images/backgrounds/login.png)',
      width: '100%',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container className={clsx(classes.backgrounLanding, 'min-h-160 flex items-center')}>
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
      <IconButton className=" fixed right-10 bottom-10 z-999">
        <div
          className="flex justify-center items-center py-24 px-16"
          style={{
            backgroundColor: '#651DFF',
            boxShadow: '0px 4px 8px rgba(79, 12, 221, 0.3)',
            borderRadius: 64,
          }}
        >
          <Typography className="text-18 font-semibold mr-8" style={{ color: 'white' }}>
            Inicia ahora{' '}
          </Typography>
          <MessageIcon />
        </div>
      </IconButton>
    </Grid>
  );
};

export default Home;
