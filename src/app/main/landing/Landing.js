import { Grid, Typography } from '@mui/material';
import { LeftArrowIcon, RightArrowIcon } from '@components/FuseSvgIcon';

import CustomNavbar from '@components/CustomNavbar';
import clsx from 'clsx';
import { createStyles, makeStyles } from '@mui/styles';
import CustomButton from '@components/CustomButton';
import { Carousel } from '@trendyol-js/react-carousel';
import { useState } from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
    backgrounLanding: {
      backgroundImage: 'url(/assets/images/backgrounds/landing_image.jpg)',
      // backgroundImage: 'url(/assets/images/backgrounds/login.png)',
      width: '100%',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

function Landing() {
  const [dataCarousel, setDataCarousel] = useState([
    { data: 'logo 1' },
    { data: 'logo 2' },
    { data: 'logo 3' },
    { data: 'logo 4' },
    { data: 'logo 5' },
    { data: 'logo 6' },
  ]);

  const classes = useStyles();
  return (
    <div>
      <CustomNavbar />
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
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={11} lg={10}>
          <div className="w-full">
            <Carousel
              show={4}
              slide={3}
              swiping
              useArrowKeys
              rightArrow={
              <div className='flex items-center h-full'>
              <RightArrowIcon />
              </div>
            }
              leftArrow={<LeftArrowIcon />}
            >
              {dataCarousel.map((e) => {
                return <div className="w-160 h-80 bg-blue">{e.data} 🌐</div>;
              })}
            </Carousel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
