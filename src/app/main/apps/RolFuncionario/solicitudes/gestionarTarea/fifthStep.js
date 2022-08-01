import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import CustomDocumentsList from '@components/CustomDocumentsList';

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

function FifthStep() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.infoContainer, 'max-h-450 overflow-auto')}>
      <div className="flex justify-between m-16">
        <p className="font-bold text-16 text-primaryDark">Checkeo de documentos :</p>
        <p className="text-center text-14 font-500">
          ¿Documento correcto y <br />
          verificado?
        </p>
      </div>
      <CustomDocumentsList
        title="Formato único nacional"
        description="Documento de identidad del solicitante principal del trámite. Foto al 150%"
      />
      <CustomDocumentsList
        title="Formato único nacional"
        description="Documento de identidad del solicitante principal del trámite. Foto al 150%"
      />
      <CustomDocumentsList
        title="Formato único nacional"
        description="Documento de identidad del solicitante principal del trámite. Foto al 150%"
      />
    </div>
  );
}

export default FifthStep;
