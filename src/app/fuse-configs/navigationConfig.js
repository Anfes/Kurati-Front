import { authRoles } from 'app/auth';
import userSlice from 'app/auth/store/userSlice';
import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'inicio',
    title: 'Inicio',
    translate: 'Inicio',
    type: 'item',
    icon: <img src='/assets/images/icons/inicio.png' />,
    url: '/dashboard',
    auth: [...authRoles.corporacion, ...authRoles.ciudadano]
  },
  {
    id: 'perfil-usuario',
    title: 'Perfil',
    // translate: 'Tramites',
    type: 'item',
    icon: 'person',
    url: '/perfil-usuario',
    auth: [...authRoles.corporacion, ...authRoles.ciudadano]
  },
  {
    id: 'formalities',
    title: 'Mis solicitudes',
    // translate: 'Tramites',
    type: 'item',
    icon: <img src='/assets/images/icons/solicitudes.png' />,
    url: '/mis-solicitudes',
    auth: authRoles.ciudadano
  },
  {
    id: 'formalities cop',
    title: 'Mis solicitudes',
    // translate: 'Tramites',
    type: 'item',
    icon: <img src='/assets/images/icons/solicitudes.png' />,
    url: '/solicitudes',
    auth: authRoles.corporacion
  },
];

export default navigationConfig;
