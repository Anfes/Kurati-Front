import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useHistory } from 'react-router-dom';

import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

// import reducer from '../store';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

const useStyles = makeStyles(() => ({
    headContain: {
        minHeight: 100,
        backgroundColor: '#EEF7FF',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 24
    },
    cardInfo: {
        width: 350,
        border: '1px solid #E6F0FA',
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
            boxShadow: ' 0px 2px 16px 4px rgba(2, 62, 115, 0.1)'
        }
    },
    cusToggleButton: {
        '& .MuiButtonBase-root.Mui-selected': {
            backgroundColor: '#023E73',
            color: '#4FDFC8',
            borderRadius: 25,
            textTransform: 'none'
        },
        '& .MuiButtonBase-root': {
            backgroundColor: 'transparent',
            color: '#023E73',
            width: 'fit-content',
            minWidth: 67,
            height: 38,
            textTransform: 'none',
            border: '1px solid #023E73',
            borderLeft: '1px solid #023E73 !important',
            borderRadius: '25px !important',
            margin: 10,
        },
    }
}));

function VerSolicitud() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
            <div className={classes.headContain}>
                <div className='flex'>
                    <IconButton 
                        style={{ backgroundColor: '#023E73', height: 24, width: 24 }}
                        onClick={() => { history.push('/mis-solicitudes') }}
                    >
                        <ArrowBackIosRoundedIcon style={{ color: '#4FDFC8', fontSize: 15 }} />
                    </IconButton>
                    <div className='flex ml-12 flex-col'>
                        <p className='text-primaryBlack font-semibold'>
                            ID de solicitud:
                        </p>
                        <p className='text-primary font-semibold text-18'>
                            Consesión de aguas subterráneas · Línea de tiempo
                        </p>
                    </div>

                </div>
            </div>
            <div className='w-full flex justify-center items-center mt-40'>
                detalle solicitud
            </div>
        </div>
    )
}

export default VerSolicitud;
// export default withReducer('tramitesApp', reducer)(LineaTiempoSolicitud);