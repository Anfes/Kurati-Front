import { Typography, useMediaQuery } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CustomCollapsibleTable from '@components/CustomCollapsibleTable';
import CustomUploadAnexo from '@components/CustomUploadAnexo';

const Suit = (props) => {
  const {
    checkTable,
    checkedTable,
    listadoAnexosRight,
    handleUploadChange,
    handleUploadDelete,
    fileArrayList,
    status,
    loadingAnexos,
  } = props;

  const smallScreen = useMediaQuery('(min-width:500px)');
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between border-1 border-primaryBlack rounded-t-8 p-28 w-full items-center">
        <div>
          <Typography className="font-bold text-14" style={{ color: '#4C647A' }}>
            Documentos del SUIT
          </Typography>
        </div>
      </div>
      <div className="flex flex-col justify-between border-1 border-primaryBlack rounded-b-8 p-28 w-full items-center">
        <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex- col my-16 w-full'}>
          <div
            className={
              smallScreen
                ? 'flex flex-col justify-start mt-5 w-3/5'
                : 'flex flex-col justify-start mt-5 w-full mb-12'
            }
          >
            <Typography
              style={{
                color:
                  status.cdcrdd === 1 ? '#299B89' : status.cdcrdd === 2 ? '#FF4D4D' : '#4C647A',
              }}
              className="text-14 font-semibold"
            >
              Documento adicional Sistemas (CDCRDD)
            </Typography>
            <Typography
              style={{
                color:
                  status.cdcrdd === 1 ? '#299B89' : status.cdcrdd === 2 ? '#FF4D4D' : '#4C647A',
              }}
              className="text-14 mr-28"
            >
              Documento con información sobre los sistemas para la captación, derivación,
              conducción, restitución de sobrantes, distribución y drenaje: 1 Original(es)
            </Typography>
          </div>
          <div className={smallScreen ? 'w-2/5' : 'w-full'}>
            <CustomUploadAnexo
              loading={loadingAnexos === 'cdcrdd'}
              value={fileArrayList.cdcrdd}
              handleUploadDelete={handleUploadDelete}
              handleUploadChange={(e) =>
                handleUploadChange(e, listadoAnexosRight[0].id_doc, 'cdcrdd')
              }
            />
          </div>
        </div>
        <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex- col my-16 w-full'}>
          <div
            className={
              smallScreen
                ? 'flex flex-col justify-start mt-5 w-3/5'
                : 'flex flex-col justify-start mt-5 w-full mb-12'
            }
          >
            <Typography
              style={{
                color:
                  status.anotacionesAd === 1
                    ? '#299B89'
                    : status.anotacionesAd === 2
                    ? '#FF4D4D'
                    : '#4C647A',
              }}
              className="text-14 font-semibold"
            >
              Anotaciones adicionales
            </Typography>
            <Typography
              style={{
                color:
                  status.anotacionesAd === 1
                    ? '#299B89'
                    : status.anotacionesAd === 2
                    ? '#FF4D4D'
                    : '#4C647A',
              }}
              className="text-14 mr-28"
            >
              Sobre las inversiones, cuantía de las mismas y término en el cual se van a realizar
            </Typography>
          </div>
          <div className={smallScreen ? 'w-2/5' : 'w-full'}>
            <CustomUploadAnexo
              loading={loadingAnexos === 'anotacionesAd'}
              value={fileArrayList.anotacionesAd}
              handleUploadDelete={handleUploadDelete}
              handleUploadChange={(e) =>
                handleUploadChange(e, listadoAnexosRight[1].id_doc, 'anotacionesAd')
              }
            />
          </div>
        </div>
        <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex- col my-16 w-full'}>
          <div
            className={
              smallScreen
                ? 'flex flex-col justify-start mt-5 w-3/5'
                : 'flex flex-col justify-start mt-5 w-full mb-12'
            }
          >
            <Typography
              style={{
                color:
                  status.diseñoPozo === 1
                    ? '#299B89'
                    : status.diseñoPozo === 2
                    ? '#FF4D4D'
                    : '#4C647A',
              }}
              className="text-14 font-semibold"
            >
              Diseño definitivo del Pozo
            </Typography>
            <Typography style={{ color: '#4C647A' }} className="text-14 mr-28">
              Diseño definitivo del pozo: 1 Fotocopia(s)
            </Typography>
          </div>
          <div className={smallScreen ? 'w-2/5' : 'w-full'}>
            <CustomUploadAnexo
              loading={loadingAnexos === 'disenoPozo'}
              value={fileArrayList.disenoPozo}
              handleUploadDelete={handleUploadDelete}
              handleUploadChange={(e) =>
                handleUploadChange(e, listadoAnexosRight[2].id_doc, 'disenoPozo')
              }
            />
          </div>
        </div>
        <div
          className="border-1 rounded-8 flex w-full justify-start mt-5 p-16 my-16"
          style={{ backgroundColor: '#EEF7FF', borderColor: '#2E7EC5' }}
        >
          <InfoRoundedIcon className="mr-8" style={{ color: '#2E7EC5' }} />
          <Typography style={{ color: '#2E7EC5' }}>
            Debes escoger una única opción y adjuntar todos los documentos requeridos
          </Typography>
        </div>
        <div className="w-full my-16">
          <CustomCollapsibleTable
            label="Para Acueductos de uso doméstico"
            checked={checkedTable === 1}
            onChange={checkTable('acueductos')}
            content={
              <div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex-col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.censo === 1
                            ? '#299B89'
                            : status.censo === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Censo
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.censo === 1
                            ? '#299B89'
                            : status.censo === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Documento que indique los detalles de las obras:1 Fotocopia(s)
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5 mb-40' : 'w-full mb-96'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'preCenso'}
                      value={fileArrayList.preCenso}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[3].id_doc, 'preCenso')
                      }
                      disabled={checkedTable !== 1}
                    />
                  </div>
                </div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex-col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.autSanitaria === 1
                            ? '#299B89'
                            : status.autSanitaria === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Autorización sanitaria
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.autSanitaria === 1
                            ? '#299B89'
                            : status.autSanitaria === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Contar con autorización sanitaria favorable.
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5  mb-40' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'preAutoricacion'}
                      value={fileArrayList.preAutoricacion}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[4].id_doc, 'preAutoricacion')
                      }
                      disabled={checkedTable !== 1}
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>
        <div className="w-full my-16">
          <CustomCollapsibleTable
            label="Para prestación de servicios públicos"
            checked={checkedTable === 2}
            onChange={checkTable('servicios')}
            content={
              <div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex-col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.detallesObra === 1
                            ? '#299B89'
                            : status.detallesObra === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Detalles de las obras
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.detallesObra === 1
                            ? '#299B89'
                            : status.detallesObra === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Documento que indique los detalles de las obras: 1 Fotocopia(s)
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5  mb-40' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'refriDetalle'}
                      value={fileArrayList.refriDetalle}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[5].id_doc, 'refriDetalle')
                      }
                      disabled={checkedTable !== 2}
                    />
                  </div>
                </div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex-col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.adPredio === 1
                            ? '#299B89'
                            : status.adPredio === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Anotaciones adicionales (Predios)
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.adPredio === 1
                            ? '#299B89'
                            : status.adPredio === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Adicionalmente se deberá indicar la extensión y el número de predios o de
                      habitantes que se proyecta beneficiar, el plazo dentro del cual se dará al
                      servicio y la reglamentación del mismo.
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5  mb-40' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'refriAdicional'}
                      value={fileArrayList.refriAdicional}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[6].id_doc, 'refriAdicional')
                      }
                      disabled={checkedTable !== 2}
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div className="w-full my-16">
          <CustomCollapsibleTable
            label="Para refrigeración de máquinas"
            checked={checkedTable === 3}
            onChange={checkTable('refrigeracion')}
            content={
              <div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex-col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.opLavado === 1
                            ? '#299B89'
                            : status.opLavado === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Operaciones de lavado
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.opLavado === 1
                            ? '#299B89'
                            : status.opLavado === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Prueba adecuada que lo acredite como tal y autorización del propietario o
                      poseedor.
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'refriOperaciones'}
                      value={fileArrayList.refriOperaciones}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[7].id_doc, 'refriOperaciones')
                      }
                      disabled={checkedTable !== 3}
                    />
                  </div>
                </div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex-col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.adRefrigeracion === 1
                            ? '#299B89'
                            : status.adRefrigeracion === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Anotaciones adicionales
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.adRefrigeracion === 1
                            ? '#299B89'
                            : status.adRefrigeracion === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Comprendida la periodicidad, el lugar y el sitio donde se produzca el
                      vertimiento de las aguas servidas.
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'energAnotacion'}
                      value={fileArrayList.energAnotacion}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[8].id_doc, 'energAnotacion')
                      }
                      disabled={checkedTable !== 3}
                    />
                  </div>
                </div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex-col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.cantidadAgua === 1
                            ? '#299B89'
                            : status.cantidadAgua === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Cantidad de agua
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.cantidadAgua === 1
                            ? '#299B89'
                            : status.cantidadAgua === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Dato exacto de la cantidad de agua que se necesita para refrigerar las
                      máquinas: 1 Original(es)
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5  mb-40' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'energCantidad'}
                      value={fileArrayList.energCantidad}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[9].id_doc, 'energCantidad')
                      }
                      disabled={checkedTable !== 3}
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div className="w-full my-16">
          <CustomCollapsibleTable
            label="Para uso energético"
            checked={checkedTable === 4}
            onChange={checkTable('energetico')}
            content={
              <div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex-col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.factibilidadEner === 1
                            ? '#299B89'
                            : status.factibilidadEner === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Estudio de factibilidad
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.factibilidadEner === 1
                            ? '#299B89'
                            : status.factibilidadEner === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Estudio de factibilidad del proyecto completo: 1 Original(es)
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5  mb-40' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'completoFactibilidad'}
                      value={fileArrayList.completoFactibilidad}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[10].id_doc, 'completoFactibilidad')
                      }
                      disabled={checkedTable !== 4}
                    />
                  </div>
                </div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex-col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.adEnergia === 1
                            ? '#299B89'
                            : status.adEnergia === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Anotaciones adicionales (Energía)
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.adEnergia === 1
                            ? '#299B89'
                            : status.adEnergia === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Donde se especifique la potencia y la generación anual estimada.
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5  mb-40' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'minerofactibilidad'}
                      value={fileArrayList.minerofactibilidad}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[11].id_doc, 'minerofactibilidad')
                      }
                      disabled={checkedTable !== 4}
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div className="w-full my-16">
          <CustomCollapsibleTable
            label="Para uso industrial"
            checked={checkedTable === 5}
            onChange={checkTable('industrial')}
            content={
              <div>
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex- col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.factibilidadIndustrial === 1
                            ? '#299B89'
                            : status.factibilidadIndustrial === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Estudio de factibilidad
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.factibilidadIndustrial === 1
                            ? '#299B89'
                            : status.factibilidadIndustrial === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Estudio de factibilidad del proyecto industrial: 1 Original(es)
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'industrialFactibilidad'}
                      value={fileArrayList.industrialFactibilidad}
                      handleUploadDelete={handleUploadDelete}
                      disabled={checkedTable !== 5}
                      handleUploadChange={(e) =>
                        handleUploadChange(
                          e,
                          listadoAnexosRight[12].id_doc,
                          'industrialFactibilidad'
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div className="w-full my-16">
          <CustomCollapsibleTable
            label="Para uso minero y petrolero"
            checked={checkedTable === 6}
            onChange={checkTable('minero')}
            content={
              <div className="w-full">
                <div className={smallScreen ? 'flex my-16 w-full' : '"flex flex- col my-16 w-full'}>
                  <div
                    className={
                      smallScreen
                        ? 'flex flex-col justify-start mt-5 w-3/5'
                        : 'flex flex-col justify-start mt-5 w-full mb-12'
                    }
                  >
                    <Typography
                      style={{
                        color:
                          status.factibilidadMinero === 1
                            ? '#299B89'
                            : status.factibilidadMinero === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 font-semibold"
                    >
                      Estudio de factibilidad
                    </Typography>
                    <Typography
                      style={{
                        color:
                          status.factibilidadMinero === 1
                            ? '#299B89'
                            : status.factibilidadMinero === 2
                            ? '#FF4D4D'
                            : '#4C647A',
                      }}
                      className="text-14 mr-28"
                    >
                      Estudio de factibilidad del proyecto industrial: 1 Original(es)
                    </Typography>
                  </div>
                  <div className={smallScreen ? 'w-2/5' : 'w-full'}>
                    <CustomUploadAnexo
                      loading={loadingAnexos === 'estudioFactibilidad'}
                      value={fileArrayList.estudioFactibilidad}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) =>
                        handleUploadChange(e, listadoAnexosRight[13].id_doc, 'estudioFactibilidad')
                      }
                      disabled={checkedTable !== 6}
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Suit;
