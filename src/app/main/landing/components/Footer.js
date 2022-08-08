import CustomButton from '@components/CustomButton';
import { Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { TiktokIcon } from '@components/FuseSvgIcon';

const Footer = () => {
  return (
    <div>
      <div className="w-full flex justify-center absolute bottom-64">
        <div
          className="w-11/12 h-512 rounded-24 p-52 flex flex-col justify-between"
          style={{
            background: 'linear-gradient(180deg, #4F0CDD 0%, #3C00BB 109.02%)',
            boxShadow: '0px 0px 32px 1px rgba(49, 0, 153, 0.35)',
          }}
        >
          <div className="flex">
            <div className="w-1/3">
              <div className="mb-12">
                <img
                  src="/assets/images/logos/kurati_white_logo.png"
                  style={{ width: '10.8rem' }}
                  alt="logo kurati"
                />
              </div>
              <Typography className="text-white mb-12 text-16">
                Una alianza digital para el acceso a procedimientos y tratamientos médicos{' '}
              </Typography>
              <div className="mb-12">
                <CustomButton label="¡Conoce Kurati!" className="secondary" height="medium" />
              </div>
              <Typography className="text-white font-semibold mb-12 text-16">
                Conoce más de nosotros en nuestras redes.
              </Typography>
              <div className="flex">
                <div className="mr-12">
                  <InstagramIcon className="text-24" style={{ color: '#31F2D0' }} />
                </div>
                <div>
                  <TiktokIcon />
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col ml-64">
              <Typography color="#31F2D0" className="text-20 font-semibold ">
                Enlaces
              </Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Inicio</Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Nosotros</Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Aliados</Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Servicios</Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Testimonios</Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Especialistas</Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Contáctanos</Typography>
            </div>
            <div className="w-1/3 flex flex-col">
              <Typography color="#31F2D0" className="text-20 font-semibold ">
                Documentos
              </Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Políticas de privacidad y Habeas data</Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Reglamento de producto y servicios</Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Términos y condiciones de uso </Typography>
              <Typography className="text-left mb-12 font-semibold text-white text-14">Clausulado de seguro obligatorio </Typography>
            </div>
          </div>
          <div>
            <div className='h-1 bg-white w-full mb-16 mt-52'/>
            <Typography className='text-white'>© Copyright 2022 Kurati All Rights Reserved. </Typography>
          </div>
        </div>
      </div>
      <div className="h-216" style={{ backgroundColor: '#F6F2FF' }} />
      <div className="h-450" style={{ backgroundColor: ' #260077' }} />
    </div>
  );
};

export default Footer;
