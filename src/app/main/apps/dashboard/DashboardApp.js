import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';

import withReducer from 'app/store/withReducer';
import reducer from './store';

const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function Dashboard(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <h4>¡Bienvenido a VIGPRO!</h4>
          <h5 className="mt-10">
            En este dashboard encontrarás información estadística de las solicitudes, de alarmas y
            pendientes relacionados con la solicitud
          </h5>
        </div>
      }
      content={
        // <AnalyticsDashboardApp/>
        <div />
      }
    />
  );
}

export default withReducer('DashboardApp', reducer)(Dashboard);
