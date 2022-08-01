import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import _ from '@lodash';
import md5 from 'md5';
import { Box, Grid, IconButton, Modal, Typography } from '@mui/material';
import { useDeepCompareEffect } from '@fuse/hooks';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

import CustomStepper from '@components/CustomStepper';
import CustomButton from '@components/CustomButton';
import CustomLoading from '@components/CustomLoading';

import withReducer from 'app/store/withReducer';
import { showMessage } from 'app/store/fuse/messageSlice';
import { uploadFile } from 'app/utils/uploadFile';
import Solicitante from './verSolicitud/Solicitante';
import InformacionGen from './verSolicitud/InformacionGen';
import PuntoCaptacion from './verSolicitud/PuntoCaptacion';
import DemandaUso from './verSolicitud/DemandaUso';
import Anexos from './verSolicitud/Anexos';
import Firma from './verSolicitud/Firma';

import reducer from './store';
import {
  setRedirect,
  getCities,
  getDocumentType,
  getCitiesByState,
  getStates,
  getSolicitante,
  cleanRedux,
  saveDataSolicitante,
  getSolicitudById,
  saveDataInfoGeneral,
  getInfoGeneral,
  getPuntoCaptacion,
  saveDataPuntoCaptacion,
  updateDataPuntoCaptacion,
  cambiarPasoSolicitud,
  updateDataSolicitante,
  createFileAnexo,
  getFileAnexos,
  deleteFileAnexo,
  updateDataInfoGeneral,
  updateDataDemandaUso,
  saveDataDemandaUso,
  getDemandaUso,
  documentacionAnexos,
  updateAnexo,
} from './store/Tramite3Slice';

const useStyles = makeStyles((theme) => ({
  primary: {
    background: '#023E73',
    color: '#4FDFC8',
    borderRadius: 8,
    '&:hover': {
      background: '#145C9C',
      textDecoration: 'none',
    },
    '&:focus': {
      background: '#2E7EC5',
      textDecoration: 'none',
    },
  },
}));

const Tramite3 = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const history = useHistory();
  const user = useSelector(({ auth }) => auth.user);
  //----------------------------------------------------------------------------
  const redirectSync = useSelector(({ tramApp3 }) => tramApp3.solicitante.redirect);
  const loadingSync = useSelector(({ tramApp3 }) => tramApp3.solicitante.loading);
  const document = useSelector(({ tramApp3 }) => tramApp3.solicitante.dataTipoDocumento);
  const cities = useSelector(({ tramApp3 }) => tramApp3.solicitante.dataCities);
  const states = useSelector(({ tramApp3 }) => tramApp3.solicitante.dataStates);
  const docAnexos = useSelector(({ tramApp3 }) => tramApp3.solicitante.documentoAnexos);
  //------------------------------------------------------------------------------
  const solicitud = useSelector(({ tramApp3 }) => tramApp3.solicitante.solicitud);
  //----------------------------------------------------------------------------
  const dataSolicitante = useSelector(({ tramApp3 }) => tramApp3.solicitante.dataSolicitante);
  const dataInfoGeneral = useSelector(({ tramApp3 }) => tramApp3.solicitante.dataInfoGeneral);
  const dataPuntoCaptacion = useSelector(({ tramApp3 }) => tramApp3.solicitante.dataPuntoCaptacion);
  const dataDemandaUso = useSelector(({ tramApp3 }) => tramApp3.solicitante.dataDemandaUso);
  const dataAnexoArchivo = useSelector(({ tramApp3 }) => tramApp3.solicitante.dataAnexoArchivo);
  const dataAll = useSelector(({ tramApp3 }) => tramApp3);
  //------------------------------------------------------------------------------
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [open, setOpen] = useState(false);
  //----------------------------------------------------------------------------
  const [disabledSolic, setDisabledSolic] = useState(false);
  const [disabledGen, setDisabledGen] = useState(false);
  const [disabledCaptacion, setDisabledCaptacion] = useState(false);
  const [disabledDemanda, setDisabledDemanda] = useState(false);
  const [disabledAnexos, setDisabledAnexos] = useState();
  const [disabledFirma, setDisabledFirma] = useState(false);
  const [errorActividad, setErrorActividad] = useState(false);
  //------------------------------------------------------------------------------
  const [typeAction, setTypeAction] = useState('');
  const [firstAction, setFirstAction] = useState(false);
  const [noProduct, setNoProduct] = useState(false);
  //----------------------------------------------------------------------------
  const [listadoAnexosLeft, setListadoAnexosLeft] = useState([]);
  const [listadoAnexosRight, setListadoAnexosRight] = useState([]);
  //----------------------------------------------------------------------------
  const [arrayCoor, setArrayCoor] = useState([]);
  const [informe, setInforme] = useState([]);
  const [dataInforme, setDataInforme] = useState([]);
  //----------------------------------------------------------------------------
  const [domesticoArray, setDomesticoArray] = useState([]);
  const [riesgoArray, setRiesgoArray] = useState([]);
  const [acuiculturaArray, setAcuiculturaArray] = useState([]);
  const [abrevaderosArray, setAbrevaderosArray] = useState([]);
  //------------------------------------------------------------------------------
  const [loadingAnexos, setLoadingAnexos] = useState();
  //----------------------------------------------------------------------------
  const [formSol, setFormSol] = useState({
    solicitudId: '',
    tramiteName: '',
    solicitudEtapa: '',
    solicitudEstado: '',
  });
  const [form, setForm] = useState({
    personType: 1,
    personType2: '',
    businessName: '',
    documentType: '',
    documentNumber: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    fax: '',
    autNot: 0,
    addressNot: '',
    calAct: '',
    repOrApo: 1,
    nameRep: '',
    documentTypeRep: '',
    documentNumberRep: '',
    expeditionPlaceRep: '',
    addressRep: '',
    cityRep: '',
    phoneRep: '',
    emailRep: '',
    faxRep: '',
  });
  const [formInfoGen, setFormInfoGen] = useState({
    nombrePredio: '',
    direccion: '',
    departamento: '',
    municipio: '',
    vereCorre: '',
    actividad: '',
    ciiu: '',
    costoPro: '',
    costoProLet: '',
  });

  const [formInfoCap, setFormInfoCap] = useState({
    tipoFuente: '',
    nombreFuente: '',
    verCor: '',
    departamento: '',
    municipio: '',
    infoCoordenada: [],
    servidumbre: 0,
    observaciones: '',
    informe: [],
  });

  const [formDemanda, setFormDemanda] = useState({
    tipoActividad: '',
    descripcionFinUso: '',
    cantidadAgua: '',
    tiempoConcesion: '',
    mesAno: '',
    tipoAnexo: '',
    infoAbastecimientoDomestico: [],
    infoRiegosSilvicultura: [],
    infoAgriculturaPesca: [],
    infoAbastecimientoAbrevaderos: [],
  });

  const [fileArrayList, setFileArrayList] = useState({
    documentos: [],
    sociedadesUnic: [],
    jac: [],
    poder: [],
    propietario: [],
    tenedor: [],
    poseedor: [],
    censoUnic: [],
    concesionesEsp: [],
    autorizacionSan: [],
    sistemas: [],
    concesionAgua: [],
    documentoAdd: [],
    documentoAddReq: [],

    cdcrdd: [],
    anotacionesAd: [],
    disenoPozo: [],
    acuCenso: [],
    acuAutoricacion: [],
    preCenso: [],
    preAutoricacion: [],
    refriDetalle: [],
    refriAdicional: [],
    refriOperaciones: [],
    completoFactibilidad: [],
    energAnotacion: [],
    energCantidad: [],
    industrialFactibilidad: [],
    minerofactibilidad: [],
    estudioFactibilidad: [],
  });

  const [formFirma, setFormFirma] = useState({
    telefono: '',
    codigo: '',
  });
  //----------------------------------------------------------------------------
  const loadAdditionalData = async () => {
    await dispatch(getDocumentType());
    await dispatch(getCities());
    await dispatch(getStates());
  };

  useEffect(async () => {
    if (
      formInfoCap &&
      formInfoCap.departamento &&
      formInfoCap.departamento.value &&
      formInfoCap.departamento.value
    ) {
      await dispatch(getCitiesByState(formInfoCap.departamento.value));
    }
    if (
      formInfoGen &&
      formInfoGen.departamento &&
      formInfoGen.departamento.value &&
      formInfoGen.departamento.value
    ) {
      await dispatch(getCitiesByState(formInfoGen.departamento.value));
    }
  }, [formInfoGen.departamento, formInfoCap.departamento]);

  useDeepCompareEffect(() => {
    async function fetch() {
      const { solId } = routeParams;
      if (solId === 'nuevo') {
        setFirstAction(true);
        await dispatch(loadAdditionalData);
        setTypeAction('add');
      } else {
        await dispatch(getSolicitudById(3, solId));
      }
    }
    fetch();

    return () => {
      dispatch(cleanRedux());
    };
  }, [dispatch, routeParams]);

  useEffect(() => {
    async function fetchLoad() {
      if (!_.isEmpty(solicitud)) {
        setFormSol({ ...solicitud });

        setActiveStep(solicitud.pasoActual);
        if (solicitud.pasoActual === 0) {
          await dispatch(loadAdditionalData);
          await dispatch(getSolicitante(solicitud.solicitudId));
        }
        if (solicitud.pasoActual === 1) {
          await dispatch(getInfoGeneral(solicitud.solicitudId));
          await dispatch(loadAdditionalData);
        }
        if (solicitud.pasoActual === 2) {
          await dispatch(getPuntoCaptacion(solicitud.solicitudId));
          await dispatch(loadAdditionalData);
        }
        if (solicitud.pasoActual === 3) {
          await dispatch(getDemandaUso(solicitud.solicitudId));
        }
        if (solicitud.pasoActual === 4) {
          await dispatch(documentacionAnexos(3));
          await dispatch(getFileAnexos(solicitud.solicitudId));
        }
        /**
         * Show Message if the requested products is not exists
         */
        setNoProduct(false);
      }
    }

    fetchLoad();
  }, [solicitud]);

  useEffect(() => {
    if (!_.isEmpty(docAnexos)) {
      setListadoAnexosLeft(docAnexos.filter((e) => e.td_ubicacion === 1));
      setListadoAnexosRight(docAnexos.filter((e) => e.td_ubicacion === 2));
    }
  }, [docAnexos]);

  useEffect(() => {
    async function fetchEnd() {
      if (redirectSync) {
        // console.log('redirectSync 3', redirectSync)
        dispatch(setRedirect());
        props.history.push('/mis-solicitudes');
      }
    }
    fetchEnd();
  }, [redirectSync]);

  //--------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  useEffect(() => {
    if (!_.isEmpty(dataSolicitante)) {
      setForm({ ...dataSolicitante });
      setTypeAction('edit');
    }
  }, [dataSolicitante]);

  useEffect(() => {
    if (activeStep === 1) {
      if (!_.isEmpty(dataInfoGeneral)) {
        setFormInfoGen({ ...dataInfoGeneral });
        setTypeAction('edit');
      } else {
        setTypeAction('add');
      }
    }
  }, [dataInfoGeneral]);

  useEffect(() => {
    if (activeStep === 2) {
      if (!_.isEmpty(dataPuntoCaptacion)) {
        setFormInfoCap({ ...dataPuntoCaptacion });
        setTypeAction('edit');
      } else {
        setTypeAction('add');
      }
    }
  }, [dataPuntoCaptacion]);

  useEffect(() => {
    if (activeStep === 3) {
      if (!_.isEmpty(dataDemandaUso)) {
        setFormDemanda({ ...dataDemandaUso });
        setTypeAction('edit');
      } else {
        setTypeAction('add');
      }
    }
  }, [dataDemandaUso]);

  useEffect(() => {
    if (activeStep === 4) {
      if (!_.isEmpty(dataAnexoArchivo)) {
        setFileArrayList({ ...dataAnexoArchivo });
        setTypeAction('edit');
      } else {
        setTypeAction('add');
      }
    }
  }, [dataAnexoArchivo]);
  //-------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------
  const handleUploadChange = async (eventFile, id, name) => {
    const countArry = fileArrayList[name];
    if (countArry && countArry.length > 9) {
      await dispatch(
        showMessage({ message: `Puedes adjuntar hasta 10 archivos por campo`, variant: 'error' })
      );
    } else {
      setLoadingAnexos(name);
      const file = eventFile[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = async () => {
        const type =
          file.type === 'application/pdf'
            ? 'pdf'
            : file.type ===
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ? 'docx'
            : file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ? 'xlsx'
            : file.type === 'image/png'
            ? 'png'
            : 'jpeg';

        const data = {
          file,
          name_archivo: `${md5(Date.now())}.${type}`,
          url_base64: `data:${file.type};base64,${btoa(reader.result)}`,
        };
        // ----------------------------------------------------------------------
        setFileArrayList({
          ...fileArrayList,
          [name]: fileArrayList[name].concat(
            eventFile.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          ),
        });
        // ----------------------------------------------------------------------
        const result = await uploadFile(`${user.usr_id}/${formSol.solicitudId}/solicitud`, data);
        if (result) {
          const body = {
            sa_id_solicitud: formSol.solicitudId,
            sa_id_tram_documento: id,
            sa_archivo: data.name_archivo,
          };
          const resul = await dispatch(createFileAnexo(body));
          if (resul) {
            await dispatch(getFileAnexos(formSol.solicitudId));
            setLoadingAnexos();
            dispatch(showMessage({ message: '¡Imagen cargada con éxito.!', variant: 'success' }));
          }
        }
      };
      reader.onerror = function (error) {
        console.log('error on load image', error);
      };
    }
  };

  const handleUploadDelete = (eventFile) => async () => {
    const resul = await dispatch(deleteFileAnexo(eventFile.sa_id));
    if (resul) {
      dispatch(showMessage({ message: '¡Imagen Eliminada con éxito.!', variant: 'success' }));
      await dispatch(getFileAnexos(formSol.solicitudId));
    }
  };
  //-----------------------------------------------------------------------------------------------
  const handleBack = async () => {
    setNoProduct(true);
    const result = await dispatch(
      cambiarPasoSolicitud({ ss_id: formSol.solicitudId, ss_paso_actual: activeStep - 1 })
    );
    if (result) {
      await dispatch(getSolicitudById(3, formSol.solicitudId));
    }
  };

  const handleContinue = async () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);

    setNoProduct(true);
    const result = await dispatch(
      cambiarPasoSolicitud({ ss_id: formSol.solicitudId, ss_paso_actual: activeStep + 1 })
    );
    if (result) {
      await dispatch(getSolicitudById(3, formSol.solicitudId));
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isStepOptional = (step) => {
    return step === 6;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //-----------------------------------------------------------------------------------------------
  const handleNext = async () => {
    if (activeStep === 0) {
      if (firstAction) {
        const data = {
          ss_id_cliente: 1,
          ss_id_tramite: 3,
          ss_tipo: 1,
          tds_id_ciudad: form.city.value,
          tds_tipo_persona: form.personType,
          tds_jur_tipo: form.personType === 1 ? null : form.personType2,
          tds_nombre_o_razon_social: form.businessName,
          tds_id_tipo_documento: form.documentType,
          tds_nro_doc: form.documentNumber,
          tds_direccion: form.address,
          tds_telefonos: form.phone,
          tds_fax: form.fax,
          tds_email: form.email,
          tds_reapo_tipo: form.repOrApo,
          tds_repapo_nombre: form.nameRep,
          tds_repapo_id_tipo_doc: form.documentTypeRep,
          tds_repapo_nro_doc: form.documentNumberRep,
          tds_repapo_id_ciudad_expedicion: form.expeditionPlaceRep.value,
          tds_repapo_direccion: form.addressRep,
          tds_repapo_id_ciudad: form.cityRep.value,
          tds_repapo_telefonos: form.phoneRep,
          tds_repapo_fax: form.faxRep,
          tds_repapo_email: form.emailRep,
          tds_en_calidad: form.calAct,
          tds_autoriza_notif_email: form.autNot,
          tds_direccion_notif_fisica: form.autNot === 0 ? null : form.addressNot,
        };
        const resul = await dispatch(saveDataSolicitante(data));
        if (resul) {
          let newSkipped = skipped;
          if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
          }
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
          history.push(`/tramites-ambientales/3/${resul.tds_id_solicitud}`);
        }
      }
      if (typeAction === 'edit') {
        const data = {
          tds_id_ciudad: form.city.value,
          tds_tipo_persona: form.personType,
          tds_jur_tipo: form.personType === 1 ? null : form.personType2,
          tds_nombre_o_razon_social: form.businessName,
          tds_id_tipo_documento: form.documentType,
          tds_nro_doc: form.documentNumber,
          tds_direccion: form.address,
          tds_telefonos: form.phone,
          tds_fax: form.fax,
          tds_email: form.email,
          tds_reapo_tipo: form.repOrApo,
          tds_repapo_nombre: form.nameRep,
          tds_repapo_id_tipo_doc: form.documentTypeRep,
          tds_repapo_nro_doc: form.documentNumberRep,
          tds_repapo_id_ciudad_expedicion: form.expeditionPlaceRep.value,
          tds_repapo_direccion: form.addressRep,
          tds_repapo_id_ciudad: form.cityRep.value,
          tds_repapo_telefonos: form.phoneRep,
          tds_repapo_fax: form.faxRep,
          tds_repapo_email: form.emailRep,
          tds_en_calidad: form.calAct,
          tds_autoriza_notif_email: form.autNot,
          tds_direccion_notif_fisica: form.autNot === 0 ? null : form.addressNot,
        };
        const resul = await dispatch(updateDataSolicitante(data, formSol.solicitudId));
        if (resul) {
          handleContinue();
        }
      }
    } else if (activeStep === 1) {
      if (typeAction === 'add') {
        const data = {
          tig_id_solicitud: formSol.solicitudId,
          tig_id_ciudad: formInfoGen.municipio.value,
          tig_nombre: formInfoGen.nombrePredio,
          tig_direccion: formInfoGen.direccion,
          tig_vereda_corregimiento: formInfoGen.vereCorre,
          tig_actividad: formInfoGen.actividad,
          tig_costo_proyecto: formInfoGen.costoPro,
          tig_valor_letras: formInfoGen.costoProLet,
          tig_codigo_ciiu: formInfoGen.ciiu,
        };
        const resul = await dispatch(saveDataInfoGeneral(data));
        if (resul) {
          handleContinue();
        }
      } else {
        const data = {
          tig_id_ciudad: formInfoGen.municipio.value,
          tig_nombre: formInfoGen.nombrePredio,
          tig_direccion: formInfoGen.direccion,
          tig_vereda_corregimiento: formInfoGen.vereCorre,
          tig_actividad: formInfoGen.actividad,
          tig_costo_proyecto: formInfoGen.costoPro,
          tig_valor_letras: formInfoGen.costoProLet,
          tig_codigo_ciiu: formInfoGen.ciiu,
        };
        const resul = await dispatch(updateDataInfoGeneral(data, formSol.solicitudId));
        if (resul) {
          handleContinue();
        }
      }
    } else if (activeStep === 2) {
      if (typeAction === 'add') {
        const data = {
          tip_id_solicitud: formSol.solicitudId,
          tip_tipo_fuente: formInfoCap.tipoFuente,
          tip_nombre: formInfoCap.nombreFuente,
          tip_pobvercorr: formInfoCap.verCor,
          tip_id_ciudad_pobvercorr: formInfoCap.municipio.value,
          tip_coordenadas: arrayCoor,
          tip_requiere_servidumbre: formInfoCap.servidumbre,
          tip_observaciones: formInfoCap.observaciones,
          tip_croquis: '',
          // tip_croquis: dataInforme,
        };
        const resul = await dispatch(saveDataPuntoCaptacion(data));
        if (resul) {
          handleContinue();
        }
      } else {
        const data = {
          tip_tipo_fuente: formInfoCap.tipoFuente,
          tip_nombre: formInfoCap.nombreFuente,
          tip_pobvercorr: formInfoCap.verCor,
          tip_id_ciudad_pobvercorr: formInfoCap.municipio.value,
          tip_coordenadas: arrayCoor,
          tip_requiere_servidumbre: formInfoCap.servidumbre,
          tip_observaciones: formInfoCap.observaciones,
          tip_croquis: '',
          // tip_croquis: dataInforme,
        };
        const resul = await dispatch(updateDataPuntoCaptacion(data, formSol.solicitudId));
        if (resul) {
          handleContinue();
        }
      }
    } else if (activeStep === 3) {
      if (typeAction === 'add') {
        const resul = await dispatch(
          saveDataDemandaUso({
            ...formDemanda,
            tdu_id_solicitud: formSol.solicitudId,
            tdu_abastecimiento_domestico: domesticoArray,
            tdu_riegos_silvicultura: riesgoArray,
            tdu_agricultura_pesca: acuiculturaArray,
            tdu_abastecimiento_abrevaderos: abrevaderosArray,
          })
        );
        if (resul) {
          handleContinue();
        }
      } else {
        const resul = await dispatch(
          updateDataDemandaUso(
            {
              ...formDemanda,
              tdu_id_solicitud: formSol.solicitudId,
              tdu_abastecimiento_domestico: domesticoArray,
              tdu_riegos_silvicultura: riesgoArray,
              tdu_agricultura_pesca: acuiculturaArray,
              tdu_abastecimiento_abrevaderos: abrevaderosArray,
            },
            formSol.solicitudId
          )
        );

        if (resul) {
          handleContinue();
        }
      }
    } else if (activeStep === 4) {
      const resul = await dispatch(updateAnexo({}, formSol.solicitudId));
      if (resul) {
        handleContinue();
      }
    } else {
      console.log('firma');
      handleContinue();
    }
  };

  return (
    <div className="">
      <Modal open={open} onClose={handleClose}>
        <Box
          className="w-screen h-screen p-96 flex flex-col justify-center"
          style={{ backgroundColor: '#F5FBFF' }}
        >
          <IconButton
            onClick={handleClose}
            className={clsx(
              'bg-primary w-40 h-40 rounded-4 absolute flex justify-center items-center',
              classes.primary
            )}
            style={{ top: 25, right: 25 }}
          >
            <CloseIcon className="text-secondary text-24" />
          </IconButton>
          <div className="flex justfy-center items-center w-screen h-screen">
            <div className="flex flex-col w-1/2 mr-32">
              <div className="flex mb-24 items-center">
                <Typography className="text-24 text-primary font-semibold mr-8">
                  ¡Solicitud radicada con éxito!
                </Typography>
                <CheckCircleIcon className="text-primary text-24" />
              </div>
              <Typography className="font-semibold text-14 mb-16" style={{ color: '#223240' }}>
                Número de radicado: 758463920
              </Typography>
              <div className="mb-16">
                <Typography className="text-11 font-semibold" style={{ color: '#7F9BB4' }}>
                  Fecha de recepción
                </Typography>
                <Typography className="text-14 font-semibold" style={{ color: '#223240' }}>
                  2021-10-28 (02:00pm)
                </Typography>
              </div>
              <div className="mb-24">
                <Typography className="text-11 font-semibold" style={{ color: '#7F9BB4' }}>
                  Solicitud
                </Typography>
                <Typography className="text-14 font-semibold" style={{ color: '#223240' }}>
                  Consesión, aumento, participación y traspaso de aguas superficiales.
                </Typography>
              </div>
              <div
                className="p-16 mb-28"
                style={{ backgroundColor: '#EEF7FF', border: '1px solid #2E7EC5' }}
              >
                <Typography style={{ color: '#2E7EC5' }}>
                  <span className="font-bold">Importante:</span> Sr usuario, en CORTOLIMA
                  validaremos la documentación recibida e iniciaremos el proceso correspondiente, le
                  estaremos contactando vía email y SMS a su celular. Por favor estar pendiente del
                  estado de su solicitud ingresando a la plataforma de trámites con su email y
                  contraseña.
                  <br />
                  <span className="font-bold">
                    Cualquier duda por favor enviar un email a solicitudes@cortolima.com
                  </span>
                </Typography>
              </div>
              <div className="flex">
                <div className="mr-8">
                  <CustomButton
                    label="Ir a mis solicitudes"
                    className="primary"
                    height="medium"
                    component={Link}
                    to="/tramites"
                  />
                </div>
                <div>
                  <CustomButton label="Ahora no" height="medium" />
                </div>
              </div>
            </div>
            <div className="w-1/2 ml-32 flex justify-center items-center">
              <img alt="loading" src="/assets/images/dialogs/success.png" className="w-1/2" />
            </div>
          </div>
        </Box>
      </Modal>
      <Grid className="bg-primaryLight  w-full min-h-136">
        <div
          className="flex sm:flex-row flex-col sm:justify-between sm:items-center "
          style={{ minHeight: '13.9rem' }}
        >
          <div className="flex sm:flex-row flex-col sm:mx-32">
            <div className="bg-primary rounded-full h-32 sm:w-auto w-32 sm:ml-0 sm-mt-0 ml-8 mt-4  flex flex-col justify-center">
              <div className="">
                <IconButton component={Link} to="/mis-solicitudes">
                  <ArrowBackIosNewIcon className="text-secondary text-16" />
                </IconButton>
              </div>
            </div>
            <div className="flex flex-col justify-center mx-12 sm:mb-0 mb-16">
              <Typography className="font-bold text-14 text-primaryBlack">
                {typeAction === 'add' ? `Nueva solicitud` : `ID solicitud: #${formSol.solicitudId}`}
              </Typography>
              <Typography className="font-bold text-20 text-primary">
                {typeAction === 'add'
                  ? `Concesión de aguas superficiales`
                  : `${formSol.tramiteName}`}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col sm:items-end  sm:mx-36 mx-12">
            <div className="flex flex-col pt-20">
              <div className="w-full flex justify-end">
                <Link className="text-12 font-medium" style={{ color: '#023E73' }} to="/dashboard">
                  Inicio
                </Link>
                <Typography className="mx-12 font-medium"> {'>'} </Typography>
                <Link className="text-12 font-medium" style={{ color: '#023E73' }} to="/tramites">
                  Mis solicitudes
                </Link>
                <Typography className="mx-12 font-medium"> {'>'} </Typography>
                <p className="text-primary text-12 font-medium">Detalles de la solicitud</p>
              </div>
            </div>
            <div
              className="w-92 flex justify-center h-36 items-center rounded-full my-4"
              style={{ background: '#D0E9FF' }}
            >
              <Typography className="font-bold text-14" style={{ color: '#2E7EC5' }}>
                Borrador
              </Typography>
            </div>
          </div>
        </div>
      </Grid>
      <div>
        {noProduct ? <CustomLoading /> : null}
        <CustomStepper
          steps={[
            'Solicitante',
            'Información general',
            'Información puntos captación ',
            'Demanda de uso',
            'Anexos',
            'Firma',
          ]}
          content={[
            <Solicitante
              form={form}
              setForm={setForm}
              document={document}
              cities={cities}
              setDisabledSolic={setDisabledSolic}
            />,
            <InformacionGen
              formInfoGen={formInfoGen}
              setFormInfoGen={setFormInfoGen}
              states={states}
              cities={cities}
              setDisabledGen={setDisabledGen}
            />,
            <PuntoCaptacion
              formInfoCap={formInfoCap}
              setFormInfoCap={setFormInfoCap}
              arrayCoor={arrayCoor}
              setArrayCoor={setArrayCoor}
              states={states}
              cities={cities}
              setDisabledCaptacion={setDisabledCaptacion}
              setInforme={setInforme}
              informe={informe}
              dataInforme={dataInforme}
              setDataInforme={setDataInforme}
            />,
            <DemandaUso
              formDemanda={formDemanda}
              setFormDemanda={setFormDemanda}
              setDisabledDemanda={setDisabledDemanda}
              setErrorActividad={setErrorActividad}
              domesticoArray={domesticoArray}
              setDomesticoArray={setDomesticoArray}
              riesgoArray={riesgoArray}
              setRiesgoArray={setRiesgoArray}
              acuiculturaArray={acuiculturaArray}
              setAcuiculturaArray={setAcuiculturaArray}
              abrevaderosArray={abrevaderosArray}
              setAbrevaderosArray={setAbrevaderosArray}
            />,
            <Anexos
              listadoAnexosleft={listadoAnexosLeft}
              listadoAnexosRight={listadoAnexosRight}
              setDisabledAnexos={setDisabledAnexos}
              formSol={formSol}
              fileArrayList={fileArrayList}
              setFileArrayList={setFileArrayList}
              handleUploadChange={handleUploadChange}
              handleUploadDelete={handleUploadDelete}
              loadingAnexos={loadingAnexos}
            />,
            <Firma
              formFirma={formFirma}
              setFormFirma={setFormFirma}
              setDisabledFirma={setDisabledFirma}
            />,
          ]}
          activeStep={activeStep}
          isStepOptional={isStepOptional}
          isStepSkipped={isStepSkipped}
          handleNext={handleNext}
          handleBack={handleBack}
          handleSkip={handleSkip}
          handleReset={handleReset}
        />
      </div>
      <div
        className=" w-full  py-16 px-48 flex justify-end  bg-white"
        style={{
          boxShadow: '0px -2px 8px 4px rgba(229, 229, 229, 0.35)',
          zIndex: 999,
          position: 'fixed',
          bottom: 0,
          left: 0,
        }}
      >
        <div className="mr-12">
          <CustomButton
            label="Atrás"
            className="outlinePrimary"
            disabled={activeStep === 0}
            onClick={handleBack}
            height="medium"
          />
        </div>
        {activeStep === 5 ? (
          <div>
            <CustomButton
              className="primary"
              label="Enviar solicitud"
              height="medium"
              onClick={handleOpen}
              disabled={disabledFirma}
            />
          </div>
        ) : (
          <div>
            <CustomButton
              className="primary"
              label="Guardar y continuar"
              height="medium"
              onClick={handleNext}
              disabled={
                activeStep === 0
                  ? disabledSolic
                  : activeStep === 1
                  ? disabledGen
                  : activeStep === 2
                  ? disabledCaptacion
                  : activeStep === 3
                  ? disabledDemanda
                  : activeStep === 4
                  ? disabledAnexos
                  : null
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default withReducer('tramApp3', reducer)(Tramite3);
