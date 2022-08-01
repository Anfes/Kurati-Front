import { motion } from 'framer-motion';

import withReducer from 'app/store/withReducer';

import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

import reducer from '../store';

import TablaSolicitudes from './TablaSolicitudes';

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
    borderRadius: 0,
  },
  '& .FusePageCarded-contentWrapper': {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

function Solicitudes() {
  return (
    <Root
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
        </div>
      }
      content={<TablaSolicitudes />}
      innerScrolls
    />
  );
}

export default withReducer('tramitesApp', reducer)(Solicitudes);
