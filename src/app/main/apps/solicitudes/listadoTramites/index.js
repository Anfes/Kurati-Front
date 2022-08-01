import { useState, useEffect } from 'react';
import clsx from 'clsx';
import history from '@history';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';

import api from 'app/services/constants/api';

import { makeStyles } from '@mui/styles';
import {
  IconButton,
  Card,
  CardMedia,
  CardContent,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Tooltip,
} from '@mui/material';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import {
  getAllProcedures,
  getProcedureBySubC,
  getTramCategoriaSub,
} from '../store/CorTolTramitesSlice';
import reducer from '../store';

const useStyles = makeStyles(() => ({
  headContain: {
    backgroundImage: 'url(/assets/images/backgrounds/bg-cortolima.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: 160,
    paddingLeft: '3%',
  },
  cardInfo: {
    width: 350,
    border: '1px solid #E6F0FA',
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      boxShadow: ' 0px 2px 16px 4px rgba(2, 62, 115, 0.1)',
    },
  },
  cusToggleButton: {
    '& .MuiButtonBase-root.Mui-selected': {
      backgroundColor: '#023E73',
      color: '#4FDFC8',
      borderRadius: 25,
      textTransform: 'none',
    },
    '& .MuiButtonBase-root': {
      backgroundColor: 'transparent',
      color: '#023E73',
      width: 'fit-content',
      minWidth: 67,
      height: 38,
      textTransform: 'none',
      border: '1px solid #023E73',
      borderLeft: '1px solid #023E73 !important',
      borderRadius: '25px !important',
      margin: 10,
    },
  },
}));

function ListadoTramites() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [search, setSearch] = useState(0);
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemProcedures = useSelector(({ item }) => item.corTolTramites.dataCorTolTramites);
  const itemProcedureSubCat = useSelector(({ item }) => item.corTolTramites.dataTramiteSubCat);
  const procedureSubCat = useSelector(({ item }) => item.corTolTramites.subCategorias);

  useEffect(() => {
    async function fetch() {
      await dispatch(getAllProcedures());
      await dispatch(getTramCategoriaSub());
    }
    fetch();
  }, []);

  useEffect(() => {
    if (search === 0) {
      setNewData(itemProcedures);
    } else {
      setNewData(itemProcedureSubCat);
    }
  }, [itemProcedures, itemProcedureSubCat]);

  const handleChange = async (event, tcsId) => {
    setLoading(true);
    setSearch(tcsId);
    if (tcsId === 0) {
      await dispatch(getAllProcedures());
    } else {
      await dispatch(getProcedureBySubC(tcsId));
    }
    setLoading(false);
  };

  return (
    <div>
      <div className={classes.headContain}>
        <div className="flex flex-col pt-20">
          <IconButton
            style={{ backgroundColor: '#EEF7FF', height: 24, width: 24 }}
            onClick={() => {
              history.push('/mis-solicitudes');
            }}
          >
            <ArrowBackIosRoundedIcon style={{ color: '#023E73', fontSize: 15 }} />
          </IconButton>
          <div className="flex mt-20">
            <img
              src="/assets/images/logos/cortolima.png"
              alt="cortolima"
              style={{ minWidth: 72, minHeight: 72 }}
            />
            <div className="ml-12">
              <p className="text-18 font-bold text-white"> Cortolima </p>
              <p className="text-16 font-500 text-white"> Trámites ambientales </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primaryLight overflow-x-auto " style={{ paddingLeft: '3%' }}>
        <div
          style={{ minWidth: 650 }}
          className="flex py-10 min-h-80 items-center justify-center lg:justify-start"
        >
          <ToggleButtonGroup
            color="primary"
            value={search}
            exclusive
            onChange={handleChange}
            className={clsx(classes.cusToggleButton, 'flex flex-row items-center')}
          >
            <ToggleButton value={0}>Todos</ToggleButton>
            {procedureSubCat &&
              procedureSubCat.length > 0 &&
              procedureSubCat.map((e) => (
                <ToggleButton value={e.tcs_id} key={e.tcs_id}>
                  {e.tcs_nombre}
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="bg-white pb-40" style={{ paddingLeft: '3%' }}>
        <div className="flex flex-col">
          <p className="mt-20 text-primary font-bold text-16">Selecciona el tipo de trámite</p>
          <div className="w-full flex flex-wrap">
            {loading ? (
              <div className=" w-full mt-16 flex justify-center">
                <CircularProgress />
              </div>
            ) : newData && newData.length > 0 ? (
              newData.map((e) => {
                return (
                  <Card className={clsx(classes.cardInfo, 'bg-white my-16 mx-10')} key={e.tt_id}>
                    <CardMedia
                      component="img"
                      height="140px"
                      image={`${api.url_bucket}/img/${e.tt_imagen}`}
                      alt="tramite"
                      style={{ maxHeight: 140 }}
                    />
                    <CardContent>
                      <p className="mb-10 text-12 text-primaryBlack">
                        {e.fk_tram_subcategoria.tcs_nombre}
                      </p>
                      <Tooltip title={e.tt_nombre} placement="top">
                        <p
                          className="text-14 font-bold overflow-hidden cursor-pointer"
                          style={{
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            display: '-webkit-box',
                            height: 40,
                          }}
                          onClick={() => {
                            history.push({
                              pathname: `/detalle-tramite/${e.tt_id}`,
                              type: e.fk_tram_subcategoria.tcs_nombre,
                            });
                          }}
                        >
                          {e.tt_nombre}
                        </p>
                      </Tooltip>
                      <p
                        style={{
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          display: '-webkit-box',
                        }}
                        className="overflow-hidden mt-16"
                      >
                        {e.tt_descripcion}
                      </p>
                      <div className="w-full flex justify-end py-10 mt-16">
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => {
                            history.push({
                              pathname: `/tramites-ambientales/${e.tt_id}/nuevo`,
                              // pathname: `/nuevo-tramite/${e.tt_id}`,
                              type: e.fk_tram_subcategoria.tcs_nombre,
                            });
                          }}
                        >
                          <p style={{ color: '#145C9C' }} className="font-bold text-14 mr-6">
                            Iniciar tramite
                          </p>
                          <ArrowForwardRoundedIcon style={{ color: '#145C9C' }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div>No se encontraron resultados</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withReducer('item', reducer)(ListadoTramites);
