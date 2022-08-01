import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import _ from '@lodash';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { TextField, Tabs, Tab, Typography, Button } from '@mui/material';

import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useForm } from '@fuse/hooks';

import { showMessage } from 'app/store/fuse/messageSlice';
import withReducer from 'app/store/withReducer';
import { getById, saveData, updateData, newData, setLoading } from '../store/citySlice';

import reducer from '../store';
import CiudadHeader from './CiudadHeader';

const useStyles = makeStyles(theme => ({

  root: {

  },
  inputText: {

  }

}));
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
}));

function Ciudad(props) {

  const dispatch = useDispatch();
  const dataRedux = useSelector(({ cityApp }) => cityApp.city);
  const routeParams = useParams();
  const history = useHistory();
  const classes = useStyles();
  // -------------------------------------------------------
  const [stateGlobal, setStateGlobal] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { form, handleChange, setForm } = useForm(null);
  const [noProduct, setNoProduct] = useState(false);
  // -------------------------------------------------------
  useDeepCompareEffect(() => {

    async function fetch() {
      const { cityId } = routeParams;
      if (cityId === 'new') {
        await dispatch(newData());
      } else {
        const resul = await dispatch(getById(cityId));
        if (!resul) {
          setNoProduct(true);
        }
      }
    }

    fetch();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (
      (dataRedux.dataCity && !form) ||
      (dataRedux.dataCity && form && dataRedux.dataCity.id !== form.id)
    ) {
      setForm(dataRedux.dataCity);
    }

  }, [form, dataRedux.dataCity, setForm]);

  useEffect(() => {
    async function reload() {
      if (dataRedux.loading) {
        await dispatch(newData());
        await dispatch(setLoading());
        history.push('/ciudades');
      }
    }
    reload()
  }, [dataRedux.loading])

  useEffect(() => {
    return () => {
      setNoProduct(false);
    };
  }, [dispatch]);
  // -------------------------------------------------------

  function validateString(value) {
    if (value.target.value.split("")[0] === " ") {
    } else {
      handleChange(value)
    }
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such product!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/ciudades"
          color="inherit"
        >
          Go to Products Page
        </Button>
      </motion.div>
    );
  }

  const handleActionProduct = async () => {

    if (dataRedux.dataCity.typeAction === 'edit') {
      if (form.name === '' || form.state === '' || form.code === '') {
        setStateGlobal(true)
        dispatch(showMessage({ message: 'Campos obligatorios', variant: 'error' }));
      } else {
        await dispatch(updateData(form, form.id));
        await dispatch(setLoading())
      }
    } else {
      if (form.name === '' || form.state === '' || form.code === '') {
        setStateGlobal(true)
        await dispatch(showMessage({ message: 'Campos obligatorios', variant: 'error' }));
      } else {
        await dispatch(saveData(form));
        await dispatch(setLoading())
      }
    }
  }

  return (
    <Root
      header={<CiudadHeader dataAction={dataRedux.dataCity} handleAction={handleActionProduct} />}
      contentToolbar={
        <Tabs
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: 'w-full h-64' }}
        >
          <Tab className="h-64" label="Información" />
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl">
            <TextField
              value={form.name}
              className={clsx(classes.inputText, "mt-8 mb-16")}
              required
              onChange={validateString}
              autoComplete='off'
              type="text"
              label="Nombre de la ciudad"
              autoFocus
              id="name"
              name="name"
              variant="outlined"
              fullWidth
              error={stateGlobal ? form.name === '' : null}
              helperText="required"
            // helperText={errors?.name?.message}
            // error={!!errors.name}
            />
            <TextField
              value={form.state}
              className={clsx(classes.inputText, "mt-8 mb-16")}
              required
              onChange={validateString}
              autoComplete='off'
              type="text"
              label="Departamento"
              autoFocus
              id="state"
              name="state"
              variant="outlined"
              fullWidth
              error={stateGlobal ? form.state === '' : null}
              helperText="required"
            // helperText={errors?.name?.message}
            // error={!!errors.name}
            />
            <TextField
              value={form.code}
              className={clsx(classes.inputText, "mt-8 mb-16")}
              required
              onChange={validateString}
              autoComplete='off'
              type="text"
              label="Codigo"
              autoFocus
              id="code"
              name="code"
              variant="outlined"
              fullWidth
              error={stateGlobal ? form.code === '' : null}
              helperText="required"
            // helperText={errors?.name?.message}
            // error={!!errors.name}
            />
          </div>
        )
      }
      innerScrolls
    />
  );
}

export default withReducer('cityApp', reducer)(Ciudad);
