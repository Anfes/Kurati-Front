import CustomButton from '@components/CustomButton';
import { Grid, Typography } from '@mui/material';
import Slider from 'react-slick';

const Especialistas = (props) => {
  const { next } = props;

  const array = [
    {
      nombre: 'Dr. Federico House',
      area: 'pediatra',
    },
    {
      nombre: 'Dr. Federico House',
      area: 'pediatra',
    },
    {
      nombre: 'Dr. Federico House',
      area: 'pediatra',
    },
    {
      nombre: 'Dr. Federico House',
      area: 'pediatra',
    },
    {
      nombre: 'Dr. Federico House',
      area: 'pediatra',
    },
  ];

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} lg={10}>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center w-full mb-60">
            <Typography className="font-semibold text-20 mb-8 text-center w-1/3" color="#1FD0B0">
              Las manos Kurati
            </Typography>
            <Typography className="font-bold text-32 text-center w-1/3" color="#3B3F5D">
              Parte de nuestros especialistas
            </Typography>
          </div>
          <div className="w-4/5 mb-128">
            <Slider arrows autoplay infinite rows swipe swipeToSlide slidesToShow={4} {...next}>
              {array.map((e) => {
                return (
                  <div className="ml-16 p-32">
                    <div
                      style={{ borderRadius: '16px 16px 0px 0px' }}
                      className="w-full h-224 bg-grey-A700"
                    />
                    <div>
                      <Typography color="#006A57" className="font-semibold text-20">
                        {e.nombre}
                      </Typography>
                      <Typography color="#6B7097" className="text-14">
                        {e.area}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="mb-160">
            <CustomButton
              label="Conoce a todos los especialistas"
              className="outlineSecondary"
              height="large"
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Especialistas;
