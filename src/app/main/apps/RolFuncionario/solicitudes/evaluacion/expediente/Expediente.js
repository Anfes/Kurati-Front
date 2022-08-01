import { useState } from 'react';
import clsx from 'clsx';

import { IconButton, Breadcrumbs, Link, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

// import reducer from '../store';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CustomProceedingsTable from './CustomProceedingsTable';
import CustomDatePicker from '@components/CustomDatePicker';

const useStyles = makeStyles(() => ({
  headContain: {
    minHeight: 100,
    backgroundColor: '#EEF7FF',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 24,
  },
  indicadorEtapa: {
    border: '1px solid rgba(58, 134, 201, 0.61)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 13,
    borderRadius: 16,
    color: '#2E7EC5',
    fontWeight: 600,
  },
  infoContainer: {
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 8,
    border: '1px solid #D1E3F5',
    padding: 10,
  },

  boxInfoStatus: {
    maxWidth: 288,
    minWidth: 285,
    height: 56,
    borderRadius: 16,
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
}));

const Expediente = () => {
  const classes = useStyles();
  const [fiveSec, setFiveSec] = useState(false);

  const fiveSeconds = () => {
    setFiveSec(false);
  };
  setTimeout(fiveSeconds, 5000);

  const [date, setDate] = useState();

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  return (
    <div>
      <div className={classes.headContain}>
        <div className="flex w-full mx-10  justify-between">
          <div className="flex">
            <IconButton
              style={{ backgroundColor: '#023E73', height: 24, width: 24 }}
              onClick={() => {
                history.push('/solicitudes');
              }}
            >
              <ArrowBackIosRoundedIcon style={{ color: '#4FDFC8', fontSize: 15 }} />
            </IconButton>
            <div className="flex ml-12 flex-col">
              <p className="text-primaryBlack font-semibold">ID de solicitud:</p>
              <p className="text-primary font-semibold text-18">Proferir Auto de inicio</p>
            </div>
          </div>
          <div>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link href="/" style={{ color: '#023E73' }}>
                {' '}
                Inicio{' '}
              </Link>
              <Link href="/solicitudes" style={{ color: '#023E73' }}>
                Mis solicitudes
              </Link>
              <p style={{ color: '#023E73' }}>Proferir auto de inicio</p>
            </Breadcrumbs>
            <div className={classes.indicadorEtapa}>Evaluación - Inicio</div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          classes.infoContainer,
          'flex flex-col md:flex-row justify-between md:items-center'
        )}
      >
        <div className="flex flex-col">
          <p className="text-18 font-bold text-primary"> Trámite: </p>
          <p className="text-16 font-bold mb-12" style={{ color: '#2E7EC5' }}>
            Concesión de aguas superficiales
          </p>
          <p className="text-14 font-bold text-primary">Fecha Solicitud:</p>
          <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
            2022-01-01 (02:00pm)
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <p className="text-18 font-bold text-primary">Solicitud #</p>
          <p className="text-16 font-bold mb-12" style={{ color: '#2E7EC5' }}>
            23
          </p>
          <p className="text-14 font-bold text-primary">Solicitante :</p>
          <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
            Carlos Andrés Salcedo - C.C. 16838483
          </p>
        </div>
      </div>
      <div>
        <div className="flex mt-16" style={{ marginLeft: 30 }}>
          <Typography className="font-bold text-18 " style={{ color: '#4C647A' }}>
            Expediente
          </Typography>
          {!fiveSec ? (
            <Typography style={{ color: '#3ABDA8' }} className="font-bold text-18 ml-8">
              #CAS23-0001-140222
            </Typography>
          ) : null}
        </div>
        {fiveSec ? (
          <div className={clsx(classes.infoContainer, 'flex flex-col items-center justify-center')}>
            <img src="/assets/images/dialogs/loading.png" alt="confirm" />
            <Typography className="font-bold text-18 " style={{ color: '#4C647A', marginLeft: 30 }}>
              Creando expediente ...
            </Typography>
            <CircularProgress color="success" size={42} className="mb-32 mt-16" />
          </div>
        ) : (
          <div style={{ marginLeft: 30, marginRight: 30 }} className="flex">
            <div className="w-7/12 mr-8">
              <CustomProceedingsTable />
            </div>
            <div
              className={clsx(classes.infoContainer, 'flex flex-col w-5/12 ml-8 px-8')}
              style={{ margin: 0 }}
            >
              <Typography className="text-16 mx-4 font-bold my-14" style={{ color: '#4C647A' }}>
                Auto de inicio:
              </Typography>
              <div style={{ backgroundColor: '#E4E4E4', border: '1px solid #E4E4E4' }} />
              <div>
<CustomDatePicker/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expediente;
