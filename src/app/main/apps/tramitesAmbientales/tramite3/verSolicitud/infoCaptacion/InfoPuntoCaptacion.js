import CustomCheckBox from '@components/CustomCheckBox';
import CustomTextField from '@components/CustomTextField';
import CustomToggleButtons from '@components/CustomToggleButtons';
import {
  Divider,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CustomButton from '@components/CustomButton';
import { TrashIcon } from '@components/FuseSvgIcon';
import CustomFilterSelect from '@components/CustomFilterSelect';
import CustomUploadAnexo from '@components/CustomUploadAnexo';

const InfoPuntoCaptacion = (props) => {
  const largeScreen = useMediaQuery('(min-width:1600px)');
  const {
    coordenada,
    arrayCoor,
    addCoordenada,
    deleteItem,
    disabled,
    checkedFuente,
    changeServidumbre,
    changeText,
    formInfoCap,
    changeNumberCoor,
    municipalityOptions,
    departamentOptions,
    changeFilterSelect,
    informe,
    mediumScreen,
    smallScreen,
    handleUploadChange,
    handleUploadDelete,
  } = props;

  return (
    <div className="w-full">
      <Typography className="font-bold text-14 mb-16" style={{ color: '#4C647A' }}>
        Información del punto de captación :
      </Typography>
      <div
        className="flex flex-col border-1 border-primaryBlack rounded-8 px-28 py-12 w-full "
        style={{ marginRight: 28 }}
      >
        <div className="mb-32">
          <div className={largeScreen ? 'flex  w-full mb-16' : 'flex flex-col'}>
            <Typography
              className="font-semibold text-14 mr-16 mb-16"
              style={{ color: '#145C9C', width: largeScreen ? '10%' : '100%' }}
            >
              Tipo de fuente:
            </Typography>
            <div
              className={
                mediumScreen
                  ? 'flex w-full items-center mb-16'
                  : smallScreen
                  ? 'flex flex-col w-full items-center mb-16'
                  : 'flex flex-col mb-16'
              }
            >
              <div className={mediumScreen ? 'flex' : smallScreen ? 'flex mb-16' : 'flex flex-col'}>
                <div className={smallScreen ? 'flex mr-16' : 'flex'}>
                  <CustomCheckBox
                    label="Lótico"
                    rounded
                    checked={formInfoCap.tipoFuente === 1}
                    onChange={checkedFuente('lotico')}
                  />
                  <Tooltip
                    title="cuerpos de agua dulce fluyente, es decir, que tienen caudal o flujo apreciable, como los ríos y quebradas."
                    placement="top"
                  >
                    <IconButton className="p-0 mx-16">
                      <HelpOutlineIcon style={{ color: '#145C9C' }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className={smallScreen ? 'flex mx-16' : 'flex'}>
                  <CustomCheckBox
                    label="Léntico"
                    rounded
                    checked={formInfoCap.tipoFuente === 2}
                    onChange={checkedFuente('lentico')}
                  />
                  <Tooltip
                    title="cuerpos de agua
                                    dulce caracterizados por aguas en calma o quietas, es decir, que no tienen caudal o flujo apreciable, como los lagos, 
                                    lagunas y ciénagas."
                    placement="top"
                  >
                    <IconButton className="p-0 mx-16">
                      <HelpOutlineIcon style={{ color: '#145C9C' }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className={smallScreen ? 'flex mx-16' : 'flex'}>
                  <CustomCheckBox
                    label="Aguas lluvias"
                    rounded
                    checked={formInfoCap.tipoFuente === 3}
                    onChange={checkedFuente('lluvias')}
                  />
                  <Tooltip
                    title="Aquellas recolectadas y almacenadas en los momentos y períodos de lluvias, las cuales requieren concesión en los 
                                    casos establecidos en el artículo 2.2.3.2.16.2 del Decreto 1076 de 2015."
                    placement="top"
                  >
                    <IconButton className="p-0 mx-16">
                      <HelpOutlineIcon style={{ color: '#145C9C' }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className={smallScreen ? 'flex' : 'flex flex-col'}>
                <div className={smallScreen ? 'flex mx-16' : 'flex'}>
                  <CustomCheckBox
                    label="Minero - medicinales"
                    rounded
                    checked={formInfoCap.tipoFuente === 4}
                    onChange={checkedFuente('minMed')}
                  />
                  <Tooltip
                    title="aguas minerales y termales, de acuerdo con lo establecido en el artículo 2.2.3.2.17.14 del
                                    Decreto 1076 de 2015."
                    placement="top"
                  >
                    <IconButton className="p-0 mx-16">
                      <HelpOutlineIcon style={{ color: '#145C9C' }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className={smallScreen ? 'flex mx-16' : 'flex'}>
                  <CustomCheckBox
                    label="Agua residual"
                    rounded
                    checked={formInfoCap.tipoFuente === 5}
                    onChange={checkedFuente('residual')}
                  />
                  <Tooltip
                    title=" Son las aguas ya utilizadas o servidas, de origen doméstico o no doméstico"
                    placement="top"
                  >
                    <IconButton className="p-0 mx-16">
                      <HelpOutlineIcon style={{ color: '#145C9C' }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className>
            <CustomTextField
              label="Nombre de la fuente"
              value={formInfoCap.nombreFuente}
              onChange={changeText('nombreFuente')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="especificar el nombre de la fuente de captación, departamento, municipio y centro poblado, vereda o corregimiento donde se ubica. 
                                                        Para el caso de una concesión de agua residual, identificar la actividad económica de la cual proviene el agua residual."
                      placement="top"
                    >
                      <IconButton>
                        <HelpOutlineIcon style={{ color: '#145C9C' }} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex flex-col mt-16">
            <Typography className="font-semibold text-14 mb-12" style={{ color: '#145C9C' }}>
              Localización captación:
            </Typography>
            <div className={mediumScreen ? 'flex' : 'flex flex-col'}>
              <div className={mediumScreen ? 'w-1/2 mr-12' : 'w-full mb-16'}>
                <CustomTextField
                  label="C. poblado/vereda/corregimiento:"
                  onChange={changeText('verCor')}
                  value={formInfoCap.verCor}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="indicar el centro poblado y/o corregimiento en donde se
                                                                localiza la fuente"
                          placement="top"
                        >
                          <IconButton>
                            <HelpOutlineIcon style={{ color: '#145C9C' }} />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div
                className={
                  mediumScreen
                    ? 'flex w-1/2 ml-12'
                    : smallScreen
                    ? 'flex w-full'
                    : 'flex flex-col w-full'
                }
              >
                <div className={smallScreen ? 'w-1/2 mr-12' : 'w-full mb-16'}>
                  <CustomFilterSelect
                    label="Departamento"
                    value={formInfoCap.departamento}
                    options={departamentOptions}
                    onChange={changeFilterSelect('departamento')}
                  />
                </div>
                <div className={smallScreen ? 'w-1/2 ml-12' : 'w-full'}>
                  <CustomFilterSelect
                    label="Municipio"
                    value={formInfoCap.municipio}
                    options={municipalityOptions}
                    onChange={changeFilterSelect('municipio')}
                    disabled={formInfoCap.departamento === ''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-32">
          <div className="flex mb-16">
            <Typography className="font-semibold text-14 mr-16" style={{ color: '#145C9C' }}>
              Coordenadas geográficas del punto de captación en sistema de referencia{' '}
              <a
                className="no-underline"
                href="https://www.igac.gov.co/es/contenido/areas-estrategicas/magna-sirgas"
                style={{ color: '#1915F0', backgroundColor: 'transparent' }}
                target="_blank"
                rel="noreferrer"
              >
                Magna Sirgas
              </a>{' '}
              (* al menos 1 registro):
            </Typography>
            <Tooltip
              title="especificar las coordenadas geográficas del punto de captación en sistema de referencia MAGNA SIRGAS. 
                            Es necesario registrar la latitud, longitud y altitud, con el fin de facilitar la compatibilidad e interoperabilidad 
                            con las técnicas actuales de georreferenciación, en especial con los Sistemas Globales de Navegación por
                            Satélite (SGNS), de acuerdo con el IGAC (Ver Resoluciones 471 y 529 de 2020, Resolución 955 de 2012, Decreto 303 de 2012 y 
                            Resolución 068 de 2005, o aquellas que las modifiquen, adicionen o sustituyan).
                                "
              placement="top"
            >
              <IconButton className="p-0 mx-16">
                <HelpOutlineIcon style={{ color: '#145C9C' }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="flex flex-col border-1 border-primaryBlack rounded-8 px-28 py-12 w-full overflow-x-scroll">
            <div className="flex mb-16" style={{ minWidth: 850 }}>
              <div className="w-3/4 mr-8 flex">
                <div
                  style={{ backgroundColor: '#EEF7FF' }}
                  className="w-1/2 h-60 flex justify-center items-center mr-8"
                >
                  <Typography className="text-18 text-primary font-bold">Latitud</Typography>
                </div>
                <div
                  style={{ backgroundColor: '#EEF7FF' }}
                  className="w-1/2 h-60 flex justify-center items-center ml-8"
                >
                  <Typography className="text-18 text-primary font-bold">Longitud</Typography>
                </div>
              </div>
              <div className="w-1/4 ml-8 flex">
                <div
                  style={{ backgroundColor: '#EEF7FF' }}
                  className="w-1/2 h-60 flex justify-center items-center mr-8"
                >
                  <Typography className="text-18 text-primary font-bold">Altitud</Typography>
                </div>
                <div className="w-1/2 ml-8" />
              </div>
            </div>
            <div className="flex mb-16" style={{ minWidth: 850 }}>
              <div className="w-3/4 mr-8 flex">
                <div className="w-1/2 flex mr-8">
                  <div className="mr-8 w-full">
                    <CustomTextField
                      label="Grados"
                      style={{ minWidth: 0 }}
                      value={coordenada.tipc_lat_grad}
                      onChange={changeNumberCoor('tipc_lat_grad')}
                    />
                  </div>
                  <div className="mx-8 w-full">
                    <CustomTextField
                      label="Minutos"
                      style={{ minWidth: 0 }}
                      value={coordenada.tipc_lat_min}
                      onChange={changeNumberCoor('tipc_lat_min')}
                    />
                  </div>
                  <div className="ml-8 w-full">
                    <CustomTextField
                      label="Segundos"
                      style={{ minWidth: 0 }}
                      value={coordenada.tipc_lat_seg}
                      onChange={changeNumberCoor('tipc_lat_seg')}
                    />
                  </div>
                </div>
                <div className="w-1/2 flex justify-center items-center ml-8">
                  <div className="mr-8 w-full">
                    <CustomTextField
                      label="Grados"
                      style={{ minWidth: 0 }}
                      value={coordenada.tipc_lon_grad}
                      onChange={changeNumberCoor('tipc_lon_grad')}
                    />
                  </div>
                  <div className="mx-8 w-full">
                    <CustomTextField
                      label="Minutos"
                      style={{ minWidth: 0 }}
                      value={coordenada.tipc_lon_min}
                      onChange={changeNumberCoor('tipc_lon_min')}
                    />
                  </div>
                  <div className="ml-8 w-full">
                    <CustomTextField
                      label="Segundos"
                      style={{ minWidth: 0 }}
                      value={coordenada.tipc_lon_seg}
                      onChange={changeNumberCoor('tipc_lon_seg')}
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/4 ml-8 flex">
                <div className="w-1/2 flex justify-center items-center mr-8">
                  <CustomTextField
                    label="Grados"
                    style={{ minWidth: 0 }}
                    value={coordenada.tipc_alt}
                    onChange={changeNumberCoor('tipc_alt')}
                  />
                </div>
                <div className="w-1/2 ml-8 flex items-center">
                  <CustomButton
                    width="full"
                    height="medium"
                    label="Agregar"
                    className="secondary"
                    onClick={addCoordenada(coordenada)}
                    disabled={disabled}
                  />
                </div>
              </div>
            </div>
            {arrayCoor.length > 0
              ? arrayCoor.map((coord, i) => {
                  return (
                    <div>
                      <Divider style={{ borderColor: '#D1E3F5' }} />
                      <div className="flex mb-16 mt-12">
                        <div className="w-3/4 mr-8 flex">
                          <div className="w-1/2 flex mr-8">
                            <div className="mr-8 w-full flex justify-center items-center">
                              <Typography style={{ color: '#647F97' }}>
                                {coord.tipc_lat_grad}
                              </Typography>
                            </div>
                            <div className="mx-8 w-full flex justify-center items-center">
                              <Typography style={{ color: '#647F97' }}>
                                {coord.tipc_lat_min}
                              </Typography>
                            </div>
                            <div className="ml-8 w-full flex justify-center items-center">
                              <Typography style={{ color: '#647F97' }}>
                                {coord.tipc_lat_seg}
                              </Typography>
                            </div>
                          </div>
                          <div className="w-1/2 flex justify-center items-center ml-8">
                            <div className="mr-8 w-full flex justify-center items-center">
                              <Typography style={{ color: '#647F97' }}>
                                {coord.tipc_lon_grad}
                              </Typography>
                            </div>
                            <div className="mx-8 w-full flex justify-center items-center">
                              <Typography style={{ color: '#647F97' }}>
                                {coord.tipc_lon_min}
                              </Typography>
                            </div>
                            <div className="ml-8 w-full flex justify-center items-center">
                              <Typography style={{ color: '#647F97' }}>
                                {coord.tipc_lon_seg}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/4 ml-8 flex">
                          <div className="w-1/2 flex justify-center items-center mr-8">
                            <Typography style={{ color: '#647F97' }}>{coord.tipc_alt}</Typography>
                          </div>
                          <div className="w-1/2 ml-8 flex justify-center items-center">
                            <div>
                              <IconButton className="" onClick={deleteItem(i)}>
                                <TrashIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
            <Divider style={{ borderColor: '#D1E3F5' }} />
          </div>
        </div>
        <div className={smallScreen ? 'flex' : 'flex flex-col '}>
          <div className={smallScreen ? 'flex flex-col w-1/2 mr-16' : 'flex flex-col w-full mb-16'}>
            <Typography className="font-semibold text-14  mb-16" style={{ color: '#145C9C' }}>
              ¿Requiere servidumbre para el aprovechamiento o para la construcción de las obras de
              captación?{' '}
              <Tooltip
                title="Indicar si se requiere o no permiso de servidumbre para la
                                construcción de las obras de captación, líneas de conducción etc., 
                                para el aprovechamiento del recurso hídrico. Es responsabilidad del usuario realizar los trámites
                                correspondientes de servidumbre cuando se requieran.
                                "
                placement="top"
              >
                <IconButton className="p-0 mx-16 absolute">
                  <HelpOutlineIcon style={{ color: '#145C9C' }} />
                </IconButton>
              </Tooltip>
            </Typography>
            <div className="flex justify-center">
              <CustomToggleButtons
                labelLeft="Si"
                labelRight="No"
                open={changeServidumbre('no')}
                close={changeServidumbre('si')}
                selectedLeft={formInfoCap.servidumbre === 1}
                selectedRight={formInfoCap.servidumbre === 0}
              />
            </div>
          </div>

          <div className={smallScreen ? 'w-1/2' : 'w-full'}>
            <div className="w-full mb-16">
              <Typography className="font-semibold text-14 mr-16" style={{ color: '#145C9C' }}>
                Observaciones de acceso al punto de captación o generalidades relevantes del
                aprovechamiento (adjuntar croquis):{' '}
                <Tooltip
                  title="mencionar generalidades asociadas al acceso al punto de captación para facilitar la visita de campo ó
                                            aspectos relevantes que se crean convenientes mencionar. Adjuntar croquis.
                                            Para el caso de una concesión de agua residual entiéndase el punto de captación 
                                            como el punto de entrega de las aguas.
                                "
                  placement="top"
                >
                  <IconButton className="p-0 mx-16 absolute">
                    <HelpOutlineIcon style={{ color: '#145C9C' }} />
                  </IconButton>
                </Tooltip>
              </Typography>
            </div>
            <div className="mb-16 w-full">
              <CustomTextField
                label="Observaciones"
                onChange={changeText('observaciones')}
                value={formInfoCap.observaciones}
                multiline
              />
            </div>
            <div className="flex mb-16">
              <Typography
                className="font-semibold text-14 mr-32 self-center "
                style={{ color: '#145C9C' }}
              >
                Adjuntar Croquis:
              </Typography>
            </div>
            <div>
              <CustomUploadAnexo
                value={informe}
                handleUploadChange={(e) => handleUploadChange(e)}
                handleUploadDelete={handleUploadDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoPuntoCaptacion;
