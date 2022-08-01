import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import api from 'app/services/constants/api';

import { makeStyles } from '@mui/styles';
import { Dialog, Grid, IconButton, Tooltip } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import CustomNavbar from '@components/CustomNavbar';
import CustomButton from '@components/CustomButton';

import withReducer from 'app/store/withReducer';
import { isEmpty } from 'lodash';
import reducer from './store';
import { getProcedureById } from './store/DetalleTramiteSlice';

const useStyles = makeStyles(() => ({
  headContain: {
    // backgroundImage: 'url(/assets/images/backgrounds/detalle-tramite.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: 248,
    backgroundColor: '#023E73',
  },
  infoDocument: {
    border: '1px solid #E6F0FA',
    padding: 14,
    marginTop: 24,
    borderRadius: 8,
    height: 95,
    '&:hover': {
      boxShadow: ' 0px 2px 16px 4px rgba(2, 62, 115, 0.1)',
    },
  },
}));

function Tramite(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [dialogRegister, setDialogRegister] = useState(false);
  const user = useSelector(({ auth }) => auth.user);
  const itemTramite = useSelector(({ tram }) => tram.detalleTramite.dataTramite);

  const tt_id = props.match.params.id;
  const { type } = props.location;

  useEffect(() => {
    async function fetch() {
      await dispatch(getProcedureById(tt_id));
    }
    fetch();
  }, []);

  const iniciarTramite = () => {
    if (user && user.data && user.data.usr_id) {
      history.push('/dashboard');
    } else {
      setDialogRegister(true);
    }
  };

  return (
    <div style={{ background: '#F5FBFF' }}>
      <CustomNavbar loginButton singInButton />
      <Dialog open={dialogRegister}>
        <div className="flex flex-col items-center min-w-450 min-h-200 p-14">
          <div className="w-full flex justify-end">
            <IconButton
              onClick={() => {
                setDialogRegister(false);
              }}
            >
              <CloseRoundedIcon style={{ color: '#023E73' }} />
            </IconButton>
          </div>
          <img src="/assets/images/dialogs/unregistered.png" alt="Unregistered user" />
          <p className="font-bold text-16 mt-10">Debes tener una cuenta para iniciar un trámite</p>
          <p className="mt-14 text-14">¿Deseas crear una en este momento?</p>
          <div className="w-3/5 my-20">
            <CustomButton
              label="Si, quiero crear una cuenta"
              className="primary"
              height="medium"
              width="full"
              href="/registro-ciudadano"
            />
          </div>
          <Link
            className="font-bold text-14 mb-32"
            to="/iniciar-sesion"
            style={{ color: '#145C9C', textDecoration: 'none' }}
          >
            No, ya tengo cuenta
          </Link>
        </div>
      </Dialog>
      {!isEmpty(itemTramite)
        ? itemTramite.map((e) => (
            <Grid
              container
              justifyContent="center"
              className={classes.headContain}
              style={{
                background: `linear-gradient(0deg, rgba(2, 62, 115, 0.7), rgba(2, 62, 115, 0.7)), url(${api.url_bucket}/img/${e.fk_tram_subcategoria.tcs_imagen})`,
              }}
            >
              <Grid item xs={11} lg={10} className="flex items-end justify-between py-32">
                <div className="flex flex-col w-11/12">
                  <IconButton
                    style={{ backgroundColor: '#EEF7FF', height: 24, width: 24 }}
                    onClick={() => {
                      history.push('/cortolima-tramites');
                    }}
                  >
                    <ArrowBackIosRoundedIcon style={{ color: '#023E73', fontSize: 15 }} />
                  </IconButton>
                  <p className="mt-36 text-white">{type}</p>
                  <p className="text-white font-600 text-24">{e.tt_nombre}</p>
                  <div className="flex mt-20 items-center">
                    <img
                      src="/assets/images/logos/cortolima.png"
                      alt="cortolima"
                      style={{ width: 24, height: 24 }}
                    />
                    <div className="ml-12 flex">
                      <p className="text-11 font-bold text-white"> Cortolima&nbsp;</p>
                      <p className="text-11 text-white"> · Trámites ambientales</p>
                    </div>
                  </div>
                </div>
                <div className="min-w-128 w-128 ml-12">
                  <CustomButton
                    label="Iniciar trámite"
                    className="secondary"
                    height="medium"
                    width="full"
                    onClick={iniciarTramite}
                  />
                </div>
              </Grid>
            </Grid>
          ))
        : ''}
      {!isEmpty(itemTramite)
        ? itemTramite.map((e) => (
            <Grid
              container
              justifyContent="center"
              style={{ background: '#F5FBFF' }}
              className="pb-40"
            >
              <Grid item xs={11} lg={10} className="flex pb-40 flex-col lg:flex-row">
                <div className="w-full lg:w-2/5 p-20">
                  <p className="text-20 font-bold mb-12">Descripción</p>
                  <p className="text-justify">{e.tt_descripcion}</p>
                </div>
                <div className="w-full lg:w-3/5 bg-white p-20">
                  <p className="text-20 font-bold mb-12 text-primary">Documentos requeridos</p>
                  <div className="flex w-full flex-wrap justify-center md:justify-between">
                    {e.tram_documento_tramite.length > 0 ? (
                      e.tram_documento_tramite.map((i) => (
                        <div
                          className={clsx('w-full md:w-4/8', classes.infoDocument)}
                          key={i.tdt_orden}
                        >
                          <div className="flex justify-between items-center">
                            <Tooltip title={i.fk_tram_documento.td_titulo} placement="top">
                              <p
                                className="font-bold text-14 mb-4 text-primary"
                                style={{
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: 'vertical',
                                  display: '-webkit-box',
                                }}
                              >
                                {i.fk_tram_documento.td_titulo}
                              </p>
                            </Tooltip>

                            <div className="w-24 h-24 bg-darkPrimary rounded-4 m-4 flex justify-center items-center">
                              <Tooltip title={i.fk_tram_documento.td_descripcion} placement="top">
                                <HelpOutlineIcon className="text-18 text-secondary cursor-pointer" />
                              </Tooltip>
                            </div>
                          </div>
                          <Tooltip title={i.fk_tram_documento.td_descripcion} placement="bottom">
                            <p
                              className="text-primaryBlack font-600 text-12 overflow-hidden"
                              style={{
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                display: '-webkit-box',
                              }}
                            >
                              {i.fk_tram_documento.td_descripcion}
                            </p>
                          </Tooltip>
                        </div>
                      ))
                    ) : (
                      <p className="text-16 my-4 text-primary">No se requieren documentos</p>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          ))
        : ''}
    </div>
  );
}

export default withReducer('tram', reducer)(Tramite);
