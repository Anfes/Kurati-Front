import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import esLocale from "date-fns/locale/es";

import { TableHead, TableCell, TableRow, TextField, InputAdornment, Select, MenuItem } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@mui/styles';

import { getRequestByUser, setPage } from '../store/tramitesSlice';

import { CalendarIcon } from '@components/FuseSvgIcon';
import CustomTextField from '@components/CustomTextField';

const rows = [
  {
    id: 'actions',
    align: 'center',
    disablePadding: true,
    label: '',
    sort: false
  },
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
    sort: true
  },
  {
    id: 'create_at',
    align: 'left',
    disablePadding: false,
    label: 'Fecha de creación',
    sort: true
  },
  {
    id: 'entity',
    align: 'left',
    disablePadding: true,
    label: 'Entidad',
    sort: true
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Tipo solicitud',
    sort: true
  },
  {
    id: 'request',
    align: 'left',
    disablePadding: false,
    label: 'Solicitud',
    sort: true
  },
  {
    id: 'state',
    align: 'left',
    disablePadding: false,
    label: 'Estado',
    sort: true
  },
  {
    id: 'update_at',
    align: 'left',
    disablePadding: false,
    label: 'Última actualización',
    sort: true
  },
  {
    id: 'progress',
    align: 'left',
    disablePadding: false,
    label: 'Progreso',
    sort: true
  },
];

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%',
    '& label': {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 12,
      top: 0,
    },
    '& input': {
      fontSize: 12,
      color: '#2e2e2e',
    },
    '& .MuiFormHelperText-root': {
      color: 'red',
      marginTop: 4,
      fontWeight: 500,
      textAlign: 'right',
    },
  },
  orderArrow: {
    backgroundColor: '#E6F0FA',
    '& .MuiTableSortLabel-icon': {
      opacity: 1,
    },
    '& span.MuiTableSortLabel-active svg': {
      color: '#000000',
    },
    '& span svg': {
      color: '#00000038',
    },
    '& .MuiInputBase-root': {
      height: 24,
      backgroundColor: 'white'
    },
    '&  table  tbody tr td .MuiFormControl-root': {
      marginTop: 4
    },
  },
  headFilters: {
    // backgroundColor: '#F5FBFF',
    '& .MuiInputBase-root': {
      height: 30,
      backgroundColor: 'white'
    },
  }
}));

function SolicitudesTableHead(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const pageRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.page);
  const rowsPerPageRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.rowsPerPage);
  // --------------------------------------------------------------
  const [formFilter, setFormFilter] = useState({
    id: '',
    create_at: new Date(),
    entity: '',
    type: '',
    request: '',
    state: '',
    update_at: new Date(),
    progress: '',
  });

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  const handledChangeFilter = (e) => (event) => {
    setFormFilter({ ...formFilter, [e]: event.target.value })
  }

  const changeNumber = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setFormFilter({ ...formFilter, [prop]: event.target.value, });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setFormFilter({ ...formFilter, [prop]: t.toString() });
      } else {
        setFormFilter({ ...formFilter, [prop]: "" });
      }
    }
  };

  const corporationOptions = [
    { value: 1, label: "Cortolima" },
  ];

  const typeOptions = [
    { value: 1, label: "Ambientales" },
    { value: 2, label: "Jurídicos" },
    { value: 3, label: "Tributarios" },
    { value: 4, label: "Programas sociales " },
  ];

  const stateOption = [
    { value: 1, label: "Borrador" },
    { value: 2, label: "Pendiente" },
    { value: 3, label: "Aprobada" },
    { value: 4, label: "Rechazada" },
  ];

  const handledEnter = async (event) => {
    if (event.key === 'Enter') {
      // await dispatch(setPage(0))
      // await dispatch(getAll(0, rowsPerPageRedux, props.order.id, props.order.direction, { cty_id: formFilter.id, cty_state: formFilter.state, cty_name: formFilter.city, cty_code: formFilter.code }));
    }
  }

  useEffect(() => {
    dispatch(getRequestByUser(user.usr_id, pageRedux, rowsPerPageRedux, props.order.id, props.order.direction, { }));
  }, [dispatch, rowsPerPageRedux, pageRedux, props.order.id, props.order.direction]);
  // --------------------------------------------------------------

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              key={row.id}
              align='left'
              className={clsx('px-16 py-4', classes.orderArrow)}
            >
              <p className='text-primary font-bold text-16'>
                {row.label}
              </p>
            </TableCell>
          );
        }, this)}
      </TableRow>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              key={row.id}
              align='left'
              style={{
                background: '#F5FBFF',
                maxWidth: row.id == 'id' ? 60 : row.id == 'create_at' ? 140 : row.id == 'entity' ? 100 : row.id == 'type' ? 100 :
                  row.id == 'request' ? 250 : row.id == 'state' ? 75 : row.id == 'update_at' ? 140 : 60,

                width: row.id == 'id' ? 60 : row.id == 'create_at' ? 140 : row.id == 'entity' ? 100 : row.id == 'type' ? 100 :
                  row.id == 'request' ? 250 : row.id == 'state' ? 75 : row.id == 'update_at' ? 140 : 60,
              }}
              className={clsx('px-16 py-4', classes.headFilters)}
            >
              {row.id == 'id' ?
                <TextField
                  className={classes.textField}
                  style={{ maxWidth: 48 }}
                  value={formFilter.id}
                  id="id"
                  name="id"
                  onChange={changeNumber('id')}
                  onKeyPress={handledEnter}
                />
                : null
              }
              {row.id == 'create_at' ?
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                  <MobileDatePicker
                    showToolbar={false}
                    className={classes.textField}
                    onKeyPress={handledEnter}
                    value={formFilter.create_at}
                    maxDate={new Date()}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        style={{ maxWidth: 160 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <CalendarIcon fill='#D1E3F5' width='18' height='18' />
                            </InputAdornment>
                          ),
                        }}
                      />
                    }
                  />
                </LocalizationProvider>
                : ''}
              {row.id == 'entity' ?
                <Select
                  value={formFilter.entity}
                  style={{ minWidth: 96 }}
                  className={classes.textField}
                  value={formFilter.entity}
                  onChange={handledChangeFilter('entity')}
                  onKeyPress={handledEnter}
                >
                  {corporationOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                : ''}
              {row.id == 'type' ?
                <Select
                  value={formFilter.type}
                  style={{ minWidth: 96 }}
                  className={classes.textField}
                  value={formFilter.type}
                  onChange={handledChangeFilter('type')}
                  onKeyPress={handledEnter}
                >
                  {typeOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                : ''}
              {row.id == 'request' ?
                <TextField
                  className={classes.textField}
                  style={{ maxWidth: 270 }}
                  value={formFilter.request}
                  id="request"
                  name="request"
                  onChange={handledChangeFilter('request')}
                  onKeyPress={handledEnter}
                />
                : ''}
              {row.id == 'state' ?
                <Select
                  value={formFilter.state}
                  style={{ minWidth: 96 }}
                  className={classes.textField}
                  value={formFilter.state}
                  onChange={handledChangeFilter('state')}
                  onKeyPress={handledEnter}
                >
                  {stateOption.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                : ''}
              {row.id == 'update_at' ?
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                  <MobileDatePicker
                    showToolbar={false}
                    DialogProps={{ className: classes.customDialog }}
                    maxDate={new Date()}
                    className={classes.textField}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        style={{ maxWidth: 160 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <CalendarIcon
                                fill='#D1E3F5'
                                width='18'
                                height='18'
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    }
                  />
                </LocalizationProvider>
                : ''}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead >
  );
}

export default SolicitudesTableHead;
