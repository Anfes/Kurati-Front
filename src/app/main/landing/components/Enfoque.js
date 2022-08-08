import CustomButton from '@components/CustomButton';
import { Grid, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import Slider from 'react-slick';

const useStyles = makeStyles((theme) =>
  createStyles({
    backgroundAffection: {
      background:
        'linear-gradient(180deg, rgba(31, 208, 176, 0.2) 0%, rgba(49, 0, 153, 0.8) 54.1%), url(img-male-patient-getting-his-cornea-checked-with-slit-lamp);',
    },
  })
);

const Enfoque = (props) => {
  const { next } = props;
  const classes = useStyles();
  return (
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
          <Slider arrows autoplay infinite rows swipe swipeToSlide slidesToShow={3} {...next}>
            <div>
              <div
                className={clsx(
                  classes.backgroundAffection,
                  'rounded-16 ml-64 h-400 max-w-320 p-24 flex flex-col justify-end '
                )}
              >
                <Typography className="text-14 font-bold text-white mb-8">Miopia</Typography>
                <Typography className="text-14 text-white">
                  La miopía es un problema de refracción que hace que los objetos lejanos se vean
                  borrosos. En Kuratí podemos ayudarte a solucionarlo.
                </Typography>
              </div>
            </div>
            <div>
              <div
                className={clsx(
                  classes.backgroundAffection,
                  'rounded-16 ml-64 h-400 max-w-320 p-24 flex flex-col justify-end'
                )}
              >
                <Typography className="text-14 font-bold text-white mb-8">Miopia</Typography>
                <Typography className="text-14 text-white">
                  La miopía es un problema de refracción que hace que los objetos lejanos se vean
                  borrosos. En Kuratí podemos ayudarte a solucionarlo.
                </Typography>
              </div>
            </div>
            <div>
              <div
                className={clsx(
                  classes.backgroundAffection,
                  'rounded-16 ml-64 h-400 max-w-320 p-24 flex flex-col justify-end'
                )}
              >
                <Typography className="text-14 font-bold text-white mb-8">Miopia</Typography>
                <Typography className="text-14 text-white">
                  La miopía es un problema de refracción que hace que los objetos lejanos se vean
                  borrosos. En Kuratí podemos ayudarte a solucionarlo.
                </Typography>
              </div>
            </div>
            <div>
              <div
                className={clsx(
                  classes.backgroundAffection,
                  'rounded-16  ml-64 h-400 max-w-320 p-24 flex flex-col justify-end'
                )}
              >
                <Typography className="text-14 font-bold text-white mb-8">Miopia</Typography>
                <Typography className="text-14 text-white">
                  La miopía es un problema de refracción que hace que los objetos lejanos se vean
                  borrosos. En Kuratí podemos ayudarte a solucionarlo.
                </Typography>
              </div>
            </div>
          </Slider>
          <div className="w-full flex justify-center mt-128">
            <CustomButton label="Conoce nuestro alcance" className="secondary" height="large" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Enfoque;
