import { useState } from 'react';
import clsx from 'clsx';

import { createStyles, makeStyles } from '@mui/styles';
import { Carousel } from '@trendyol-js/react-carousel';

import CustomButton from '@components/CustomButton';
import CustomNavbar from '@components/CustomNavbar';

import { Grid, IconButton, Typography } from '@mui/material';
import { LeftArrowIcon, RightArrowIcon } from '@components/FuseSvgIcon';
import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';

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
        <IconButton className="flex justify-end items-end fixed right-10 bottom-10 z-999">
          <div
            className="w-52 h-52 flex justify-center items-center rounded-full "
            style={{ backgroundColor: '#31F2D0' }}
          >
            <WhatsappRoundedIcon className="text-24" style={{ color: '#4F0CDD' }} />
          </div>
        </IconButton>
      </Grid>
      <Grid container justifyContent="center" className="mb-32">
        <Grid item xs={11} lg={10}>
          <div className="flex justify-center">
            <Typography className="font-semibold text-16 mb-20" color="#3C00BB">
              Nuestros Aliados
            </Typography>
          </div>
          <div className="w-full">
            <Carousel
              show={4}
              slide={3}
              swiping
              useArrowKeys
              infinite
              rightArrow={
                <div className="flex items-center h-full">
                  <RightArrowIcon />
                </div>
              }
              leftArrow={
                <div className="flex items-center h-full">
                  <LeftArrowIcon />
                </div>
              }
            >
              {dataCarousel.map((e) => {
                return <div className="ml-52 w-160 h-80 bg-blue">{e.data} 🌐</div>;
              })}
            </Carousel>
          </div>
        </Grid>
      </Grid>
        <Grid container justifyContent="center" style={{background:'linear-gradient(180deg, #FFFFFF 0%, #EFE8FF 100%)'}} >
          <Grid item xs={11} lg={10}>
            siu
          </Grid>
        </Grid>
    </div>
  );
}

export default Landing;
