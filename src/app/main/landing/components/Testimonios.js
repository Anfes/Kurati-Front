import { Grid, Rating, Typography } from '@mui/material';
import Slider from 'react-slick';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/styles';
import CustomButton from '@components/CustomButton';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#31F2D0',
  },
  '& .MuiRating-iconHover': {
    color: '#46F2E0',
  },
});

const Testimonios = (props) => {
  const { next } = props;

  const array = [
    {
      nombre: 'Carolina Pico',
      tiempo: 'hace un mes',
      comentario:
        'Nunca pensé que realizarme un procedimiento estético fuera tan sencillo, gracias a Kurati pude iniciar mi proceso en poco tiempo y con especialistas de gran calidad humana',
    },
    {
      nombre: 'Carlos Pico',
      tiempo: 'hace dos meses',
      comentario:
        'Nunca pensé que realizarme un procedimiento estético fuera tan sencillo, gracias a Kurati pude iniciar mi proceso en poco tiempo y con especialistas de gran calidad humana',
    },
  ];
  return (
    <Grid
      container
      justifyContent="center"
      style={{ background: 'linear-gradient(360deg, #FFFFFF 0%, #EFE8FF 100%)' }}
    >
      <Grid item xs={11} lg={10}>
        <div className='flex flex-col items-center'>
          <div className="flex flex-col items-center w-full mb-60">
            <Typography className="font-semibold text-20 mb-8 text-center w-1/3" color="#3C00BB">
              Testimonios
            </Typography>
            <Typography className="font-bold text-32 text-center w-1/3" color="#3B3F5D">
              Ya confiaron en nosotros
            </Typography>
          </div>
          <div className='w-4/5 mb-128'>
            <Slider arrows autoplay infinite rows swipe swipeToSlide slidesToShow={1} {...next}>
              {array.map((e) => {
                return(

                    <div>
                  <div className="w-full flex justify-center items-center mt-56 mb-56">
                    <div
                      className="w-4/5 h-320 rounded-8 bg-white flex justify-center items-center"
                      style={{ boxShadow: '0px 4px 24px 2px rgba(60, 0, 187, 0.1)' }}
                      >
                      <div
                        className=" rounded-8 bg-white flex justify-center items-center -mt-10"
                        style={{
                          boxShadow: '0px 4px 24px 2px rgba(60, 0, 187, 0.1)',
                          width: '97%',
                          height: '105%',
                        }}
                      >
                        <div
                          className=" rounded-8 bg-white flex flex-col p-32"
                          style={{
                            boxShadow: '0px 4px 24px 2px rgba(60, 0, 187, 0.1)',
                            width: '97%',
                            height: '105%',
                          }}
                        >
                          <div className="flex">
                            <div className="flex w-1/2">
                              <div className="w-128 h-128 bg-lightBlue rounded-12 mr-12" />
                              <div className="flex flex-col justify-evenly">
                                <Typography color="#4F0CDD" className="text-24 font-bold ">
                                  {e.nombre}
                                </Typography>
                                <Typography color="#878BB4" className="text-16">
                                  {e.tiempo}
                                </Typography>
                                <div className="flex">
                                  <div className="w-24 h-24 mr-8 bg-purple-600" />
                                  <div className="w-24 h-24 mx-8 bg-purple-600" />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end w-1/2 mt-20">
                              <StyledRating
                                name="customized-color"
                                defaultValue={5}
                                disabled
                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                precision={0.5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                              />
                            </div>
                          </div>
                          <div
                            className=" flex justify-center items-center px-88 py-24"
                            style={{ height: 'inherit' }}
                            >
                            <Typography color="#6B7097" className="text-16">
                              {e.comentario}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
              })}
            </Slider>
          </div>
          <div className='mb-224'>
            <CustomButton label="Conoce nuestro alcance" className="outlinePrimary" height="large"/>
          </div>
        </div>
      </Grid>
      </Grid>
  );
};

export default Testimonios;
