import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import CustomDocumentsList from '@components/CustomDocumentsList';
import CustomTextField from '@components/CustomTextField';
import { useState } from 'react';
import CustomUploadAnexo from '@components/CustomUploadAnexo';
import { showMessage } from 'app/store/fuse/messageSlice';
import md5 from 'md5';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  infoContainer: {
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 8,
    border: '1px solid #D1E3F5',
    padding: 10,
  },
  flexItems: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

function ThirdStep(props) {
  const { disableThirdStep, form, changeText, fileArrayList, setFileArrayList } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleUploadChange = async (eventFile, name) => {
    const countArry = fileArrayList[name];
    if (countArry && countArry.length > 0) {
      await dispatch(
        showMessage({ message: `Puedes adjuntar hasta 1 archivo en este campo`, variant: 'error' })
      );
    } else {
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

        const dataFile = {
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

        console.log('data', dataFile);
        // ----------------------------------------------------------------------
      };
      reader.onerror = function (error) {
        console.log('error on load image', error);
      };
    }
  };

  const handleUploadDeleteLiq = (eventFile, i) => async () => {
    const array = [...fileArrayList.liquidacion];
    array.splice(i, 1);
    setFileArrayList({ ...fileArrayList, liquidacion: array });
  };
  const handleUploadDeleteRec = (eventFile, i) => async () => {
    const array = [...fileArrayList.recibo];
    array.splice(i, 1);
    setFileArrayList({ ...fileArrayList, recibo: array });
  };

  return (
    <div className="flex">
      <div className="w-3/5">
        <p className="font-bold text-14 text-primaryDark mx-32">Lista de documentos :</p>
        <div className={clsx(classes.infoContainer, 'min-h-400 max-h-450 overflow-auto')}>
          <CustomDocumentsList
            title="Formato único nacional"
            description="Documento de identidad del solicitante principal del trámite. Foto al 150%"
          />
          <CustomDocumentsList
            title="Formato único nacional"
            description="Documento de identidad del solicitante principal del trámite. Foto al 150%"
          />
        </div>
      </div>
      <div className="w-2/5">
        <p className="font-bold text-16 text-primaryDark mx-32">
          Adjuntar recibo de recaudo ambiental.
        </p>
        <div className={clsx(classes.infoContainer, classes.flexItems, 'flex flex-col py-16')}>
          <div>
            <CustomUploadAnexo
              height="small"
              className="secondary"
              value={fileArrayList.liquidacion}
              handleUploadDelete={handleUploadDeleteLiq}
              handleUploadChange={(e) => handleUploadChange(e, 'liquidacion')}
              elementTitle="la liquidación"
            />
          </div>
          <div>
            <CustomUploadAnexo
              height="small"
              className="secondary"
              value={fileArrayList.recibo}
              handleUploadDelete={handleUploadDeleteRec}
              handleUploadChange={(e) => handleUploadChange(e, 'recibo')}
              elementTitle="el recibo"
            />
          </div>
          <div className="mt-10">
            <CustomTextField
              value={form.form}
              label="Observaciones (opcional)"
              multiline
              rows={6}
              onChange={changeText('liqu_observacion')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThirdStep;
