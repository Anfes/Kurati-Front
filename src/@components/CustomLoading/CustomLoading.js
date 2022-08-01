import { useTimeout } from '@fuse/hooks';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paperModal: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)',
    padding: '16px 32px 16px',
  },

}));

const modalStyle = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};


function CustomLoading(props) {
  const [showLoading, setShowLoading] = useState(!props.delay);
  const classes = useStyles();

  useTimeout(() => {
    setShowLoading(true);
  }, props.delay);

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showLoading}
      >
        <div style={modalStyle} className={classes.paperModal} >
          <p id="simple-modal-description">
            Procesando datos...
          </p>
          <CircularProgress className={classes.progress} color="success" />
        </div>
      </Modal>
    </div>
  );
}

CustomLoading.propTypes = {
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

CustomLoading.defaultProps = {
  delay: false,
};

export default CustomLoading;
