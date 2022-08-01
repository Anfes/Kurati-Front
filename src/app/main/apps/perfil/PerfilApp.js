import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, isNil } from "lodash";
import md5 from 'md5';
import { Grid, Avatar, Tab, useMediaQuery, Typography, IconButton } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import ProfileData from "./profileData/ProfileDataApp";
import ChangePassword from "./changePassword/PasswordApp";

import API from "app/services/constants/api";
import { deleteFile, uploadFile } from "app/utils/uploadFile";
import { showMessage } from "app/store/fuse/messageSlice";
import { changeProfilePhoto } from "./store/profileSlice";

const useStyles = makeStyles(() => ({
  headContain: {
    backgroundImage: "url(/assets/images/backgrounds/profile.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: 160,
  },
  inputbot: {
    display: 'none',

  },
  customTabs: {
    "& .MuiButtonBase-root.Mui-selected": {
      color: "#4FDFC8",
      backgroundColor: "#023E73",
      minHeight: 38,
      borderRadius: 25,
      marginLeft: 10,
      marginRight: 10,
      fontSize: 17
    },
    "& .MuiButtonBase-root": {
      border: "1px solid #023E73",
      color: "#023E73",
      minHeight: 38,
      borderRadius: 25,
      marginLeft: 10,
      marginRight: 10,
      fontSize: 17
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
  },
}));

export default function UserProfilePage(props) {

  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(({ auth }) => auth.user);
  // ---------------------------------------------------------------
  const smallScreen = useMediaQuery('(min-width:750px)');
  const [value, setValue] = useState("1");
  const [urlImgen, setUrlImgen] = useState("");
  // ---------------------------------------------------------------

  useEffect(() => {
    if (!isEmpty(user) && !isNil(user.usr_avatar)) {
      setUrlImgen(`${API.url_bucket}/${user.usr_id}/${user.usr_avatar}`);
    } else {
      setUrlImgen('');
    }
  }, [user]);

  // ---------------------------------------------------------------
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUploadChange = async (e) => {

    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.size > 5000000) {
      dispatch(showMessage({ message: 'El archivo es demasiado grande (máximo 5 MB)', variant: 'error' }));
      return;
    }
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async () => {

      if (!isEmpty(user) && !isNil(user.usr_avatar)) {

        const resul = await deleteFile(user.usr_id, user.usr_avatar);
        if (resul) {
          const data = {
            file,
            name_archivo: `${md5(Date.now())}.jpeg`,
            url_base64: `data:${file.type};base64,${btoa(reader.result)}`,
          }
          // ----------------------------------------------------------------------
          setUrlImgen(data.url_base64);
          // ----------------------------------------------------------------------
          const result = await uploadFile(user.usr_id, data);
          if (result) {
            const body = {
              usr_avatar: data.name_archivo,
            };
            const resul = await dispatch(changeProfilePhoto(user.usr_id, body));
            if (resul) {
              dispatch(showMessage({ message: '¡imagen actualizada con exito!', variant: 'success' }));
            }
          }
        } else {
          console.log('error al eliminar foto de aws')
        }

      } else {
        const data = {
          file,
          name_archivo: `${md5(Date.now())}.jpeg`,
          url_base64: `data:${file.type};base64,${btoa(reader.result)}`,
        }
        // ----------------------------------------------------------------------
        setUrlImgen(data.url_base64);
        // ----------------------------------------------------------------------
        const result = await uploadFile(user.usr_id, data);
        if (result) {
          const body = {
            usr_avatar: data.name_archivo,
          };
          const resul = await dispatch(changeProfilePhoto(user.usr_id, body));
          if (resul) {
            dispatch(showMessage({ message: '¡Imagen cargada con éxito.!', variant: 'success' }));
          }
        }

      }
    }

    reader.onerror = function (error) {
      console.log("error on load image", error);
    };
  }

  return (
    <div>
      <Grid container justifyContent="center" className={classes.headContain}>
        <Grid item xs={11}>
          <div className="flex flex-col pt-20">
            <div className="w-full flex justify-end">
              <Link className="text-12" style={{ color: "white" }} to="/dashboard">
                Inicio
              </Link>
              <p className="text-white text-12">&nbsp;/&nbsp;Mi perfil</p>
            </div>

            <div className={smallScreen ? "w-full flex  items-end mt-48 ml-52" : "w-full flex flex-col items-center mt-24 mb-8"}>
              <input onChange={handleUploadChange}
                accept="image/jpeg, image/png, image/jpg"
                id="foto"
                name="foto"
                className={classes.inputbot}
                style={{ display: 'none' }}
                variant="outlined"
                className="bg-red"
                type="file" />
              {smallScreen ? <div className={smallScreen ? "bg-primary rounded-full p-8 z-50 -mb-76 -mr-84 z-10" : "bg-primary rounded-full p-4"}
              >
                <label htmlFor="foto" >
                  <CameraAltOutlinedIcon className="text-secondary" />
                </label>
              </div> :
                null}
              <div className={smallScreen ? '' : "flex flex-col items-center"}>
                <Avatar
                  className={smallScreen ? "-mb-60  w-128 h-128 " : "w-80 h-80 -mb-16 items-center"}
                  src={urlImgen}
                />
              </div>
              {smallScreen ? null :
                <div
                  className={smallScreen ? "bg-primary -mb-80 rounded-full p-4" : "bg-primary rounded-full p-4 z-20"}>
                  <label htmlFor="foto" >
                    <CameraAltOutlinedIcon className="text-secondary" />
                  </label>
                </div>}

              <div className="flex flex-col ml-16 mt-12 ">
                <p className="text-white text-18 font-bold">
                  {user && user.data && user.data.name}{' '}{user && user.data && user.data.lastname}
                </p>
                <div className=" flex text-12 mt-6 text-white ml-4">
                  <p className="text-12 mt-6 text-white mr-8">
                    {user && user.data && user.usr_email}
                  </p>
                  <p className="text-12 mt-6 text-white mx-2">·</p>
                  <p className="text-12 mt-6 text-white ml-8">
                    (+57) {user && user.data && user.usr_phone.slice(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" style={{ marginTop:smallScreen?'70px': "8%" }}>
        <Grid item xs={11}>
          <div className="flex flex-col pt-20">
            <TabContext value={value}>
              <TabList onChange={handleChange} className={classes.customTabs}>
                <Tab label="Datos del perfil" value="1" />
                <Tab label="Contraseña" value="2" />
              </TabList>
              <TabPanel value="1" className="p-0">
                <ProfileData />
              </TabPanel>
              <TabPanel value="2">
                <ChangePassword />
              </TabPanel>
            </TabContext>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
