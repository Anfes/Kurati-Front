import { Dialog, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  paper: {
    '& .MuiPaper-root': {
      maxWidth: '50%',
    },
  },
}));

const CustomDialog = (props) => {
  const { open, title, contentText, close, img, showClose, background } = props;
  const classes = useStyles();
  return (
    <Dialog open={open} style={{ background: background ? 'white' : '' }} className={classes.paper}>
      <div className="flex flex-col items-center lg:min-w-512 min-h-360 p-14">
        {showClose ? (
          <div className="w-full flex justify-end">
            <IconButton onClick={close}>
              <CloseRoundedIcon style={{ color: '#023E73' }} />
            </IconButton>
          </div>
        ) : (
          ''
        )}
        <div className="font-bold text-16 mt-10">{title}</div>
        <img src={img} alt="img dialog vigpro" />
        <div className=" text-14 m-16 text-justify">{contentText}</div>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
