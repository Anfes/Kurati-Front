import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import CustomTextField from '@components/CustomTextField';
import CustomDocumentsList from '@components/CustomDocumentsList';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import md5 from 'md5';
import CustomUploadAnexo from '@components/CustomUploadAnexo';

const useStyles = makeStyles(() => ({
  infoContainer: {
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 8,
    border: '1px solid #D1E3F5',
    padding: 10,
  },

  daysInput: {
    '& .MuiOutlinedInput-input': {
      height: 6,
      paddingLeft: 25,
      paddingTop: 14,
      paddingBottom: 14,
      fontSize: 18,
    },
    '& .MuiOutlinedInput-root': {
      width: 76,
      '& .MuiInputBase-root-MuiOutlinedInput-root': {
        color: '#BDD7EF',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#BDD7EF',
        borderWidth: 1,
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#00274A',
        borderWidth: 1,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#145C9C',
        borderWidth: 1,
      },
    },
  },
}));

function FourthStep(props) {
  const {
    disableFourthStep,
    form,
    setForm,
    changeText,
    prorroga,
    fileArrayList,
    setFileArrayList,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [prorrogaDias, setProrrogaDias] = useState('');

  const handleUploadChange = async (eventFile, id, name) => {
    const countArry = fileArrayList;
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
        setFileArrayList(
          fileArrayList.concat(
            eventFile.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        );

        console.log('data', dataFile);
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

  const changeNumber = (event) => {
    if (event.target.value.length === 0) {
      setProrrogaDias(event.target.value);
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setProrrogaDias(t.toString());
      } else {
        setProrrogaDias('');
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-3/5">
        {/* {prorroga && (
          <div
            style={{ backgroundColor: '#FFEDED', marginLeft: 30, marginRight: 30 }}
            className="rounded-16 py-4 px-4"
          >
            <Typography style={{ color: '#FF4D4D' }} className="font-semibold">
              El usuario NO pagó después de 30 días.
            </Typography>
            <Typography style={{ color: '#FF4D4D' }} className="font-semibold">
              Fecha notificación del recibo de recaudo:{' '}
              <span className="font-normal">25 de Febrero de 2022</span>
            </Typography>
          </div>
        )} */}
        <p className="font-bold text-14 text-primaryDark mx-32">Lista de documentos :</p>
        <div className={clsx(classes.infoContainer, 'min-h-400 max-h-450 overflow-auto mt-12')}>
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
      {/* {prorroga ? (
        <div className="w-2/5">
          <div className={clsx(classes.infoContainer, 'flex flex-col min-h-400 max-h-450 py-16 ')}>
            <Typography style={{ color: '#145C9C' }} className="text-18 font-medium">
              Tiempo de prórroga (opcional):
            </Typography>
            <Typography style={{ color: '#145C9C' }} className="text-12 italic">
              (sólo se puede dar una prórroga adicional)
            </Typography>
            <div className="flex items-center my-16">
              <TextField
                style={{ minWidth: 0, width: 100 }}
                className={classes.daysInput}
                value={prorrogaDias}
                onChange={changeNumber}
                inputProps={{
                  maxLength: 3,
                }}
              />
              <Typography style={{ color: '#BDD7EF' }}>días</Typography>
            </div>
            <CustomTextField placeholder="Observaciones (opcional)" multiline rows={6} />
          </div>
        </div>
      ) : ( */}
      <div className="w-2/5">
        <p className="font-bold text-14 text-primaryDark mx-32">Adjuntar soporte de pago:</p>
        <div className={clsx(classes.infoContainer, 'flex flex-col min-h-400 max-h-450 py-16')}>
          <div className="mx-10 my-14">
            <CustomUploadAnexo
              handleUploadChange={(e) => handleUploadChange(e)}
              value={fileArrayList}
              handleUploadDelete={handleUploadDelete}
              height="small"
              className="secondary"
              elementTitle="el soporte de pago"
            />
          </div>
          <div className="mx-10 mt-12">
            <CustomTextField
              placeholder="Observaciones (opcional)"
              multiline
              rows={6}
              value={form.sp_observacion}
              onChange={changeText('sp_observacion')}
            />
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default FourthStep;
