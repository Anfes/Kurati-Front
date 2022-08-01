import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';

import { styled } from '@mui/material/styles';
import reducer from '../store';

import CiudadesHeader from './CiudadesHeader';
import CiudadesTable from './CiudadesTable';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageCarded-content': {
    display: 'flex',
  },
  '& .FusePageCarded-contentCard': {
    overflow: 'hidden',
  },
}));

function Ciudades() {
  return <Root header={<CiudadesHeader />} content={<CiudadesTable />} innerScrolls />;
}

export default withReducer('citiesApp', reducer)(Ciudades);
