import { Grid, Typography } from '@mui/material';

import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CustomTextField from '@components/CustomTextField';
import CustomButton from '@components/CustomButton';

const InfoContacto = () => {
  return (
    <Grid container justifyContent="center" style={{ backgroundColor: '#F6F2FF' }}>
      <Grid item xs={11} lg={10}>
        <div className="flex py-136">
          <div className="w-1/2 flex flex-col justify-center items-center">
            <div>
              <Typography color="#651DFF" className="text-24 font-semibold">
                ¿Te hizó falta más información?
              </Typography>
              <Typography color="#3B3F5D" className="text-48 font-bold">
                ¡Escríbenos!
              </Typography>
              <Typography color="#3B3F5D" className="text-20">
                Completa este breve formulario y nos pondremos en contacto lo más pronto posible.
              </Typography>
            </div>
          </div>
          <div className="flex justify-center items-center w-1/2">
            <div
              className="bg-white py-40 px-32 rounded-16 w-10/12"
              style={{ boxShadow: '0px 2px 16px 4px rgba(38, 41, 64, 0.1)' }}
            >
              <Typography color="#262940" className="font-semibold mb-16">
                Información de contacto
              </Typography>
              <div className="flex mb-16">
                <MailOutlinedIcon style={{ color: '#651DFF' }} className="mr-16" />
                <Typography color="#878BB4" className="text-14">
                  Escríbenos cualquier duda a <span className="font-semibold">hola@kuraty</span>{' '}
                </Typography>
              </div>
              <div className="h-1 mb-16" style={{ backgroundColor: '#D4D7F3' }} />
              <div className="mb-24">
                <CustomTextField label="Nombre completo" />
              </div>
              <div className="mb-24">
                <CustomTextField label="Correo electrónico" />
              </div>
              <div className="mb-24">
                <CustomTextField label="Celular" />
              </div>
              <div className="mb-24">
                <CustomTextField label="Cuéntanos tu duda" multiline rows={2} />
              </div>
              <div>
                <CustomButton label="Enviar solicitud" className='primary' height='large' widht='full'  />
              </div>
              <div />
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default InfoContacto;
