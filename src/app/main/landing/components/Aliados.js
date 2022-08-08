
import { Grid, Typography } from '@mui/material';
import Slider from 'react-slick';


const Aliados = (props) => {
    const {next} = props;
  return (
    <Grid container justifyContent="center" className="mb-160">
      <Grid item xs={11} lg={10}>
        <div className="flex justify-center">
          <Typography className="font-semibold text-16 mb-20" color="#3C00BB">
            Nuestros Aliados
          </Typography>
        </div>
        <div className="w-full">
          <Slider arrows autoplay infinite rows swipe swipeToSlide slidesToShow={4} {...next}>
            <div className="p-18">
              <div className="bg-blue w-4/5 h-80" />
            </div>
            <div className="p-18">
              <div className="bg-blue w-4/5 h-80" />
            </div>
            <div className="p-18">
              <div className="bg-blue w-4/5 h-80" />
            </div>
            <div className="p-18">
              <div className="bg-blue w-4/5 h-80" />
            </div>
            <div className="p-18">
              <div className="bg-blue w-4/5 h-80" />
            </div>
            <div className="p-18">
              <div className="bg-blue w-4/5 h-80" />
            </div>
          </Slider>
        </div>
      </Grid>
    </Grid>
  );
};

export default Aliados;
