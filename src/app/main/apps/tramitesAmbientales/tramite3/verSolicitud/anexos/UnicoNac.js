import CustomUploadAnexo from "@components/CustomUploadAnexo";
import CustomUploadFile from "@components/CustomUploadFile";
import { Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";

const UnicoNac = (props) => {
  const {
    listadoAnexosleft,
    handleUploadChange,
    fileArrayList,
    handleUploadDelete,
    status,
    loadingAnexos
  } = props;

  const smallScreen = useMediaQuery('(min-width:500px)')
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full rounded-8 mb-32" style={{
        border: '1px solid #F9FCFF',
        boxSizing: 'border-box',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        backgroundColor: '#F9FCFF'
      }}>
        <div className="flex border-b-1  p-28 w-full items-center" style={{ borderBottom: '1px solid #D1E3F5' }}>
          <div>
            <Typography
              className="font-bold text-14"
              style={{
                color: status.documento === 1 ? '#299B89' :
                  status.documento === 2 ? "#FF4D4D" : "#4C647A"
              }}
            >
              Documentos del Formulario único nacional
            </Typography>
          </div>
        </div>
        <div className="flex flex-col justify-between  p-28 w-full items-center">
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{
                  color: status.documento === 1 ? '#299B89' :
                    status.documento === 2 ? "#FF4D4D" : "#4C647A"
                }}
                className="text-14 font-semibold"
              >
                Documento identidad del Solicitante principal
              </Typography>
              <Typography style={{
                color: status.documento === 1 ? '#299B89' :
                  status.documento === 2 ? "#FF4D4D" : "#4C647A"
              }} className="text-14 mr-28">
                Documento de identidad del solicitante principal del trámite. Foto al 150%
              </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'documentos' ? true : false}
                style={{ backgroundColor: 'white' }}
                value={fileArrayList.documentos}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[0].id_doc, 'documentos')}
              />
            </div>
          </div>
          <div className="border-1 border-primaryBlack rounded-8 p-28 w-full items-center" style={{ backgroundColor: '#F9FCFF' }}>
            <Typography style={{ color: '#023E73' }} className="font-semibold mb-16">Documentos que acrediten la personería jurídica del solicitante (artículo 2.2.3.2.9.2 del Decreto 1076 de 2015), hasta tanto no se cuente con interoperabilidad
              entre las entidades del Estado que emiten las acreditaciones (oficinas de instrumentos públicos, alcaldías, etc.) y la Autoridad Ambiental Competente:
            </Typography>
            <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
              <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                <Typography
                  style={{
                    color: status.sociedadesUnic === 1 ? '#299B89' :
                      status.sociedadesUnic === 2 ? "#FF4D4D" : "#4C647A"
                  }}
                  className="text-14 font-semibold"
                >
                  Sociedades:
                </Typography>
                <Typography style={{
                  color: status.sociedadesUnic === 1 ? '#299B89' :
                    status.sociedadesUnic === 2 ? "#FF4D4D" : "#4C647A"
                }} className="text-14 mr-28">
                  Certificado de existencia y representación legal (expedición no superior a 3 meses)

                </Typography>
              </div>
              <div className={smallScreen ? "w-2/5" : 'w-full'}>
                <CustomUploadAnexo
                  loading={loadingAnexos === 'sociedadesUnic' ? true : false}
                  value={fileArrayList.sociedadesUnic}
                  handleUploadDelete={handleUploadDelete}
                  handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[1].id_doc, 'sociedadesUnic')}
                  style={{ backgroundColor: 'white' }}
                  disabled={fileArrayList.jac.length > 0}
                />
              </div>
            </div>
            <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
              <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                <Typography
                  style={{
                    color: status.jac === 1 ? '#299B89' :
                      status.jac === 2 ? "#FF4D4D" : "#4C647A"
                  }}
                  className="text-14 font-semibold"
                >
                  Juntas de Acción Comunal:
                </Typography>
                <Typography style={{
                  color: status.jac === 1 ? '#299B89' :
                    status.jac === 2 ? "#FF4D4D" : "#4C647A"
                }} className="text-14 mr-28">
                  Certificado de existencia y representación legal o documento que haga sus veces, expedido con una antelación no mayor a 3 meses
                </Typography>
              </div>
              <div className={smallScreen ? "w-2/5" : 'w-full'}>
                <CustomUploadAnexo
                  loading={loadingAnexos === 'jac' ? true : false}
                  value={fileArrayList.jac}
                  handleUploadDelete={handleUploadDelete}
                  handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[2].id_doc, 'jac')}
                  style={{ backgroundColor: 'white' }}
                  disabled={fileArrayList.sociedadesUnic.length > 0}
                />
              </div>
            </div>
          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{
                  color: status.poder === 1 ? '#299B89' :
                    status.poder === 2 ? "#FF4D4D" : "#4C647A"
                }}
                className="text-14 font-semibold"
              >
                Poder
              </Typography>
              <Typography style={{
                color: status.poder === 1 ? '#299B89' :
                  status.poder === 2 ? "#FF4D4D" : "#4C647A"
              }} className="text-14 mr-28">
                Poder debidamente otorgado cuando se actúe por medio de apoderado (opcional)
              </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'poder' ? true : false}
                value={fileArrayList.poder}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[3].id_doc, 'poder')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className="border-1 border-primaryBlack rounded-8 p-28 w-full items-center" style={{ backgroundColor: '#F9FCFF' }}>
            <Typography style={{ color: '#023E73' }} className="font-semibold mb-16">
              Soportes de la calidad en la que se actúa sobre el predio (artículo 2.2.3.2.9.2 del Decreto 1076 de 2015):
            </Typography>
            <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
              <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                <Typography
                  style={{
                    color: status.propietario === 1 ? '#299B89' :
                      status.propietario === 2 ? "#FF4D4D" : "#4C647A"
                  }}
                  className="text-14 font-semibold"
                >
                  Propietario
                </Typography>
                <Typography style={{
                  color: status.propietario === 1 ? '#299B89' :
                    status.propietario === 2 ? "#FF4D4D" : "#4C647A"
                }} className="text-14 mr-28">
                  Certificado de tradición y libertad del inmueble (expedición no superior a 3 meses)
                </Typography>
              </div>
              <div className={smallScreen ? "w-2/5" : 'w-full'}>
                <CustomUploadAnexo
                  loading={loadingAnexos === 'propietario' ? true : false}
                  value={fileArrayList.propietario}
                  handleUploadDelete={handleUploadDelete}
                  handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[4].id_doc, 'propietario')}
                  style={{ backgroundColor: 'white' }}
                  disabled={fileArrayList.tenedor.length > 0 || fileArrayList.poseedor.length > 0}
                />
              </div>
            </div>
            <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
              <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"} >
                <Typography
                  style={{
                    color: status.tenedor === 1 ? '#299B89' :
                      status.tenedor === 2 ? "#FF4D4D" : "#4C647A"
                  }}
                  className="text-14 font-semibold"
                >
                  Tenedor
                </Typography>
                <Typography style={{
                  color: status.tenedor === 1 ? '#299B89' :
                    status.tenedor === 2 ? "#FF4D4D" : "#4C647A"
                }} className="text-14 mr-28">
                  Prueba adecuada que lo acredite como tal, autorización del propietario o poseedor y Certificado de tradición y libertad del inmueble (expedición no superior
                  a 3 meses).
                </Typography>
              </div>
              <div className={smallScreen ? "w-2/5" : 'w-full'}>
                <CustomUploadAnexo
                  loading={loadingAnexos === 'tenedor' ? true : false}
                  value={fileArrayList.tenedor}
                  handleUploadDelete={handleUploadDelete}
                  handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[5].id_doc, 'tenedor')}
                  style={{ backgroundColor: 'white' }}
                  disabled={fileArrayList.propietario.length > 0 || fileArrayList.poseedor.length > 0}
                />
              </div>
            </div>
            <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
              <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                <Typography
                  style={{
                    color: status.poseedor === 1 ? '#299B89' :
                      status.poseedor === 2 ? "#FF4D4D" : "#4C647A"
                  }}
                  className="text-14 font-semibold"
                >
                  Poseedor
                </Typography>
                <Typography style={{
                  color: status.poseedor === 1 ? '#299B89' :
                    status.poseedor === 2 ? "#FF4D4D" : "#4C647A"
                }} className="text-14 mr-28">
                  Prueba adecuada que lo acredite como tal y Certificado de tradición y libertad del inmueble (expedición no superior a 3 meses)
                </Typography>
              </div>
              <div className={smallScreen ? "w-2/5" : 'w-full'}>
                <CustomUploadAnexo
                  loading={loadingAnexos === 'poseedor' ? true : false}
                  value={fileArrayList.poseedor}
                  handleUploadDelete={handleUploadDelete}
                  handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[6].id_doc, 'poseedor')}
                  style={{ backgroundColor: 'white' }}
                  disabled={fileArrayList.propietario.length > 0 || fileArrayList.tenedor.length > 0}
                />
              </div>
            </div>


          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{
                  color: status.censoUnic === 1 ? '#299B89' :
                    status.censoUnic === 2 ? "#FF4D4D" : "#4C647A"
                }}
                className="text-14 font-semibold"
              >
                Censo
              </Typography>
              <Typography style={{
                color: status.censoUnic === 1 ? '#299B89' :
                  status.censoUnic === 2 ? "#FF4D4D" : "#4C647A"
              }} className="text-14 mr-28">
                Censo de usuarios para acueductos veredales y municipales.
              </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'censoUnic' ? true : false}
                value={fileArrayList.censoUnic}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[7].id_doc, 'censoUnic')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>

          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{
                  color: status.concesionesEsp === 1 ? '#299B89' :
                    status.concesionesEsp === 2 ? "#FF4D4D" : "#4C647A"
                }}
                className="text-14 font-semibold"
              >
                Concesiones con características especiales
              </Typography>
              <Typography style={{
                color: status.concesionesEsp === 1 ? '#299B89' :
                  status.concesionesEsp === 2 ? "#FF4D4D" : "#4C647A"
              }} className="text-14 mr-28">
                Información prevista en la sección 10, articulos 2.2.3.2.10.1 al 2.2.3.2.10.20 del Decreto 1076 de 2015 para concesiones con características especiales.            </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'concesionesEsp' ? true : false}
                value={fileArrayList.concesionesEsp}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[8].id_doc, 'concesionesEsp')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{
                  color: status.autorizacionSan === 1 ? '#299B89' :
                    status.autorizacionSan === 2 ? "#FF4D4D" : "#4C647A"
                }}
                className="text-14 font-semibold"
              >
                Autorización sanitaria emitida
              </Typography>
              <Typography style={{
                color: status.autorizacionSan === 1 ? '#299B89' :
                  status.autorizacionSan === 2 ? "#FF4D4D" : "#4C647A"
              }} className="text-14 mr-28">
                Autorización sanitaria emitida por parte del Instituto Seccional de Salud, en caso que la concesión sea solicitada para consumo humano (artículo 28 del Decreto
                1575 de 2007).
              </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'autorizacionSan' ? true : false}
                value={fileArrayList.autorizacionSan}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[9].id_doc, 'autorizacionSan')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{
                  color: status.sistemas === 1 ? '#299B89' :
                    status.sistemas === 2 ? "#FF4D4D" : "#4C647A"
                }}
                className="text-14 font-semibold"
              >
                Sistemas a adoptar
              </Typography>
              <Typography style={{
                color: status.sistemas === 1 ? '#299B89' :
                  status.sistemas === 2 ? "#FF4D4D" : "#4C647A"
              }} className="text-14 mr-28">
                Información sobre los sistemas que se adoptarán para la captación, derivación conducción, restitución de sobrantes, distribución y drenaje, y sobre las
                inversiones, cuantía de las mismas y término en el cual se van a realizar (artículo 2.2.3.2.9.1 del Decreto 1076 de 2015).            </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'sistemas' ? true : false}
                value={fileArrayList.sistemas}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[10].id_doc, 'sistemas')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{
                  color: status.concesionRes === 1 ? '#299B89' :
                    status.concesionRes === 2 ? "#FF4D4D" : "#4C647A"
                }}
                className="text-14 font-semibold"
              >
                Si es una concesión de agua residual
              </Typography>
              <Typography style={{
                color: status.concesionRes === 1 ? '#299B89' :
                  status.concesionRes === 2 ? "#FF4D4D" : "#4C647A"
              }} className="text-14 mr-28">
                Si es una concesión de agua residual, adjuntar la información solicitada para el ejercicio de evaluación, control y seguimiento por parte de la Autoridad
                Ambiental, establecida en la Resolución 1207 de 2014, o aquella que la modifique, adicione o sustituya</Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'concesionAgua' ? true : false}
                value={fileArrayList.concesionAgua}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[11].id_doc, 'concesionAgua')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{
                  color: status.pueaa === 1 ? '#299B89' :
                    status.pueaa === 2 ? "#FF4D4D" : "#4C647A"
                }}
                className="text-14 font-semibold"
              >
                PUEAA
              </Typography>
              <Typography style={{
                color: status.pueaa === 1 ? '#299B89' :
                  status.pueaa === 2 ? "#FF4D4D" : "#4C647A"
              }} className="text-14 mr-28">
                Programa de Uso Eficiente y Ahorro del Agua, PUEAA, de acuerdo con la Resolución 1257 de 2018, o aquella que la modifique, adicione o sustituya.            </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'pueaa' ? true : false}
                value={fileArrayList.pueaa}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[12].id_doc, 'pueaa')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full rounded-8 mb-32 justify-between p-28 items-center" style={{
        border: '1px solid #F9FCFF',
        boxSizing: 'border-box',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        backgroundColor: '#F9FCFF'
      }}>
        <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
          <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
            <Typography
              style={{ color: "#4C647A" }}
              className="text-14 font-semibold"
            >
              Documentos adicionales (opcional)
            </Typography>
            <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
              Aquí podrá adjuntar cualquier otro tipo de documento que crea necesario para el trámite.
            </Typography>
          </div>
          <div className={smallScreen ? "w-2/5 mb-40" : 'w-full'}>
            <CustomUploadAnexo
              loading={loadingAnexos === 'documentoAdd' ? true : false}
              value={fileArrayList.documentoAdd}
              handleUploadDelete={handleUploadDelete}
              handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[13].id_doc, 'documentoAdd')}
              style={{ backgroundColor: 'white' }} />
          </div>
        </div>
        {/* <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
          <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
            <Typography
              style={{ color: "#4C647A" }}
              className="text-14 font-semibold"
            >
              Documentos adicionales requeridos (opcional) */}
            {/* </Typography> */}
            {/* <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                Si es una modificación de una concesión de aguas subterráneas para incluir una nueva fuente de abastecimiento, se deberá adjuntar la información solicitada
                para el ejercicio de evaluación, control y seguimiento por parte de la Autoridad Ambiental, establecida en la Resolución 1207 de 2014, o aquella que la modifique,
                adicione o sustituya.
              </Typography> */}
          {/* </div>
          <div className={smallScreen ? "w-2/5" : 'w-full'}>
            <CustomUploadAnexo
              loading={loadingAnexos === 'documentoAddReq' ? true : false}
              value={fileArrayList.documentoAddReq}
              handleUploadDelete={handleUploadDelete}
              handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[14].id_doc, 'documentoAddReq')}
              style={{ backgroundColor: 'white' }} />
          </div>
        </div> */}
      </div>
      <div>
        <Typography className="font-bold italic" style={{ color: '#999999' }}>PARA EFECTOS DE LA CONCESIÓN DE AGUA RESIDUAL:</Typography>
        <Typography className="italic" style={{ color: '#999999' }}>
          Los requisitos establecidos en el formulario aplican para modificaciones de concesión de aguas subterráneas que incluyan como fuente de abastecimiento las aguas
          residuales, para lo cual deberá ser diligenciado por el usuario que requiera modificación de concesión para adelantar la práctica de reúso, bajo las indicaciones aquí
          señaladas.
        </Typography>
      </div>
    </div>
  );
};

export default UnicoNac;
