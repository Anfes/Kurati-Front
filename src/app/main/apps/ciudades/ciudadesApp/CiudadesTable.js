import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import _ from '@lodash';

import {
  Icon, Table, TableBody, TableCell, TablePagination, TableRow, Typography, Popper, Grow,
  Paper, ClickAwayListener, MenuList, MenuItem, IconButton, Dialog, DialogTitle, DialogActions, Button, Pagination
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import FuseScrollbars from '@fuse/core/FuseScrollbars';
// import FuseLoading from '@fuse/core/FuseLoading';

import { getAll, deleteData, setPage, setRowsPerPage, setLoading } from '../store/citiesSlice';
import CiudadesTableHead from './CiudadesTableHead';

const useStyles = makeStyles(theme => ({
  tableColor: {
    '& tr:nth-child(odd)': {
      backgroundColor: ' #f9f9f9',
    },
    '& tr:nth-child(even)': {
      backgroundColor: "#ffffff"
    },
  },
  customTd: {
    padding: 0,
    fontSize: '12px',
    border: '1px solid #e1e3e9'
  },
  MuiIconButtonRoot: {
    padding: 4,
  },
  font8m: {
    fontSize: '12px',
  },
  customPagination: {
    '& .MuiButtonBase-root.Mui-selected': {
      backgroundColor: '#023E73',
      color: '#4FDFC8',
    },
    '& .MuiButtonBase-root': {
      backgroundColor: '#EEF7FF',
      color: '#145C9C',
    },
  }
}));

function CustomTable(props) {

  const dispatch = useDispatch();
  const classes = useStyles();
  const dataRedux = useSelector(({ citiesApp }) => citiesApp.cities.dataCities);
  const pageRedux = useSelector(({ citiesApp }) => citiesApp.cities.page);
  const rowsPerPageRedux = useSelector(({ citiesApp }) => citiesApp.cities.rowsPerPage);
  const totalRedux = useSelector(({ citiesApp }) => citiesApp.cities.totalRows);
  const loadingRedux = useSelector(({ citiesApp }) => citiesApp.cities.loading);
  // -------------------------------------------------------------
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(dataRedux);
  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'cty_id',
  });
  // --------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  // --------------------------------------------------------------
  useEffect(() => {
    async function fetch() {
      await dispatch(getAll(pageRedux, rowsPerPageRedux, order.id, order.direction, {}))
    }
    fetch()
  }, [dispatch, pageRedux, rowsPerPageRedux, order.id, order.direction]);

  useEffect(async () => {
    if (loadingRedux) {
      await dispatch(getAll(pageRedux, rowsPerPageRedux, order.id, order.direction, {}))
      await dispatch(setLoading());
    }
  }, [dispatch, loadingRedux]);

  useEffect(() => {
    if (dataRedux.length > 0) {
      setData(dataRedux);
    } else {
      setData([]);
    }
  }, [dataRedux]);

  // --------------------------------------------------------------
  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({ direction, id });
  }

  function handleChangePage(event, value) {
    dispatch(setPage(value))
  }
  function handleChangeRowsPerPage(event) {
    dispatch(setRowsPerPage(event.target.value));
  }

  const handleClose = type => (event) => {
    if (type === 'edit') {
      props.history.push('/ciudad/' + placement + '/edit');
      setOpen(false);
    } else if (type === 'delete') {
      setOpenDialog(true);
      setOpen(false);
    } else {
      setOpen(false);
    }
  }

  const handleCloseDialog = type => async (event) => {
    if (type === 'y') {
      await dispatch(deleteData(placement));
      await dispatch(setLoading());
      setOpenDialog(false);
    } else {
      setOpenDialog(false);
    }
  };

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  // --------------------------------------------------------------
  // if (data.length === 0) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="textSecondary" variant="h5">
  //         There are no products!
  //       </Typography>
  //     </motion.div>
  //   );
  // }
  // --------------------------------------------------------------

  return (
    <div className="w-full flex flex-col">

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea eliminar esta ciudad?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog('n')} color="primary">
            No, no deseo eliminarla
          </Button>
          <Button onClick={handleCloseDialog('y')} color="secondary" autoFocus>
            Sí, estoy seguro
          </Button>
        </DialogActions>
      </Dialog>

      <Popper open={open} anchorEl={anchorEl} transition >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose('')}>
                <MenuList>
                  <MenuItem onClick={handleClose('edit')}>
                    <Icon className="text-blue text-20">edit</Icon>&nbsp;
                    <span className={classes.font8m} >Editar</span>
                  </MenuItem>
                  <MenuItem onClick={handleClose('delete')}>
                    <Icon className="text-red text-20">remove_circle</Icon> &nbsp;
                    <span className={classes.font8m} >Eliminar</span>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Pagination
        count={totalRedux}
        rowsPerPage={rowsPerPageRedux}
        page={pageRedux}
        onChange={handleChangePage}
        showFirstButton
        showLastButton
        className={classes.customPagination}

      />

      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CiudadesTableHead
            order={order}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'categories': {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <div>
                        <IconButton
                          style={useStyles.MuiIconButtonRoot}
                          aria-owns={'selectedProductsMenu'}
                          aria-haspopup="true"
                          onClick={handleClick(n.cty_id)}
                          size="large"
                        >
                          <Icon>more_horiz</Icon>
                        </IconButton>
                      </div>
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row"></TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.cty_id}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.cty_state}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.cty_name}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.cty_code}
                    </TableCell>
                  </TableRow>
                );
              })}

          </TableBody>
        </Table>
        {data.length === 0 && !loadingRedux && (
          <Typography component="" variant="h6" className="text-center w-full">No se encontraron registros</Typography>
        )}
      </FuseScrollbars>

      <TablePagination
        labelRowsPerPage='mostrar registros'
        className="flex-shrink-0 border-t-1"
        component="div"
        count={totalRedux}
        rowsPerPage={rowsPerPageRedux}
        page={pageRedux}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(CustomTable);
