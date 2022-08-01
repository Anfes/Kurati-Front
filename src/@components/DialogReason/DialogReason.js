import PropTypes from 'prop-types';
import { Dialog, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import CustomTextField from '@components/CustomTextField';
import CustomButton from '@components/CustomButton';

const DialogReason = (props) => {
  const { open, onClickClose, value, onChange, error, onClick, disabled } = props;

  return (
    <Dialog open={open}>
      <div className="flex flex-col items-center lg:min-w-512 min-h-200 py-14 px-20">
        <div className="flex justify-between items-center w-full m-12">
          <p className="text-red font-bold text-16">Ingresa el motivo de rechazo del documento:</p>
          <IconButton onClick={onClickClose}>
            <CloseRoundedIcon style={{ color: '#023E73' }} />
          </IconButton>
        </div>
        <div className="w-full m-12">
          <CustomTextField
            multiline
            value={value}
            onChange={onChange}
            rows={5}
            label="Motivo"
            name="motivo"
            error={error}
          />
        </div>
        <div className="my-20 w-full flex justify-end">
          <CustomButton
            label="Guardar"
            className="primary"
            height="large"
            onClick={onClick}
            disabled={disabled}
          />
        </div>
      </div>
    </Dialog>
  );
};

DialogReason.propTypes = {
  open: PropTypes.bool.isRequired,
  onClickClose: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default DialogReason;
