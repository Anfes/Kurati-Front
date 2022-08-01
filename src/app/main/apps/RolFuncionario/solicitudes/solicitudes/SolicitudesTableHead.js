import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import esLocale from 'date-fns/locale/es';

import {
  TableHead,
  TableCell,
  TableRow,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@mui/styles';

import { CalendarIcon } from '@components/FuseSvgIcon';

const rows = [
  {
    id: 'actions',
    align: 'center',
    disablePadding: true,
    label: '',
    sort: false,
  },
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'task',
    align: 'left',
    disablePadding: false,
    label: 'Tarea',
  },
  {
    id: 'dtt',
    align: 'left',
    disablePadding: false,
    label: 'DTT',
  },
  {
    id: 'create_at',
    align: 'left',
    disablePadding: false,
    label: 'Fecha de creación',
  },
  {
    id: 'settled',
    align: 'left',
    disablePadding: false,
    label: 'Radicado',
  },
  {
    id: 'request',
    align: 'left',
    disablePadding: false,
    label: 'Solicitud de tramite',
  },
  {
    id: 'currentStage',
    align: 'left',
    disablePadding: false,
    label: 'Etapa Actual',
  },
  {
    id: 'actualState',
    align: 'left',
    disablePadding: false,
    label: 'Estado Actual',
  },
  {
    id: 'tttt',
    align: 'left',
    disablePadding: false,
    label: 'TTTT',
  },
  {
    id: 'ttat',
    align: 'left',
    disablePadding: false,
    label: 'Tiempo Tramite',
  },
];

const useStyles = makeStyles((theme) => ({
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
      backgroundColor: 'white',
    },
    '&  table  tbody tr td .MuiFormControl-root': {
      marginTop: 4,
    },
  },
  headFilters: {
    // backgroundColor: '#F5FBFF',
    '& .MuiInputBase-root': {
      height: 30,
      backgroundColor: 'white',
    },
  },
}));

function SolicitudesTableHead(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // --------------------------------------------------------------
  const [formFilter, setFormFilter] = useState({
    id: '',
    task: '',
    dtt: '',
    create_at: new Date(),
    settled: '',
    request: '',
    currentStage: '',
    actualState: '',
    tttt: '',
  });

  // const createSortHandler = (property) => (event) => {
  //   props.onRequestSort(event, property);
  // };

  const handledChangeFilter = (e) => (event) => {
    setFormFilter({ ...formFilter, [e]: event.target.value });
  };

  const changeNumber = (prop) => (event) => {
    if (event.target.value.length === 0) {
      setFormFilter({ ...formFilter, [prop]: event.target.value });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setFormFilter({ ...formFilter, [prop]: t.toString() });
      } else {
        setFormFilter({ ...formFilter, [prop]: '' });
      }
    }
  };

  const corporationOptions = [{ value: 1, label: 'Cortolima' }];

  const typeOptions = [
    { value: 1, label: 'Ambientales' },
    { value: 2, label: 'Jurídicos' },
    { value: 3, label: 'Tributarios' },
    { value: 4, label: 'Programas sociales ' },
  ];

  const stateOption = [
    { value: 1, label: 'Borrador' },
    { value: 2, label: 'Pendiente' },
    { value: 3, label: 'Aprobada' },
    { value: 4, label: 'Rechazada' },
  ];

  const handledEnter = async (event) => {
    if (event.key === 'Enter') {
      // await dispatch(setPage(0))
      // await dispatch(getAll(0, rowsPerPageRedux, props.order.id, props.order.direction, { cty_id: formFilter.id, cty_state: formFilter.state, cty_name: formFilter.city, cty_code: formFilter.code }));
    }
  };
  // --------------------------------------------------------------

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              key={row.id}
              align="left"
              className={clsx('px-16 py-2', classes.orderArrow)}
              style={{
                width: row.id === 'settled' ? 70 : 'auto',
                maxWidth: row.id === 'settled' ? 70 : 'auto',
              }}
            >
              <p className="text-primary font-bold text-14">{row.label}</p>
            </TableCell>
          );
        }, this)}
      </TableRow>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          const getStyleWidth = () => {
            switch (row.id) {
              case 'id':
                return 60;
              case 'task':
                return 80;
              case 'dtt':
                return 60;
              case 'create_at':
                return 120;
              case 'settled':
                return 100;
              case 'request':
                return 250;
              case 'currentStage':
                return 100;
              case 'actualState':
                return 150;
              case 'tttt':
                return 50;
              case 'ttat':
                return 50;
              default:
                return 60;
            }
          };
          return (
            <TableCell
              key={row.id}
              align="left"
              style={{
                background: '#F5FBFF',
                maxWidth: getStyleWidth(),
                width: getStyleWidth(),
              }}
              className={clsx('px-16 py-4', classes.headFilters)}
            >
              {row.id === 'id' ? (
                <TextField
                  className={classes.textField}
                  style={{ maxWidth: 60 }}
                  value={formFilter.id}
                  id="id"
                  name="id"
                  onChange={changeNumber('id')}
                  onKeyPress={handledEnter}
                />
              ) : null}
              {row.id === 'task' ? (
                <Select
                  value={formFilter.entity}
                  style={{ minWidth: 96 }}
                  className={classes.textField}
                  onChange={handledChangeFilter('entity')}
                  onKeyPress={handledEnter}
                >
                  {corporationOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                ''
              )}
              {row.id === 'dtt' ? (
                <TextField
                  className={classes.textField}
                  style={{ maxWidth: 90 }}
                  value={formFilter.dtt}
                  id="dtt"
                  name="dtt"
                  onChange={handledChangeFilter('dtt')}
                  onKeyPress={handledEnter}
                />
              ) : (
                ''
              )}
              {row.id === 'create_at' ? (
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                  <MobileDatePicker
                    showToolbar={false}
                    DialogProps={{ className: classes.customDialog }}
                    maxDate={new Date()}
                    className={classes.textField}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ maxWidth: 160 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarIcon fill="#D1E3F5" width="18" height="18" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              ) : (
                ''
              )}
              {row.id === 'settled' ? (
                <TextField
                  className={classes.textField}
                  style={{ maxWidth: 90 }}
                  value={formFilter.settled}
                  id="settled"
                  name="settled"
                  onChange={handledChangeFilter('settled')}
                  onKeyPress={handledEnter}
                />
              ) : (
                ''
              )}
              {row.id === 'request' ? (
                <TextField
                  className={classes.textField}
                  style={{ maxWidth: 270 }}
                  value={formFilter.request}
                  id="request"
                  name="request"
                  onChange={handledChangeFilter('request')}
                  onKeyPress={handledEnter}
                />
              ) : (
                ''
              )}
              {row.id === 'currentStage' ? (
                <Select
                  style={{ minWidth: 120 }}
                  value={formFilter.state}
                  onChange={handledChangeFilter('currentStage')}
                  onKeyPress={handledEnter}
                >
                  {stateOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                ''
              )}
              {row.id === 'actualState' ? (
                <Select
                  value={formFilter.actualState}
                  style={{ minWidth: 190 }}
                  onChange={handledChangeFilter('actualState')}
                  onKeyPress={handledEnter}
                >
                  {stateOption.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                ''
              )}
              {row.id === 'tttt' ? (
                <TextField
                  className={classes.textField}
                  style={{ maxWidth: 90 }}
                  value={formFilter.dtt}
                  id="dtt"
                  name="dtt"
                  onChange={handledChangeFilter('dtt')}
                  onKeyPress={handledEnter}
                />
              ) : (
                ''
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default SolicitudesTableHead;
