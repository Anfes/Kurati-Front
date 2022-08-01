import { IconButton, Tooltip, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ExclamationIcon } from '@components/FuseSvgIcon';

const CustomUploadFile = (props) => {
  const { disabled, value, setValue, status, multiple } = props;
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, .doc, .docx, .xlsx, application/pdf',
    maxSize: 5000000,
    disabled: disabled || status === 1,
    onDropRejected: async () => {
      await dispatch(
        showMessage({
          message: `Los archivos que adjuntes no deben superar los 5MB`,
          variant: 'error',
        })
      );
    },
    onDrop: async (acceptedValue) => {
      if (multiple) {
        if (value && value.length === 0) {
          setValue(
            acceptedValue.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        } else if (value && value.length > 9) {
          await dispatch(
            showMessage({
              message: `Puedes adjuntar hasta 10 archivos por campo`,
              variant: 'error',
            })
          );
        } else {
          setValue(
            value &&
              value.concat(
                acceptedValue.map((file) =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  })
                )
              )
          );
        }
      } else {
        setValue(
          acceptedValue.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
    },
  });

  const prueba = (i) => () => {
    const newValue = [...value];
    newValue.splice(i, 1);
    setValue(newValue);
  };

  const marginTop =
    value && value.length === 0
      ? 0
      : value && value.length === 1
      ? '-75px'
      : value && value.length === 2
      ? '-111px'
      : value && value.length === 3
      ? '-150px'
      : value && value.length >= 4
      ? '-173px'
      : '-75px';
  const marginTopDev =
    value && value.length === 0
      ? 0
      : value && value.length === 1
      ? '-40px'
      : value && value.length === 2
      ? '-75px'
      : value && value.length === 3
      ? '-115px'
      : value && value.length >= 4
      ? '-140px'
      : '-75px';

  const showFile =
    value &&
    value.map((file, i) => (
      <Tooltip placement="top" title={file.path}>
        <div
          key={file.name}
          className="flex justify-between p-4 my-4 "
          style={{ backgroundColor: '#E6F0FA' }}
        >
          <div
            style={{
              whiteSpace: 'pre',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              backgrounColors: 'green',
            }}
          >
            <Typography
              className="text-12 font-bold text-ellipsis "
              style={{ color: status === 2 ? '#FF4D4D' : '#023E73' }}
            >
              {file.path}
            </Typography>
          </div>
          <div className="flex justify-center">
            <IconButton onClick={prueba(i)} className="p-0">
              <DeleteRoundedIcon style={{ color: status === 2 ? '#023E73' : '' }} />
            </IconButton>
          </div>
        </div>
      </Tooltip>
    ));

  return (
    <div className="mb-40">
      <div>
        <div id="box" {...getRootProps()}>
          <input multiple {...getInputProps()} />
          <div
            className={
              disabled
                ? 'w-full flex justify-center items-start rounded-8 border-solid border-1  p-16'
                : status === 1
                ? 'w-full flex justify-center items-start rounded-8 border-dashed border-2 p-16'
                : 'w-full flex justify-center items-start rounded-8 border-dashed cursor-pointer border-2 p-16'
            }
            style={
              disabled
                ? {
                    backgroundColor: '#E6F0FA',
                    borderColor: '#9DB8D1',
                    maxHeight: 200,
                  }
                : {
                    backgroundColor: '#F9FCFF',
                    borderColor: status === 1 ? '#3ABDA8' : status === 2 ? '#FF4D4D' : '#BDD7EF',
                    maxHeight: 200,
                  }
            }
          >
            {status === 1 ? (
              <div className="flex flex-col">
                <div className="flex self-center">
                  <CheckCircleIcon className="mr-12" style={{ color: '#3ABDA8' }} />
                  <Typography className="text-16" style={{ color: '#3ABDA8' }}>
                    (Validado)
                  </Typography>
                </div>
                <div
                  className=" items-center "
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  <div className="max-h-128 overflow-y-scroll  ">
                    <div className="flex flex-col overflow-y-scroll ">
                      <div style={{ maxHeight: 128 }}>
                        <div
                          className="flex justify-between p-4 my-4 "
                          style={{ backgroundColor: '#E6F0FA', maxWidth: 500, minWidth: 220 }}
                        >
                          <div
                            style={{
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              width: '100%',
                            }}
                          >
                            <Typography
                              className="text-12 font-bold text-ellipsis "
                              style={{ color: '#3ABDA8' }}
                            >
                              tarjetasasdsa dasdas.pdf
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*---------------------------------------------------------------------------------------------------------------------------------*/}
                </div>
              </div>
            ) : status === 2 ? (
              <div className="flex">
                <div className="flex">
                  <div className="mr-12">
                    <ExclamationIcon fill="#FF4D4D" width="16" height="16" />
                  </div>
                  <Typography className="text-16" style={{ color: '#FF4D4D' }}>
                    (Devuelto)
                  </Typography>
                </div>
                <div style={{ maxHeight: 150 }}>
                  {value.map((file, i) => (
                    <div style={{ height: 40 }} />
                  ))}
                </div>
              </div>
            ) : value && value.length === 0 ? (
              <div>
                <Typography
                  className="text-14 m-24"
                  style={disabled ? { color: '#9DB8D1' } : { color: '#7F9BB4' }}
                >
                  <span className={disabled ? '' : 'font-bold'}>Suelta el archivo</span> aquí o{' '}
                  <span className={disabled ? '' : 'font-bold'}>haz clic</span> para adjuntar
                </Typography>
              </div>
            ) : value && value.length !== 0 ? (
              <div
                className=" items-center "
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                <div style={{ maxHeight: 128 }}>
                  {value.map((file, i) => (
                    <div style={{ height: 32 }} />
                  ))}
                </div>

                <Typography className="text-14" style={{ color: '#7F9BB4' }}>
                  <span className="font-bold">haz clic</span> para adjuntar
                </Typography>
              </div>
            ) : (
              <Typography className="text-14 m-24" style={{ color: '#7F9BB4' }}>
                <span className="font-bold">Suelta el archivo</span> aquí o{' '}
                <span className="font-bold">haz clic</span> para adjuntar
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div
        className="max-h-128 overflow-y-scroll relative"
        style={{ marginTop: status === 2 ? marginTopDev : marginTop, maxWidth: '100%' }}
      >
        <div className="flex flex-col  ml-10  pr-0 ">{showFile}</div>
      </div>
    </div>
  );
};

export default CustomUploadFile;
