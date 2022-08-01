import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import { compareAsc, format } from 'date-fns'

import {
  Table, TableBody, TableCell, TablePagination, TableRow, Typography, Popper, Grow, Paper,
  ClickAwayListener, MenuList, MenuItem, IconButton, Dialog, DialogTitle, DialogActions,
  Button, LinearProgress
} from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { makeStyles } from '@mui/styles';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { getAll, deleteData, setPage, setRowsPerPage, setLoading } from '../store/tramitesSlice';

import SolicitudesTableHead from './SolicitudesTableHead';
import { PadlockIcon } from '@components/FuseSvgIcon';

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
    fontSize: 14,
    border: '1px solid #e1e3e9'
  },
  textMenu: {
    fontSize: 14,
    color: '#023E73',
    marginLeft: 8,
    marginTop: 5
  },
  eye: {
    '& .MuiSvgIcon-root': {
      marginBottom: 10
    }
  },
  barProgress: {
    height: 12,
    borderRadius: 8,
    '& .muiltr-cr68cb-MuiLinearProgress-bar1': {
      background: '#4FDFC8'
    }
  },
  stateInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderRadius: 16,
    fontSize: 14,
    fontWeight: 600,
    width:'fit-content',
    paddingRight:20,
    paddingLeft:20,
  }
}));

function CustomTable(props) {

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const dataRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.dataTramites);
  const pageRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.page);
  const rowsPerPageRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.rowsPerPage);
  const totalRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.totalRows);
  const loadingRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.loading);
  // --------------------------------------------------------------
  const [data, setData] = useState(dataRedux);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'ss_id',
  });
  // --------------------------------------------------------------
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

  const handleClose = type => async(event) => {
    if (type === 'inactive') {
      setOpen(false);
      setOpenDialog(true);

    } else if (type === 'timeline') {
      history.push(`/mis-solicitudes/linea-tiempo/${placement.newPlacement}`)
      setOpen(false);

    } else if (type === 'look') {
      history.push(`/tramites-ambientales/${placement.newPlacement}/${placement.sol_id}`)

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

  const handleClick = (newPlacement, sol_id) => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement({newPlacement, sol_id});
  };

  return (
    <div className="w-full flex flex-col bg-white p-24" style={{ borderRadius: 0 }}>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea eliminar este tramite?"}</DialogTitle>
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
                  <MenuItem onClick={handleClose('look')}>
                    <RemoveRedEyeOutlinedIcon style={{ color: '#023E73' }} />
                    <span className={classes.textMenu} >Ver Solicitud</span>
                  </MenuItem>
                  <MenuItem onClick={handleClose('inactive')}>
                    <PadlockIcon
                      fill='#023E73'
                      height='20'
                      width='20'
                    />
                    <span className={classes.textMenu}>Inactivar</span>
                  </MenuItem>
                  <MenuItem onClick={handleClose('timeline')}>
                    <AccessTimeIcon style={{ color: '#023E73' }} />
                    <span className={classes.textMenu}>Linea de tiempo</span>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <TablePagination
        labelRowsPerPage='mostrar registros'
        style={{ borderRadius: 0 }}
        className="flex-shrink-0 bg-white"
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

      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <SolicitudesTableHead
            order={order}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {data.map((n) => {
              return (
                <TableRow
                  className="h-72 cursor-pointer"
                  tabIndex={-1}
                  key={n.ss_id}
                >
                  <TableCell className="w-40 md:w-64 text-center" padding="none">
                    <IconButton
                      aria-owns={'selectedProductsMenu'}
                      aria-haspopup="true"
                      onClick={handleClick(n.ss_id_tramite, n.ss_id)}
                      size="large"
                    >
                      <MoreHorizRoundedIcon style={{ color: '#145C9C' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align='center'>
                    {n.ss_id}
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align='left'>
                    {`${format(new Date(n.ss_fecha_creacion), 'yyyy-MM-dd')}`} {`${format(new Date(n.ss_fecha_creacion), '(hh:mm a)')}`}
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align='left'>
                    {n.fk_cliente.cc_nombre}
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align='left'>
                    {n.fk_tra_tramite.fk_tram_subcategoria.fk_tram_categoria.tc_nombre}
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align='left'>
                    {n.fk_tra_tramite.tt_nombre}
                  </TableCell>
                  <TableCell className="px-16 py-4 flex justify-center items-center" style={{height:'inherit'}} component="th" scope="row" align='left'>
                    <div className={clsx('bg-lightBlue text-blue-500 text-20', classes.stateInfo)}>
                      {n.fk_sol_estado.ses_estado}
                    </div>
                    {/* {n.state == 'BORRADOR' ?
                      <div className={clsx('bg-lightBlue text-blue-500', classes.stateInfo)}>
                        Borrador
                      </div>
                      : n.state == 'Pendiente' ?
                        <div className={clsx('bg-yellow-50 text-yellow-600', classes.stateInfo)}>
                          Pendiente
                        </div>
                        : n.state == 'Aprobada' ?
                          <div className={clsx('bg-green-50 text-green-700', classes.stateInfo)}>
                            Aprobada
                          </div>
                          : n.state == 'Rechazada' ?
                            <div className={clsx('bg-lightRed text-error', classes.stateInfo)}>
                              Rechazada
                            </div> : ''
                    } */}
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align='left'>
                    {`${format(new Date(n.ss_fecha_edicion), 'yyyy-MM-dd')}`} {`${format(new Date(n.ss_fecha_edicion), '(hh:mm a)')}`}
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align='left'>
                    <LinearProgress
                      variant="determinate"
                      value={n.progress}
                      className={classes.barProgress}
                      style={{ backgroundColor: "#CDFFF7" }}
                    />
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