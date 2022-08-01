import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from 'react-router-dom';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { useMediaQuery, InputAdornment, IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useDeepCompareEffect } from '@fuse/hooks';
import { useForm } from '@fuse/hooks';

import { showMessage } from "app/store/fuse/messageSlice";
import withReducer from 'app/store/withReducer';
import { updateChangePassword, newData, setLoading } from "../store/changePasswordSlice";
import reducer from '../store';

import CustomButton from "@components/CustomButton";
import CustomTextField from "@components/CustomTextField";

const useStyles = makeStyles(theme => ({

  root: {

  },
  inputText: {

  }

}));

function ChangePassword() {

  const dispatch = useDispatch();
  const dataRedux = useSelector(({ changeApp }) => changeApp.changePassword);
  const loadingRedux = useSelector(({ changeApp }) => changeApp.changePassword.loading);
  const user = useSelector(({ auth }) => auth.user);
  const routeParams = useParams();
  const history = useHistory();
  const classes = useStyles();
  // --------------------------------------------------------------------------
  const { form, handleChange, setForm } = useForm(null);
  // --------------------------------------------------------------------------
  const [stateGlobal, setStateGlobal] = useState({
    password: false,
    newPassword: false
  });
  const [validatePassword, setValidatePassword] = useState({
    messagePasswordError: "",
    messageNewPasswordError: "",
  });
  // --------------------------------------------------------------------------
  const smallScreen = useMediaQuery("(min-width:750px)");
  // --------------------------------------------------------------------------
  useDeepCompareEffect(() => {
    async function fetch() {
      dispatch(newData());
    }
    fetch();

    return () => {

    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (
      (dataRedux.data && !form) ||
      (dataRedux.data && form && dataRedux.data.id !== form.id)
      || loadingRedux
    ) {
      setForm(dataRedux.data);
      dispatch(setLoading())
    }

  }, [form, dataRedux.data, setForm, loadingRedux]);

  function validateString(value) {
    if (value.target.value.split("")[0] === " ") {
    } else {
      handleChange(value)
    }
  }

  const changeText = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = (key) => () => {
    setForm({ ...form, [key]: !form[key] });
  };

  const handlePasswordChange = (event) => {
    const regExp = /[0-9]/;
    const letters = /([a-zA-Z])/;
    const t = event.currentTarget.value.split(" ");
    let tex = "";
    t.map((r) => {
      if (r !== "") {
        tex += r;
      }
    });
    // ------------------------------------------------
    setForm({ ...form, [event.target.name]: tex });
    // ------------------------------------------------
    if (tex != "" && tex.length >= 8) {
      if (regExp.test(tex)) {
        if (letters.test(tex)) {
          if (event.target.name === 'password') {
            setValidatePassword({
              ...validatePassword,
              messagePasswordError: "",
            });
            setStateGlobal({ ...stateGlobal, password: false });
          } else {
            // newPassword
            setValidatePassword({
              ...validatePassword,
              messageNewPasswordError: "",
            });
            setStateGlobal({ ...stateGlobal, newPassword: false });
          }
        } else {
          if (event.target.name === 'password') {
            setValidatePassword({
              ...validatePassword,
              messagePasswordError:
                "La contraseña debe ser debe ser alfanumerico, hace falta almenos una letra",
            });
            setStateGlobal({ ...stateGlobal, password: true });
          } else {
            setValidatePassword({
              ...validatePassword,
              messagePasswordNewError:
                "La contraseña debe ser debe ser alfanumerico, hace falta almenos una letra",
            });
            setStateGlobal({ ...stateGlobal, newPassword: true });
          }
        }
      } else {
        if (event.target.name === 'password') {
          setValidatePassword({
            ...validatePassword,
            messagePasswordError:
              "La contraseña debe ser debe ser alfanumerico, hace falta almenos un numero",
          });
          setStateGlobal({ ...stateGlobal, password: true });
        } else {
          setValidatePassword({
            ...validatePassword,
            messageNewPasswordError:
              "La contraseña debe ser debe ser alfanumerico, hace falta almenos un numero",
          });
          setStateGlobal({ ...stateGlobal, newPassword: true });
        }
      }
    } else {
      if (event.target.name === 'password') {
        setValidatePassword({
          ...validatePassword,
          messagePasswordError: "La contraseña debe ser mayor a 8 caracteres",
        });
        setStateGlobal({ ...stateGlobal, password: true });
      } else {
        setValidatePassword({
          ...validatePassword,
          messageNewPasswordError: "La contraseña debe ser mayor a 8 caracteres",
        });
        setStateGlobal({ ...stateGlobal, newPassword: true });
      }
    }
  };

  const changePass = async () => {
    const data = {
      old_password: form.password,
      new_passward: form.newPassword,
    };
    const result = await dispatch(updateChangePassword(user.usr_id, data));
  };

  console.log('form',form)
  return (
    form && (<div>
      <p className="font-bold text-primary text-16 my-32">
        Ingresa la contraseña actual
      </p>
      <div className={smallScreen ? "max-w-320" : "w-full"}>
        <CustomTextField
          onChange={handlePasswordChange}
          name="password"
          id="password"
          value={form.password}
          label="Contraseña actual"
          type={form.showPassword ? "text" : "password"}
          error={form.password !== "" ? stateGlobal.password : null}
          helperText={
            form.password ? validatePassword.messagePasswordError : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword("showPassword")}
                  size="large"
                >
                  {form.showPassword ? (
                    <VisibilityOutlinedIcon
                      style={{
                        color:
                          form.password !== "" && stateGlobal.password
                            ? "#FF4D4D"
                            : "#BDD7EF",
                      }}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      style={{
                        color:
                          form.password !== "" && stateGlobal.password
                            ? "#FF4D4D"
                            : "#BDD7EF",
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <p className="font-bold text-primary text-16 my-32">
        Ingresa la nueva contraseña
      </p>
      <div
        className={
          smallScreen
            ? "w-full flex justify-between mt-36"
            : "w-full flex flex-col justify-between mt-16"
        }
      >
        <div
          style={
            smallScreen ? { width: "29%" } : { width: "100%", marginBottom: 16 }
          }
        >
          <CustomTextField
            onChange={handlePasswordChange}
            name="newPassword"
            id="newPassword"
            value={form.newPassword}
            label="Nueva contraseña"
            type={form.showNewPassword ? "text" : "password"}
            error={
              form.newPassword !== ""
                ? stateGlobal.newPassword
                : null
            }
            helperText={
              form.newPassword ? validatePassword.messageNewPasswordError : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword("showNewPassword")}
                    size="large"
                  >
                    {form.showNewPassword ? (
                      <VisibilityOutlinedIcon
                        style={{
                          color:
                            form.newPassword !== "" && stateGlobal.newPassword
                              ? "#FF4D4D"
                              : "#BDD7EF",
                        }}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        style={{
                          color:
                            form.newPassword !== "" && stateGlobal.newPassword
                              ? "#FF4D4D"
                              : "#BDD7EF",
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div
          style={
            smallScreen ? { width: "29%" } : { width: "100%", marginBottom: 16 }
          }
        >
          <CustomTextField
            onChange={changeText}
            name="confirmPasword"
            id="confirmPasword"
            value={form.confirmPasword}
            type={form.showConfirmPassword ? "text" : "password"}
            error={
              form.confirmPasword && form.confirmPasword !== form.newPassword
                ? true
                : form.confirmPasword
                  ? stateGlobal.newPassword
                  : null
            }
            helperText={
              form.confirmPasword && form.confirmPasword !== form.newPassword
                ? "Las contraseñas no coinciden"
                : ""
            }
            label="Confirmar contraseña"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword("showConfirmPassword")}
                    size="large"
                  >
                    {form.showConfirmPassword ? (
                      <VisibilityOutlinedIcon
                        style={{
                          color:
                            form.confirmPasword !== "" && stateGlobal.newPassword
                              ? "#FF4D4D"
                              : "#BDD7EF",
                        }}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        style={{
                          color:
                            form.confirmPasword !== "" && stateGlobal.newPassword
                              ? "#FF4D4D"
                              : "#BDD7EF",
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div style={{ width: "29%" }} />
      </div>
      <div
        className="py-12 my-16 w-full"
        style={{ borderTop: "1px solid  rgba(229, 229, 229, 0.35)" }}
      >
        <div className="flex items-center justify-end">
          <CustomButton
            label="Actualizar datos"
            className="primary"
            disabled={
              form.password === "" || form.confirmPasword === "" ||
              stateGlobal.password || stateGlobal.newPassword || (form.confirmPasword !== form.newPassword)
            }
            height="large"
            onClick={changePass}
          />
        </div>
      </div>
    </div>)
  );
}

export default withReducer('changeApp', reducer)(ChangePassword);
