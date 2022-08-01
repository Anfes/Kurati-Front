import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Dialog, LinearProgress, Slide } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    customDialog: {
        '& .muiltr-1p757hs-MuiPaper-root-MuiDialog-paper': {
            borderRadius: 0
        },
    },
    barProgress: {
        height: 12,
        '& .muiltr-cr68cb-MuiLinearProgress-bar1': {
            background: 'linear-gradient(90deg, #4FDFC8 0%, #ABFFF1 40.12%, #4FDFC8 99.18%)'
        }
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomScreenLoading(props) {
    const { openLoading } = props;
    const classes = useStyles();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = 2 * 15;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Dialog
            open={openLoading}
            TransitionComponent={Transition}
            fullScreen
            className={classes.customDialog}
        >
            <div className='bg-white flex flex-col h-screen'>
                <LinearProgress
                    variant="determinate"
                    style={{ backgroundColor: "#CDFFF7" }}
                    value={progress}
                    className={classes.barProgress}
                />
                <div className='h-full flex justify-center items-center flex-col'>
                    <img src='/assets/images/dialogs/loading.png' alt='loading' />
                    <p className='font-bold text-16 mt-10'>
                        Estamos validando tu información
                    </p>
                    <p className='mt-14 text-14'>
                        Esto solo tardará unos instantes
                    </p>
                </div>
            </div>
        </Dialog>
    )
}
