import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@mui/styles';
import { Dialog, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useParams } from 'react-router-dom';

import CustomButton from '@components/CustomButton';
import { DocumentIcon } from '@components/FuseSvgIcon';
import CustomTextField from '@components/CustomTextField';
import CustomToggleButtons from '@components/CustomToggleButtons';
import CustomDocumentsList from '@components/CustomDocumentsList';
import API from 'app/services/constants/api';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  getArchivoPasoUno,
  createArchivoPasoUno,
  updateArchivoPasoUno,
} from '../store/gestionarSlice';

const useStyles = makeStyles(() => ({
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

function FirstStep(props) {
  const { itemPasoUno } = props;
  const dispatch = useDispatch();
  const routeParams = useParams();
  const classes = useStyles();

  const [motivo, setMotivo] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDocs, setDataDocs] = useState([]);
  const [errorEmpty, setErrorEmpty] = useState(false);
  const [emptyRevision, setEmptyRevision] = useState(null);
  const [bodyItem, setBodyItem] = useState({});

  useEffect(() => {
    if (itemPasoUno) {
      setDataDocs(itemPasoUno);
    } else {
      setDataDocs([]);
    }
  }, [itemPasoUno]);

  const closeDialog = () => {
    setMotivo('');
    setOpenDialog(false);
  };

  const handleMotivo = (e) => setMotivo(e.target.value);

  const incorretDocument = (item, state) => async () => {
    const itemCorrecion = item.fk_tram_documento?.sol_anexos.map((e) => ({
      archivo: e.sa_archivo,
    }));
    const body = {
      srd_id_solicitud: Number(routeParams.id),
      srd_id_doc_tram: item.tdt_id,
      srd_estado: state,
      sol_revision_doc_correccion: itemCorrecion,
      srd_etapa: 1,
    };
    if (item.sol_revision_documental === null) {
      setEmptyRevision(true);
      setOpenDialog(true);
      setBodyItem(body);
    }
    if (!isEmpty(item.sol_revision_documental)) {
      setEmptyRevision(false);
      setOpenDialog(true);
      setMotivo(item.sol_revision_documental?.srd_motivo);
      setBodyItem(body);
    }
  };

  const guardarMotivo = async () => {
    const newBody = {
      ...bodyItem,
      srd_motivo: motivo,
    };
    if (emptyRevision) {
      await dispatch(createArchivoPasoUno(newBody));
      await dispatch(getArchivoPasoUno(routeParams.id));
      setOpenDialog(false);
      setMotivo('');
    }
    if (!emptyRevision) {
      await dispatch(
        updateArchivoPasoUno(Number(routeParams.id), bodyItem.srd_id_doc_tram, newBody)
      );
      await dispatch(getArchivoPasoUno(routeParams.id));
      setOpenDialog(false);
      setMotivo('');
    }
  };

  const corretDocument = (item, state) => async () => {
    const itemCorrecion = item.fk_tram_documento?.sol_anexos.map((e) => ({
      archivo: e.sa_archivo,
    }));
    const bodyCreate = {
      srd_id_solicitud: Number(routeParams.id),
      srd_id_doc_tram: item.tdt_id,
      srd_estado: state,
      sol_revision_doc_correccion: itemCorrecion,
      srd_etapa: 1,
      srd_motivo: motivo,
    };
    const bodyUpdate = {
      srd_estado: state,
      sol_revision_doc_correccion: itemCorrecion,
      srd_motivo: motivo,
    };
    if (item.sol_revision_documental === null) {
      await dispatch(createArchivoPasoUno(bodyCreate));
    }
    if (!isEmpty(item.sol_revision_documental)) {
      await dispatch(updateArchivoPasoUno(Number(routeParams.id), item.tdt_id, bodyUpdate));
    }

    await dispatch(getArchivoPasoUno(routeParams.id));
  };

  return (
    <div className="flex flex-col">
      <div className={clsx(classes.infoContainer, 'max-h-450 overflow-auto')}>
        <div className="flex justify-between m-16">
          <p className="font-bold text-16 text-primaryDark">Checkeo de documentos :</p>
          <p className="text-center text-14 font-500">
            ¿Documento correcto y <br />
            verificado?
          </p>
        </div>
        <Dialog open={openDialog}>
          <div className="flex flex-col items-center lg:min-w-512 min-h-200 py-14 px-20">
            <div className="flex justify-between items-center w-full m-12">
              <p className="text-red font-bold text-16">
                Ingresa el motivo de rechazo del documento:
              </p>
              <IconButton onClick={closeDialog}>
                <CloseRoundedIcon style={{ color: '#023E73' }} />
              </IconButton>
            </div>
            <div className="w-full m-12">
              <CustomTextField
                multiline
                value={motivo}
                onChange={handleMotivo}
                rows={5}
                label="Motivo"
                name="motivo"
                error={motivo === '' ? errorEmpty : false}
              />
            </div>
            <div className="my-20 w-full flex justify-end">
              <CustomButton
                label="Guardar"
                className="primary"
                height="large"
                onClick={guardarMotivo}
                disabled={motivo === ''}
              />
            </div>
          </div>
        </Dialog>
        {dataDocs.map((e, i) => {
          return (
            <CustomDocumentsList
              title={e.fk_tram_documento?.td_titulo}
              key={i}
              description={e.fk_tram_documento?.td_descripcion}
              content={
                <div className="flex items-center">
                  <CustomToggleButtons
                    selectedRight={e.sol_revision_documental?.srd_estado === 3}
                    selectedLeft={e.sol_revision_documental?.srd_estado === 1}
                    close={incorretDocument(e, 1)}
                    open={corretDocument(e, 3)}
                  />
                </div>
              }
              documents={e.fk_tram_documento?.sol_anexos?.map((doc) => {
                return (
                  <IconButton
                    target="_blank"
                    href={`${API.url_bucket}/${doc.sa_id_creador}/${doc.sa_id_solicitud}/solicitud/${doc.sa_archivo}`}
                    style={{ background: '#F9FCFF', borderBottom: 'none', marginLeft: 10 }}
                    key={doc.sa_id}
                  >
                    <DocumentIcon fill="#023E73" height="40" width="40" />
                  </IconButton>
                );
              })}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FirstStep;
