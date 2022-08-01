/* eslint-disable jsx-a11y/alt-text */
import { Dialog, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '@components/CustomButton';

import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';

const useStyles = makeStyles(() => ({
  screenDialog: {
    '& .MuiDialog-paper': {
      height: '95%',
      width: '95%',
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom: 10,
    },
  },
}));

const DialogEditor = (props) => {
  const { open, close, onChange, value } = props;
  const classes = useStyles();

  return (
    <Dialog open={open} fullScreen className={classes.screenDialog}>
      <div className="py-14 px-20 min-w-full h-full">
        <div className="flex justify-between">
          <Typography style={{ color: '#023E73' }} className="font-semibold text-16">
            <span style={{ color: '#1A796A' }} className="font-semibold text-16">
              Acto administrativo
            </span>{' '}
            - DESISTIMIENTO TÁCITO (lorem ipsum)
          </Typography>
          <IconButton onClick={close}>
            <CloseIcon className="text-primary text-24" />
          </IconButton>
        </div>
        <div
          className="border-solid border-2 border-dashed p-24"
          style={{ borderColor: '#0F81E5' }}
        >
          <div className="mb-16">
            <img src="/assets/images/logos/cortolimaLogo.png" className="mb-16" />
            <Typography className="text-primary font-bold">14 de Febrero de 2022</Typography>
            <Typography className="text-primary">
              <span className="font-bold" style={{ color: '#145C9C' }}>
                Sr(a):
              </span>
              Victor Cuervo Pereira
            </Typography>
            <Typography className="text-primary">Cra 23 #12 - 18 Cali - Valle</Typography>
            <Typography className="text-primary">Tels: 3187704246 - 2334455</Typography>
            <Typography className="text-primary">
              <span className="font-bold">Referencia:</span> Desistimiento tactico (xxxxxx)
            </Typography>
            <Typography className="text-primary">
              <span className="font-bold">Fuente:</span> Conseción de aguas superficiales
            </Typography>
          </div>
          <div className="w-full mb-32">
            <WYSIWYGEditor value={value} onChange={onChange} />
          </div>
          <div className="flex justify-between">
            <div>
              <Typography className="text-primary font-bold">Iván Duque Hernandez</Typography>
              <Typography className="text-primary font-bold">(SubDirector Jurídico)</Typography>
            </div>
            <div>
              <CustomButton height="medium" label="Enviar a revisión" className="primary" />
            </div>
          </div>
        </div>
        <div className="h-32" />
      </div>
    </Dialog>
  );
};

export default DialogEditor;
