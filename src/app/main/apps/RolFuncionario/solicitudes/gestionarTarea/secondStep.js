import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import clsx from 'clsx';

import { DocumentIcon } from '@components/FuseSvgIcon';
import CustomTextField from '@components/CustomTextField';
import CustomUploadAnexo from '@components/CustomUploadAnexo';
import CustomDocumentsList from '@components/CustomDocumentsList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import md5 from 'md5';
import API from 'app/services/constants/api';
import { uploadFile } from 'app/utils/uploadFile';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  infoContainer: {
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 8,
    border: '1px solid #D1E3F5',
    padding: 10,
  },
}));

function SecundStep(props) {
  const { form, changeText, itemPasoUno, fileArrayList, setFileArrayList } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const user = useSelector(({ auth }) => auth.user);

  const [dataDocs, setDataDocs] = useState([]);
  const [loadingAnexos, setLoadingAnexos] = useState();

  useEffect(() => {
    if (itemPasoUno) {
      setDataDocs(itemPasoUno);
    } else {
      setDataDocs([]);
    }
  }, [itemPasoUno]);

  const handleUploadChange = async (eventFile) => {
    const countArry = fileArrayList;
    if (countArry && countArry.length > 4) {
      await dispatch(
        showMessage({ message: `Puedes adjuntar hasta 5 archivos en este campo`, variant: 'error' })
      );
    } else {
      setLoadingAnexos();
      const file = eventFile[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = async () => {
        // ----------------------------------------------------------------------
        setFileArrayList(
          fileArrayList.concat(
            eventFile.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        );
        // ----------------------------------------------------------------------
      };
      reader.onerror = function (error) {
        console.log('error on load image', error);
      };
    }
  };

  const handleUploadDelete = (eventFile, i) => async () => {
    const array = [...fileArrayList];
    array.splice(i, 1);
    setFileArrayList(array);
  };

  return (
    <div className="flex">
      <div className="w-3/5">
        <p className="font-bold text-14 text-primaryDark mx-32">Lista de documentos :</p>
        <div className={clsx(classes.infoContainer, 'min-h-400 max-h-450 overflow-auto')}>
          {dataDocs.map((e, i) => {
            return (
              <CustomDocumentsList
                title={e.fk_tram_documento?.td_titulo}
                key={i}
                description={e.fk_tram_documento?.td_descripcion}
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
      <div className="w-2/5">
        <p className="font-bold text-14 text-primaryDark mx-32">Conceptos de Agua y Suelo:</p>
        <div className={clsx(classes.infoContainer, 'flex flex-col  min-h-400 max-h-450 py-16')}>
          <div className="mx-10 my-14">
            <CustomTextField
              placeholder="Detalle de concepto Agua"
              multiline
              rows={3}
              value={form.conceptoAgua}
              name="conceptoAgua"
              onChange={changeText('conceptoAgua')}
            />
            <CustomTextField
              placeholder="Detalle de concepto Suelo"
              multiline
              rows={3}
              value={form.conceptoSuelo}
              name="conceptoSuelo"
              onChange={changeText('conceptoSuelo')}
              style={{ marginTop: 10 }}
            />
          </div>
          <div className="m-8">
            <p className="font-600 text-16 my-10">Documentos de soporte de los conceptos</p>
            <CustomUploadAnexo
              handleUploadChange={(e) => handleUploadChange(e)}
              value={fileArrayList}
              handleUploadDelete={handleUploadDelete}
              height="small"
              className="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecundStep;
