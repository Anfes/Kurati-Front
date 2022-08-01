import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */
import API from 'app/services/constants/api'

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            console.log('err.response.message', err.response)
            this.emit('onAutoLogout', err.response.data.message);
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      const URL = `${API.baseUrl}/${API.endpoints.authenticate}`
      axios.post(URL, {
        username: email,
        password,
      })
        .then((response) => {
          if ( response.data.auth_info ){
            this.setSession(response.data.auth_info.access_token);
            resolve(response.data.auth_info.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInFuncionario= (email, password, cliente) => {
    return new Promise((resolve, reject) => {
      const URL = `${API.baseUrl}/${API.endpoints.authenticateFunc}`
      axios.post(URL, {
        username: email,
        password,
        cliente
      })
        .then((response) => {
          if ( response.data.auth_info ){
            this.setSession(response.data.auth_info.access_token);
            resolve(response.data.auth_info.user);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const URL = `${API.baseUrl}/${API.endpoints.authenticate}/jwt`
      axios
        .get(URL, {
          data: {
            access_token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.auth_info.user) {
            this.setSession(response.data.auth_info.access_token);
            resolve(response.data.auth_info.user);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post('/api/auth/user/update', {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
