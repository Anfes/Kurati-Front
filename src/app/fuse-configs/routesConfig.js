import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import { authRoles } from 'app/auth';

import appsConfigs from 'app/main/apps/appsConfigs';

import Error404PageConfig from 'app/main/404/Error404PageConfig';
import CortolimaTramitesConfig from 'app/main/cortolima/CortolimaTramitesConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import RegisterConfig from 'app/main/registroCiudadanosEmpresas/RegisterConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import TramiteConfig from 'app/main/detalleTramite/TramiteConfig';
import RegistroFuncionariosConfig from 'app/main/registroFuncionarios/RegistroFuncionariosConfig';
import InicioSesionFuncionario from 'app/main/InicioSesionFuncionario/LoginFuncConfig';
import OlvidarContraseñaConfig from 'app/main/olvidarContraseña/OlvidarContraseñaConfig';
import OlvidarContraseñaFuncConfig from 'app/main/olvidarContraseñaFuncionario/OlvidarContraseñaFuncConfig';
import ConfirmarEmailCiudadanoConfig from 'app/main/confirmarEmailCiudadano/ConfirmarEmailCiudadanoConfig';
import ConfirmarEmailFuncionarioConfig from 'app/main/confirmarEmailFuncionario/ConfirmarEmailFuncionarioConfig';

import TiposTramites from 'app/main/TiposTramites/TiposTramites';

const routeConfigs = [
  ...appsConfigs,
  Error404PageConfig,
  LoginConfig,
  CortolimaTramitesConfig,
  RegisterConfig,
  LogoutConfig,
  TramiteConfig,
  RegistroFuncionariosConfig,
  InicioSesionFuncionario,
  OlvidarContraseñaConfig,
  OlvidarContraseñaFuncConfig,
  ConfirmarEmailCiudadanoConfig,
  ConfirmarEmailFuncionarioConfig
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, [
    'SUPERADMIN','USER_CIUDADANO', 'USER_EMPRESA', 
    'CLI_ADMIN', 'CLI_DIRECTOR_GENERAL', 'CLI_VENTANILLA_UNICA', 
    'CLI_PLANIFICACION_AMBIENTAL', 'CLI_LIQUIDADOR', 'CLI_FINANCIERO', 'CLI_JURIDICO',
    'CLI_COORDINADOR_JURIDICO', 'CLI_SUBDIRECTOR_JURIDICO', 'CLI_DIRECTOR_TERRITORIAL',
    'CLI_COORDINADOR_RECURSOS', 'CLI_PROFESIONAL_RECURSOS'
  ]),
    {
      path: '/',
      exact: true,
      auth: authRoles.onlyGuest,
      settings: {
        layout: {
          config: {
            navbar: {
              display: false,
            },
            toolbar: {
              display: false,
            },
            footer: {
              display: false,
            },
            leftSidePanel: {
              display: false,
            },
            rightSidePanel: {
              display: false,
            },
          },
        },
      },
      component: TiposTramites
      // component: () => <Redirect to="/dashboard" />,
    },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;

