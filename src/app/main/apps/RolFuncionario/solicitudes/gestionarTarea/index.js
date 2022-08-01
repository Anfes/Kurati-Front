import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import withReducer from 'app/store/withReducer';

import { IconButton, Breadcrumbs, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomStepper from '@components/CustomStepper';
// import reducer from '../store';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import CustomButton from '@components/CustomButton';
import DialogEditor from '@components/DialogEditor';

import { format } from 'date-fns';
import CustomDialog from '@components/CustomDialog';
import {
  getArchivoPasoUno,
  getSolicitudEtapaUno,
  createDevolverPasoUno,
  createAprobarPasoUno,
  createValidarPasoDos,
  createValidarPasoTres,
  createValidarPasoCuatro,
} from '../store/gestionarSlice';
import reducer from '../store';

import FirstStep from './firstStep';
import SecondStep from './secondStep';
import ThirdStep from './thirdStep';
import FourthStep from './fourthStep';

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
}));

function VerSolicitud() {
  const classes = useStyles();
  const history = useHistory();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const itemGestion = useSelector(({ tramitesApp }) => tramitesApp.gestionar.dataTram);
  const itemPasoUno = useSelector(({ tramitesApp }) => tramitesApp.gestionar.pasoUno);
  const user = useSelector(({ auth }) => auth.user);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [editor, setEditor] = useState('');
  const [dialogEditor, setDialogEditor] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [prorroga, setProrroga] = useState(false);
  const [fileArrayList, setFileArrayList] = useState([]);
  const [fileArrayListThree, setFileArrayListThree] = useState({
    liquidacion: [],
    recibo: [],
  });
  const [form, setForm] = useState({
    // secund step
    conceptoAgua: '',
    conceptoSuelo: '',
    soporteConcepto: '',
    // third step
    liqu_observacion: '',
    // fourth step
    sp_observacion: '',
  });
  let disableFistStep;
  let disableSecundStep;
  let disableThirdStep;
  let disableFourthStep;

  useEffect(() => {
    async function fetch() {
      await dispatch(getSolicitudEtapaUno(routeParams?.id));
      await dispatch(getArchivoPasoUno(routeParams?.id));
    }
    fetch();
  }, [dispatch, routeParams?.id]);

  useEffect(() => {
    if (user.fk_roles?.rl_rol) {
      switch (user.fk_roles?.rl_rol) {
        case 'CLI_VENTANILLA_UNICA':
          return setActiveStep(0);
        case 'CLI_PLANIFICACION_AMBIENTAL':
          return setActiveStep(1);
        case 'CLI_LIQUIDADOR':
          return setActiveStep(2);
        case 'CLI_FINANCIERO':
          return setActiveStep(3);
        default:
          return setActiveStep(0);
      }
    }
  }, [user.fk_roles?.rl_rol]);

  // useEffect(() => {
  //   if (itemGestion?.ss_paso_actual) {
  //     setActiveStep(itemGestion.ss_paso_actual);
  //   }
  // }, [itemGestion]);

  const changeText = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  // disabled buttons --------------------------------------------------------------------------------------

  disableSecundStep =
    form.conceptoAgua === '' || form.conceptoSuelo === '' || fileArrayList.length <= 0;
  disableThirdStep =
    fileArrayListThree.liquidacion.length <= 0 && fileArrayListThree.recibo.length <= 0;
  disableFourthStep = fileArrayList.length <= 0;

  const newData = itemPasoUno.map((e) => ({
    sol_revision_documental: e.sol_revision_documental,
  }));
  const newDataIdR = newData.map((e) => ({
    srd_estado: e.sol_revision_documental?.srd_estado,
  }));
  /* Si todos son 3 o 1 o null devuelve true */
  /* Y el servicio createAprobarPasoUno se ejecuta  */
  const disabled1 = newData.every((elem) => elem.sol_revision_documental === null);
  const disabled2 = newDataIdR.every((elem) => elem.srd_estado === 1);
  const disabled3 = newDataIdR.every((elem) => elem.srd_estado === 3);

  // steper functions --------------------------------------------------------------------------------------
  const handleNextOne = async () => {
    const body = {
      ss_id: Number(routeParams.id),
    };
    await dispatch(createAprobarPasoUno(body));
    setActiveStep(1);
  };
  const handleNextTwo = (type) => () => {
    setTypeModal(type);
    setModalAlert(true);
  };
  const handleNextThree = async () => {
    const body = {
      sl_id_solicitud: Number(routeParams.id),
      sl_liquidacion: fileArrayListThree.liquidacion,
      sl_recibo: fileArrayListThree.recibo,
      sl_observacion: form.liqu_observacion,
      userCreator: itemGestion.ss_id_usuario,
    };
    await dispatch(createValidarPasoTres(body));
  };
  const handleNextFourt = async () => {
    const body = {
      sp_id_solicitud: Number(routeParams.id),
      sp_soporte_pago: fileArrayList,
      sp_observacion: form.sp_observacion,
      userCreator: itemGestion.ss_id_usuario,
    };
    console.log('ddddddd', body)
    await dispatch(createValidarPasoCuatro(body));
  };

  const handleDocumentStepTwo = (estado) => async () => {
    const body = {
      sca_id_solicitud: Number(routeParams.id),
      sca_concepto_agua: form.conceptoAgua,
      sca_concepto_suelo: form.conceptoSuelo,
      sca_tipo: 1,
      sca_estado: estado,
      userCreator: itemGestion.ss_id_usuario,
      arrayFile: fileArrayList,
    };
    await dispatch(createValidarPasoDos(body));
    setTypeModal('');
    setModalAlert(false);
  };
  const closeDialogAlert = () => {
    setTypeModal('');
    setModalAlert(false);
  };

  const rejectSteptwo = (type) => async () => {
    setTypeModal(type);
    setModalAlert(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

  const rejectDocuments = async () => {
    const body = {
      ss_id: Number(routeParams.id),
    };
    await dispatch(createDevolverPasoUno(body));
  };

  const handleCloseEditor = () => setDialogEditor(!dialogEditor);
  const handleEditor = (e) => setEditor(e);

  return (
    <div>
      {modalAlert && (
        <CustomDialog
          open={modalAlert}
          img="/assets/images/dialogs/unregistered.png"
          title={`¿Estas seguro que deseas ${typeModal} este documento?`}
          contentText={
            <div className="flex flex-row items-center justify-between w-full">
              <CustomButton
                label="Si, estoy seguro"
                className="primary"
                height="medium"
                width="full"
                onClick={handleDocumentStepTwo(1)}
                style={{ marginRight: 10 }}
              />
              <CustomButton
                label="No, estoy seguro"
                className="error"
                height="medium"
                width="full"
                onClick={closeDialogAlert}
                style={{ marginLeft: 10 }}
              />
            </div>
          }
        />
      )}
      {dialogEditor && (
        <DialogEditor
          open={dialogEditor}
          close={handleCloseEditor}
          value={editor}
          onChange={handleEditor}
        />
      )}
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
              <p className="text-primary font-semibold text-18">Revisión Documental</p>
            </div>
          </div>
          <div>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link href="/" style={{ color: '#023E73' }}>
                {' '}
                Inicio{' '}
              </Link>
              <Link href="/solicitudes" style={{ color: '#023E73' }}>
                Solicitudes
              </Link>
              <p style={{ color: '#023E73' }}>Revisión documentos</p>
            </Breadcrumbs>
            <div className={classes.indicadorEtapa}>Solicitud - Revisión Documental</div>
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
            {itemGestion.fk_tra_tramite?.tt_nombre}
          </p>
          <p className="text-14 font-bold text-primary">Fecha Solicitud:</p>
          <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
            {itemGestion.tram_info_general && itemGestion.tram_info_general.tig_fecha_creacion && (
              <div>
                {`${format(
                  new Date(itemGestion.tram_info_general?.tig_fecha_creacion),
                  'yyyy-MM-dd'
                )}`}{' '}
                {`${format(
                  new Date(itemGestion.tram_info_general?.tig_fecha_creacion),
                  '(hh:mm a)'
                )}`}
              </div>
            )}
          </p>
        </div>
        <div className="flex flex-col items-start ">
          <p className="text-14 font-bold text-primary">Número de profesionales asignados:</p>
          <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
            2
          </p>
          <p className="text-14 font-bold text-primary">Costo total proyecto :</p>
          <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
            ${itemGestion.tram_info_general?.tig_costo_proyecto}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <p className="text-18 font-bold text-primary">Solicitud #</p>
          <p className="text-16 font-bold mb-12" style={{ color: '#2E7EC5' }}>
            {itemGestion.ss_id}
          </p>
          <p className="text-14 font-bold text-primary">Solicitante :</p>
          <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
            {itemGestion.fk_creador?.user_solicitante?.us_nombres}{' '}
            {itemGestion.fk_creador?.user_solicitante?.us_apellidos} - C.C.{' '}
            {itemGestion.fk_creador?.user_solicitante?.us_documento}
          </p>
        </div>
      </div>
      <CustomStepper
        steps={['Revisión documental', 'Verificación', 'Liquidar', 'Pago']}
        content={[
          <FirstStep disableFistStep={disableFistStep} itemPasoUno={itemPasoUno} />,
          <SecondStep
            disableSecundStep={disableSecundStep}
            form={form}
            changeText={changeText}
            itemPasoUno={itemPasoUno}
            fileArrayList={fileArrayList}
            setFileArrayList={setFileArrayList}
          />,
          <ThirdStep
            disableThirdStep={disableThirdStep}
            changeText={changeText}
            form={form}
            fileArrayList={fileArrayListThree}
            setFileArrayList={setFileArrayListThree}
          />,
          <FourthStep
            disableFourthStep={disableFourthStep}
            changeText={changeText}
            form={form}
            setForm={setForm}
            prorroga={prorroga}
            fileArrayList={fileArrayList}
            setFileArrayList={setFileArrayList}
          />,
        ]}
        activeStep={activeStep}
        isStepOptional={isStepOptional}
        isStepSkipped={isStepSkipped}
        handleReset={handleReset}
      />
      <div className="w-full flex justify-end my-20 px-32">
        {activeStep === 0 || activeStep === 1 ? (
          <div className="w-216 mr-12">
            <CustomButton
              label={activeStep === 0 ? 'Devolver Documentos' : 'Concepto Negativo'}
              className="error"
              height="medium"
              onClick={
                activeStep === 0
                  ? rejectDocuments
                  : activeStep === 1
                  ? rejectSteptwo('devolver')
                  : handleBack
              }
              width="full"
              disabled={
                activeStep === 0
                  ? disabled1 || !disabled2
                  : activeStep === 1
                  ? disableSecundStep
                  : false
              }
            />
          </div>
        ) : (
          ''
        )}
        <div className="w-216">
          {activeStep === 0 && (
            <CustomButton
              label="Aprobar Documentación"
              className="primary"
              height="medium"
              width="full"
              onClick={handleNextOne}
              disabled={disabled1 || !disabled3}
            />
          )}
          {activeStep === 1 && (
            <CustomButton
              label="Concepto Positivo"
              className="primary"
              height="medium"
              width="full"
              onClick={handleNextTwo('aprobar')}
              disabled={disableSecundStep}
            />
          )}
          {activeStep === 2 && (
            <CustomButton
              label="Notificar  Recibo"
              className="primary"
              height="medium"
              width="full"
              onClick={handleNextThree}
              disabled={disableThirdStep}
            />
          )}
          {activeStep === 3 && (
            <CustomButton
              label="Guardar Soporte de pago"
              className="primary"
              height="medium"
              width="full"
              onClick={handleNextFourt}
              disabled={disableFourthStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// export default VerSolicitud;
export default withReducer('tramitesApp', reducer)(VerSolicitud);
