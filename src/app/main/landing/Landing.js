import { useState } from 'react';
import clsx from 'clsx';

import { createStyles, makeStyles } from '@mui/styles';

import CustomButton from '@components/CustomButton';
import CustomNavbar from '@components/CustomNavbar';

import { Grid, IconButton, Typography } from '@mui/material';
import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LeftArrowIcon, RightArrowIcon } from '@components/FuseSvgIcon';

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
    backgroundAffection: {
      background:
        'linear-gradient(180deg, rgba(31, 208, 176, 0.2) 0%, rgba(49, 0, 153, 0.8) 54.1%), url(img-male-patient-getting-his-cornea-checked-with-slit-lamp);',
    },
  })
);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#CDB5FF" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#CDB5FF" }}
      onClick={onClick}
    />
  );
}


function Landing() {
  const [dataCarousel, setDataCarousel] = useState([
    { data: 'logo 1' },
    { data: 'logo 2' },
    { data: 'logo 3' },
    { data: 'logo 4' },
    { data: 'logo 5' },
    { data: 'logo 6' },
  ]);

  const next = {
   nextArrow: <SampleNextArrow />,
   prevArrow: <SamplePrevArrow/>,
  };

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
      <Grid container justifyContent="center" className="mb-160">
        <Grid item xs={11} lg={10}>
          <div className="flex justify-center">
            <Typography className="font-semibold text-16 mb-20" color="#3C00BB">
              Nuestros Aliados
            </Typography>
          </div>
          <div className="w-full">
            <Slider arrows autoplay infinite rows swipe swipeToSlide slidesToShow={4} {...next}>
              <div className="bg-blue w-4/5 h-80" />
              <div className="bg-red w-4/5 h-80" />
              <div className="bg-purple w-4/5 h-80" />
              <div className="bg-yellow w-4/5 h-80" />
              <div className="bg-orange w-4/5 h-80" />
            </Slider>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #EFE8FF 100%)' }}
      >
        <Grid item xs={11} lg={10} className="mb-160">
          <div className="flex flex-col">
            <div className="flex flex-col items-center w-full mb-60">
              <Typography className="font-semibold text-20 mb-20 text-center w-1/3" color="#3C00BB">
                ¿Qué nos hace diferentes?
              </Typography>
              <Typography className="font-bold text-32 text-center w-1/3" color="#3B3F5D">
                Acceso oportuno a los mejores especialistas
              </Typography>
            </div>
            <div className="flex">
              <div className="w-1/3 flex flex-col justify-between">
                <div>
                  <Typography className="font-semibold text-16 mb-16 text-right" color="#3C00BB">
                    Conexión
                  </Typography>
                  <Typography className="text-14 text-right" color="#6B7097">
                    Te vinculamos con los mejores especialistas para tu procedimiento de{' '}
                    <span className="font-bold">forma ágil y oportuna.</span>
                  </Typography>
                </div>
                <div>
                  <Typography className="font-semibold text-16 mb-16 text-right" color="#3C00BB">
                    Cobertura
                  </Typography>
                  <Typography className="text-14 text-right" color="#6B7097">
                    Contamos con presencia en la principales ciudades del país{' '}
                    <span className="font-bold">(Bogotá, Medellín, Cali, entre otras).</span>
                  </Typography>
                </div>
              </div>
              <div className="w-1/3">
                <img
                  src="/assets/images/home/landing_model_doc.png"
                  style={{ width: '108rem' }}
                  alt="doc landing"
                />
              </div>
              <div className="w-1/3 flex flex-col justify-between">
                <div>
                  <Typography className="font-semibold text-16 mb-16 text-left" color="#3C00BB">
                    Asesoría
                  </Typography>
                  <Typography className="text-14 text-left" color="#6B7097">
                    Te orientamos de en cada una de las
                    <span className="font-bold">forma personalizada</span> etapas de tu
                    procedimiento.
                  </Typography>
                </div>
                <div>
                  <Typography className="font-semibold text-16 mb-16 text-left" color="#3C00BB">
                    Financiación
                  </Typography>
                  <Typography className="text-14 text-left" color="#6B7097">
                    <span className="font-bold">Estamos trabajando </span>
                    en ofrecerte opciones de financiación para tus procedimientos médicos.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ background: '#EFE8FF' }}>
        <Grid item xs={11} lg={10} className="mb-160">
          <div className="flex flex-col">
            <div className="flex flex-col items-center w-full mb-60">
              <Typography className="font-semibold text-20 mb-8 text-center w-1/3" color="#3C00BB">
                Nuestro enfoque
              </Typography>
              <Typography className="font-bold text-32 text-center w-1/3" color="#3B3F5D">
                Afecciones oculares
              </Typography>
            </div>
            <div className="flex justify-evenly mb-128">
              <div
                className={clsx(
                  classes.backgroundAffection,
                  'rounded-16 w-1/3 mr-16 h-400 max-w-320 p-24 flex flex-col justify-end '
                )}
              >
                <Typography className="text-14 font-bold text-white mb-8">Miopia</Typography>
                <Typography className="text-14 text-white">
                  La miopía es un problema de refracción que hace que los objetos lejanos se vean
                  borrosos. En Kuratí podemos ayudarte a solucionarlo.
                </Typography>
              </div>
              <div
                className={clsx(
                  classes.backgroundAffection,
                  'rounded-16 w-1/3 mx-16 h-400 max-w-320 p-24 flex flex-col justify-end'
                )}
              >
                <Typography className="text-14 font-bold text-white mb-8">Miopia</Typography>
                <Typography className="text-14 text-white">
                  La miopía es un problema de refracción que hace que los objetos lejanos se vean
                  borrosos. En Kuratí podemos ayudarte a solucionarlo.
                </Typography>
              </div>
              <div
                className={clsx(
                  classes.backgroundAffection,
                  'rounded-16 w-1/3 ml-16 h-400 max-w-320 p-24 flex flex-col justify-end'
                )}
              >
                <Typography className="text-14 font-bold text-white mb-8">Miopia</Typography>
                <Typography className="text-14 text-white">
                  La miopía es un problema de refracción que hace que los objetos lejanos se vean
                  borrosos. En Kuratí podemos ayudarte a solucionarlo.
                </Typography>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <CustomButton label="Conoce nuestro alcance" className="secondary" height="large" />
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        style={{ background: 'linear-gradient(360deg, #FFFFFF 0%, #EFE8FF 100%)' }}
      >
        <Grid item xs={11} lg={10}>
          <div>
            <div className="flex flex-col items-center w-full mb-60">
              <Typography className="font-semibold text-20 mb-8 text-center w-1/3" color="#3C00BB">
                Testimonios
              </Typography>
              <Typography className="font-bold text-32 text-center w-1/3" color="#3B3F5D">
                Ya confiaron en nosotros
              </Typography>
            </div>
            <div>
              <Slider arrows autoplay infinite rows swipe swipeToSlide slidesToShow={1} >
                <div className="bg-blue w-4/5 h-80" />
                <div className="bg-red w-4/5 h-80" />
                <div className="bg-purple w-4/5 h-80" />
                <div className="bg-yellow w-4/5 h-80" />
                <div className="bg-orange w-4/5 h-80" />
              </Slider>
            </div>
            <div />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Landing;
