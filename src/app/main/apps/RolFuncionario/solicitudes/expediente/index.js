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

function LineaTiempoSolicitud() {
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
                <Timeline position="alternate">
                    <TimelineItem>
                        <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right">
                            <p className='text-primaryBlack text-16 font-semibold'> 12 de Octubre 2021 </p>
                            <p className='text-primaryBlack text-14'> 12 de Octubre 2021 </p>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot style={{ background: '#EEF7FF', boxShadow: 'none' }}>
                                <HelpOutlineRoundedIcon style={{ color: '#B2DBFF' }} />
                            </TimelineDot>
                            <TimelineConnector style={{ background: '#BDD7EF' }} />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <p className='text-primary font-semibold text-16'>
                                Solicitud Radicada en Ventanilla Única
                            </p>
                            <p className='text-14'> Carlos Muños </p>
                            <p className='text-14'>  Rol: Usuario </p>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <p className='text-primaryBlack text-16 font-semibold'> 12 de Octubre 2021 </p>
                            <p className='text-primaryBlack text-14'> 12 de Octubre 2021 </p>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector style={{ background: '#BDD7EF' }} />
                            <TimelineDot style={{ background: '#023E73' }}>
                                <HelpOutlineRoundedIcon style={{ color: '#4FDFC8' }} />
                            </TimelineDot>
                            <TimelineConnector style={{ background: '#BDD7EF' }} />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <p className='text-primary font-semibold text-16'>
                                Solicitud Radicada en Ventanilla Única
                            </p>
                            <p className='text-14'> Carlos Muños </p>
                            <p className='text-14'>  Rol: Usuario </p>
                        </TimelineContent>
                    </TimelineItem>

                </Timeline>
            </div>
        </div>
    )
}

export default LineaTiempoSolicitud;
// export default withReducer('tramitesApp', reducer)(LineaTiempoSolicitud);