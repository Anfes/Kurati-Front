import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';

import { Table, TableHead, TableBody, TableCell, TableRow, TextField, Tooltip, TableSortLabel } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { deleteData, getAll, setPage } from '../store/citiesSlice';

const rows = [
  {
    id: 'actions',
    align: 'center',
    disablePadding: true,
    label: '',
    sort: false
  },
  {
    id: 'cty_id',
    align: 'left',
    disablePadding: false,
    label: 'Id',
    sort: true
  },
  {
    id: 'cty_state',
    align: 'left',
    disablePadding: false,
    label: 'Estado',
    sort: true
  },
  {
    id: 'cty_name',
    align: 'left',
    disablePadding: true,
    label: 'Ciudades',
    sort: true
  },
  {
    id: 'cty_code',
    align: 'left',
    disablePadding: false,
    label: 'Codigo',
    sort: true
  },
];

const useStyle = ({
  input: {
    width: 60,
  },
})
const useStyles = makeStyles(theme => ({
  input: {
    width: '50px',
  },
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
    '& .MuiOutlinedInput-root': {

      '& .Mui-disabled': {
        background: '#e9ecef',
        color: 'red',
        WebkitTextFillColor: '#000',
      },
    },
  },
  orderArrow: {
    padding: '7px 6px',
    '& .MuiTableSortLabel-icon': {
      opacity: 1,
    },
    '& span.MuiTableSortLabel-active svg': {
      color: '#000000',
    },
    '& span svg': {
      color: '#00000038',
    },
    '& .MuiButtonBase-root': {
      // marginTop: 16,
    },
    '& .MuiInputBase-root': {
      height: 45,
    },
    '&  table  tbody tr td .MuiFormControl-root': {
      marginTop: 4
    },
  },

}));

function CustomTableHead(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const pageRedux = useSelector(({ citiesApp }) => citiesApp.cities.page);
  const rowsPerPageRedux = useSelector(({ citiesApp }) => citiesApp.cities.rowsPerPage);
  // --------------------------------------------------------------
  const [formFilter, setFormFilter] = useState({
    id: '',
    state: '',
    city: '',
    code: '',
  });

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  const handledChangeFilter = (e) => {
    setFormFilter({ ...formFilter, [e.target.name]: e.target.value })
  }

  const handledEnter = async (event) => {
    if (event.key === 'Enter') {
      await dispatch(setPage(0))
      await dispatch(getAll(0, rowsPerPageRedux, props.order.id, props.order.direction, { cty_id: formFilter.id, cty_state: formFilter.state, cty_name: formFilter.city, cty_code: formFilter.code }));
    }
  }
  // --------------------------------------------------------------

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell padding="none" className="w-40 md:w-64 text-center z-99"></TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
              className={classes.orderArrow}
            >
              <Table><TableBody><tr>
                <td>
                  {row.id === 'cty_id' ?
                    <TextField
                      label="ID"
                      className={classes.textField}
                      style={useStyle.input}
                      value={formFilter.id}
                      id="id"
                      name="id"
                      onChange={handledChangeFilter}
                      margin="dense"
                      variant="outlined"
                      onKeyPress={handledEnter}
                      autoComplete='off'
                    />
                    : null}
                  {row.id === 'cty_state' ?
                    <TextField
                      label="Departamentos"
                      className={classes.textField}
                      value={formFilter.state}
                      id="state"
                      name="state"
                      onChange={handledChangeFilter}
                      margin="dense"
                      variant="outlined"
                      onKeyPress={handledEnter}
                      autoComplete='off'
                    />
                    : null}
                  {row.id === 'cty_name' ?
                    <TextField
                      label="Ciudades"
                      className={classes.textField}
                      value={formFilter.city}
                      id="city"
                      name="city"
                      onChange={handledChangeFilter}
                      margin="dense"
                      variant="outlined"
                      onKeyPress={handledEnter}
                      autoComplete='off'
                    />
                    : null}
                  {row.id === 'cty_code' ?
                    <TextField
                      label="Código"
                      className={classes.textField}
                      value={formFilter.code}
                      id="code"
                      name="code"
                      onChange={handledChangeFilter}
                      margin="dense"
                      variant="outlined"
                      onKeyPress={handledEnter}
                      autoComplete='off'
                    />
                    : null}
                </td>
                <td>
                  {row.sort && (
                    <Tooltip
                      title="ordenar"
                      placement='top-start'
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={props.order.id === row.id}
                        direction={props.order.direction}
                        onClick={createSortHandler(row.id)}
                      >
                        {/* {row.label} */}
                      </TableSortLabel>
                    </Tooltip>
                  )}
                </td>
              </tr></TableBody></Table>
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead >
  );
}

export default CustomTableHead;
