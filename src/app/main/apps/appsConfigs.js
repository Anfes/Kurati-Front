import DashboardAppConfig from './dashboard/DashboardAppConfig';
import CiudadesAppConfig from './ciudades/CiudadesAppConfig';
import PerfilAppConfig from './perfil/PerfilAppConfig';
import SolicitudesConfig from './solicitudes/SolicitudesConfig';
import SolicitudesFuncionarioConfig from './RolFuncionario/solicitudes/SolicitudesConfig';
import TramitesAmbientalesConfig from './tramitesAmbientales/TramitesAmbientalesConfig';

const appsConfigs = [
  DashboardAppConfig,
  CiudadesAppConfig,
  PerfilAppConfig,
  SolicitudesConfig,
  SolicitudesFuncionarioConfig,
  TramitesAmbientalesConfig
];

export default appsConfigs;
