import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import clsx from 'clsx';

import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { makeStyles } from '@mui/styles';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { format, differenceInDays } from 'date-fns';
import { deleteData, setPage, setRowsPerPage, setLoading } from '../store/tramitesSlice';

import SolicitudesTableHead from './SolicitudesTableHead';
import { getListSolicitud } from '../store/SolicitudesSlice';

const useStyles = makeStyles((theme) => ({
  tableColor: {
    '& tr:nth-child(odd)': {
      backgroundColor: ' #f9f9f9',
    },
    '& tr:nth-child(even)': {
      backgroundColor: '#ffffff',
    },
  },
  customTd: {
    padding: 0,
    fontSize: 14,
    border: '1px solid #e1e3e9',
  },
  textMenu: {
    fontSize: 14,
    color: '#023E73',
    marginLeft: 8,
    marginTop: 5,
  },
  eye: {
    '& .MuiSvgIcon-root': {
      marginBottom: 10,
    },
  },
  barProgress: {
    height: 12,
    borderRadius: 8,
    '& .muiltr-cr68cb-MuiLinearProgress-bar1': {
      background: '#4FDFC8',
    },
  },
  stateInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderRadius: 16,
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center',
  },
}));

const data = [
  {
    id: 1,
    task: 0,
    dtt: '43 días',
    create_at: new Date(),
    settled: '6489489',
    request: 'Licencia Ambiental',
    currentStage: 'Solicitud',
    actualState: 'Borrador',
    tttt: '58 días',
  },
  {
    id: 2,
    task: 0,
    dtt: '23 días',
    create_at: new Date(),
    settled: '6489489',
    request: 'Exploración de Aguas subterráneas',
    currentStage: 'Solicitud',
    actualState: 'Pago',
    tttt: '44 días',
  },
  {
    id: 3,
    task: 1,
    dtt: '53 días',
    create_at: new Date(),
    settled: '6489489',
    request: 'Consesión de aguas subterráneas',
    currentStage: 'En Proceso',
    actualState: 'Rechazado',
    tttt: '80 días',
  },
  {
    id: 4,
    task: 2,
    dtt: '33 días',
    create_at: new Date(),
    settled: '6489489',
    request: 'Permiso de ocupación de cauces',
    currentStage: 'En Proceso',
    actualState: 'Avisos y publicaciones Pendiente',
    tttt: '45 días',
  },
];

function CustomTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const user = useSelector(({ auth }) => auth.user);
  const itemSolicitud = useSelector(({ tramitesApp }) => tramitesApp.solicitud.listSolicitud);

  const pageRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.page);
  const rowsPerPageRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.rowsPerPage);
  const totalRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.totalRows);
  const loadingRedux = useSelector(({ tramitesApp }) => tramitesApp.tramites.loading);
  // --------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  // --------------------------------------------------------------

  useEffect(() => {
    async function fetch() {
      // await dispatch(getListSolicitud(87));
      await dispatch(getListSolicitud(user?.usr_id));
    }
    fetch();
  }, [dispatch, user?.usr_id]);

  function handleChangePage(event, value) {
    dispatch(setPage(value));
  }
  function handleChangeRowsPerPage(event) {
    dispatch(setRowsPerPage(event.target.value));
  }

  const handleClose = (type) => (event) => {
    if (type === 'inactive') {
      setOpen(false);
      setOpenDialog(true);
    } else if (type === 'timeline') {
      history.push(`/solicitudes/expediente/${placement}`);
      setOpen(false);
    } else if (type === 'look') {
      history.push(`/solicitudes/gestionar-tarea/${placement}`);
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const handleCloseDialog = (type) => async (event) => {
    if (type === 'y') {
      await dispatch(deleteData(placement));
      await dispatch(setLoading());
      setOpenDialog(false);
    } else {
      setOpenDialog(false);
    }
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <div className="w-full flex flex-col bg-white p-24" style={{ borderRadius: 0 }}>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Está seguro que desea eliminar este tramite?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog('n')} color="primary">
            No, no deseo eliminarla
          </Button>
          <Button onClick={handleCloseDialog('y')} color="secondary" autoFocus>
            Sí, estoy seguro
          </Button>
        </DialogActions>
      </Dialog>
      <TablePagination
        labelRowsPerPage="mostrar registros"
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
          <SolicitudesTableHead />
          <TableBody>
            {itemSolicitud.map((n) => {
              return (
                <TableRow className="h-72 cursor-pointer" tabIndex={-1} key={n.ss_id}>
                  <Popper open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps, placement2 }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement2 === 'bottom' ? 'center top' : 'center bottom',
                        }}
                      >
                        <Paper id="menu-list-grow">
                          <ClickAwayListener onClickAway={handleClose('')}>
                            <MenuList>
                              <MenuItem
                                onClick={handleClose('look')}
                                disabled={n.ss_id_responsable_actual === !user?.usr_id}
                              >
                                <RemoveRedEyeOutlinedIcon style={{ color: '#023E73' }} />
                                <span className={classes.textMenu}>Gestionar tarea</span>
                              </MenuItem>
                              <MenuItem onClick={handleClose('timeline')}>
                                <AccessTimeIcon style={{ color: '#023E73' }} />
                                <span className={classes.textMenu}>Expediente</span>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>

                  <TableCell className="text-center" padding="none">
                    <IconButton
                      aria-owns="selectedProductsMenu"
                      aria-haspopup="true"
                      onClick={handleClick(n.ss_id)}
                      size="large"
                    >
                      <MoreHorizRoundedIcon style={{ color: '#145C9C' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align="center">
                    {n.ss_id}
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align="center">
                    <div className="flex justify-center">
                      {n.ss_id_responsable_actual === user?.usr_id ? (
                        <div className="bg-red w-28 h-28 rounded-28" />
                      ) : (
                        <div className="bg-green w-28 h-28 rounded-28" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align="center">
                    {differenceInDays(new Date(), new Date(n.ss_fecha_edicion))} días
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align="left">
                    {`${format(new Date(n.ss_fecha_creacion), 'yyyy-MM-dd')}`}
                    <br />
                    {`${format(new Date(n.ss_fecha_creacion), '(hh:mm a)')}`}
                  </TableCell>
                  <TableCell
                    className="px-16 py-4 w-28"
                    component="th"
                    scope="row"
                    align="left"
                    style={{ width: 50, maxWidth: 50 }}
                  >
                    {n.ss_radicado}
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align="left">
                    <p
                      style={{
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        overflow: 'hidden',
                      }}
                    >
                      {n.fk_tra_tramite?.tt_nombre}
                    </p>
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align="left">
                    {n.fk_sol_etapa?.se_etapa === 'SOLICITUD' ? (
                      <div
                        className={clsx('text-primary', classes.stateInfo)}
                        style={{ backgroundColor: '#E6F0FA' }}
                      >
                        {n.fk_sol_etapa?.se_etapa}
                      </div>
                    ) : (
                      <div
                        className={clsx('text-primary', classes.stateInfo)}
                        style={{ background: '#FFF6D6' }}
                      >
                        {n.fk_sol_etapa?.se_etapa}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align="left">
                    <div className={clsx('bg-lightBlue text-blue-500', classes.stateInfo)}>
                      <p
                        style={{
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          display: '-webkit-box',
                          overflow: 'hidden',
                        }}
                      >
                        {n.fk_sol_estado?.ses_estado}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align="center">
                    {differenceInDays(new Date(), new Date(n.ss_fecha_creacion))} días
                  </TableCell>
                  <TableCell className="px-16 py-4" component="th" scope="row" align="center">
                    {differenceInDays(new Date(), new Date(n.ss_fecha_creacion))} días
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {data.length === 0 && !loadingRedux && (
          <Typography component="" variant="h6" className="text-center w-full">
            No se encontraron registros
          </Typography>
        )}
      </FuseScrollbars>

      <TablePagination
        labelRowsPerPage="mostrar registros"
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
