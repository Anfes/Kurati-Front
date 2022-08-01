import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';

import FusePageCarded from '@fuse/core/FusePageCarded';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import reducer from '../store';

import TablaSolicitudes from './TablaSolicitudes';

import CustomButton from '@components/CustomButton';

const Root = styled(FusePageCarded)(({ theme }) => ({
    '& .FusePageCarded-header': {
        minHeight: 72,
        height: 72,
        alignItems: 'center',
        backgroundImage: 'url(/assets/images/backgrounds/solicitudes.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        [theme.breakpoints.up('sm')]: {
            minHeight: 144,
            height: 144,
        },
    },
    '& .FusePageCarded-content': {
        display: 'flex',
    },
    '& .FusePageCarded-contentCard': {
        overflow: 'hidden',
        borderRadius: 0
    },
    '& .FusePageCarded-contentWrapper': {
        paddingLeft: 0,
        paddingRight: 0,
    },
}));

function Solicitudes() {
    return <Root
        header={
            <div className="flex flex-1 w-full items-center justify-between px-12">
                <div className="flex items-center">
                    <Typography
                        component={motion.span}
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.2 } }}
                        delay={300}
                        className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold text-primary"
                    >
                        Listado de solicitudes
                    </Typography>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                >
                    <CustomButton
                        component={Link}
                        to="/mis-solicitudes/listado-tramites"
                        className="outlinePrimary"
                        variant="contained"
                        label='Nuevo tramite'
                        height='large'
                        style={{ backgroundColor: 'transparent', marginRight: 15 }}
                    />
                </motion.div>
            </div>
        }
        content={<TablaSolicitudes />}
        innerScrolls
    />;
}

export default withReducer('tramitesApp', reducer)(Solicitudes);