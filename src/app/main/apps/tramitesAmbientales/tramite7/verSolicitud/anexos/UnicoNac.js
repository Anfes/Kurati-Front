import CustomUploadAnexo from "@components/CustomUploadAnexo";
import { Typography, useMediaQuery } from "@mui/material";
import React from "react";

const UnicoNac = (props) => {
  const {
    listadoAnexosleft,
    handleUploadChange,
    fileArrayList,
    handleUploadDelete,
    loadingAnexos
  } = props;
  const smallScreen = useMediaQuery('(min-width:500px)')
  return (
    <div>
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
              style={{ color: "#4C647A" }}
            >
              Documentos del Formulario único nacional
            </Typography>
          </div>
        </div>
        <div className="flex flex-col justify-between  p-28 w-full items-center">
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{ color: "#4C647A" }}
                className="text-14 font-semibold"
              >
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[0].td_titulo : ''}
              </Typography>
              <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[0].td_descripcion : ''}
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
                  style={{ color: "#4C647A" }}
                  className="text-14 font-semibold"
                >
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[1].td_titulo : ''}
                </Typography>
                <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[1].td_descripcion : ''}
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
                  style={{ color: "#4C647A" }}
                  className="text-14 font-semibold"
                >
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[2].td_titulo : ''}
                </Typography>
                <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[2].td_descripcion : ''}
                </Typography>
              </div>
              <div className={smallScreen ? "w-2/5" : 'w-full'}>
                <CustomUploadAnexo
                  loading={loadingAnexos === 'jac' ? true : false}
                  value={fileArrayList.jac}
                  handleUploadDelete={handleUploadDelete}
                  handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[2].id_doc, 'jac')}
                  disabled={fileArrayList.sociedadesUnic.length > 0}
                  style={{ backgroundColor: 'white' }} />
              </div>
            </div>
          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{ color: "#4C647A" }}
                className="text-14 font-semibold"
              >
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[3].td_titulo : ''}
              </Typography>
              <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[3].td_descripcion : ''}
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
                  style={{ color: "#4C647A" }}
                  className="text-14 font-semibold"
                >
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[4].td_titulo : ''}
                </Typography>
                <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[4].td_descripcion : ''}
                </Typography>
              </div>
              <div className={smallScreen ? "w-2/5" : 'w-full'}>
                <CustomUploadAnexo
                  loading={loadingAnexos === 'propietario' ? true : false}
                  value={fileArrayList.propietario}
                  handleUploadDelete={handleUploadDelete}
                  disabled={fileArrayList.tenedor.length > 0 || fileArrayList.poseedor.length > 0}
                  handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[4].id_doc, 'propietario')}
                  style={{ backgroundColor: 'white' }} />
              </div>
            </div>
            <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
              <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"} >
                <Typography
                  style={{ color: "#4C647A" }}
                  className="text-14 font-semibold"
                >
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[5].td_titulo : ''}
                </Typography>
                <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[5].td_descripcion : ''}
                </Typography>
              </div>
              <div className={smallScreen ? "w-2/5" : 'w-full'}>
                <CustomUploadAnexo
                  loading={loadingAnexos === 'tenedor' ? true : false}
                  value={fileArrayList.tenedor}
                  handleUploadDelete={handleUploadDelete}
                  disabled={fileArrayList.propietario.length > 0 || fileArrayList.poseedor.length > 0}
                  handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[5].id_doc, 'tenedor')}
                  style={{ backgroundColor: 'white' }} />
              </div>
            </div>
            <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
              <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                <Typography
                  style={{ color: "#4C647A" }}
                  className="text-14 font-semibold"
                >
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[6].td_titulo : ''}
                </Typography>
                <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                  {listadoAnexosleft.length > 0 ? listadoAnexosleft[6].td_descripcion : ''}
                </Typography>
              </div>
              <div className={smallScreen ? "w-2/5" : 'w-full'}>
                <CustomUploadAnexo
                  loading={loadingAnexos === 'poseedor' ? true : false}
                  value={fileArrayList.poseedor}
                  handleUploadDelete={handleUploadDelete}
                  disabled={fileArrayList.propietario.length > 0 || fileArrayList.tenedor.length > 0}
                  handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[6].id_doc, 'poseedor')}
                  style={{ backgroundColor: 'white' }} />
              </div>
            </div>


          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{ color: "#4C647A" }}
                className="text-14 font-semibold"
              >
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[7].td_titulo : ''}
              </Typography>
              <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[7].td_descripcion : ''}
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
                style={{ color: "#4C647A" }}
                className="text-14 font-semibold"
              >
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[8].td_titulo : ''}
              </Typography>
              <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[8].td_descripcion : ''}
              </Typography>
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
                style={{ color: "#4C647A" }}
                className="text-14 font-semibold"
              >
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[9].td_titulo : ''}
              </Typography>
              <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[9].td_descripcion : ''}
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
                style={{ color: "#4C647A" }}
                className="text-14 font-semibold"
              >
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[10].td_titulo : ''}
              </Typography>
              <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[10].td_descripcion : ''}
              </Typography>
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
                style={{ color: "#4C647A" }}
                className="text-14 font-semibold"
              >
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[11].td_titulo : ''}
              </Typography>
              <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[11].td_descripcion : ''}
              </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'pueaa' ? true : false}
                value={fileArrayList.pueaa}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[11].id_doc, 'pueaa')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{ color: "#4C647A" }}
                className="text-14 font-semibold"
              >
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[12].td_titulo : ''}
              </Typography>
              <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[12].td_descripcion : ''}
              </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'permisoProsExp' ? true : false}
                value={fileArrayList.permisoProsExp}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[12].id_doc, 'permisoProsExp')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>
          <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
            <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
              <Typography
                style={{ color: "#4C647A" }}
                className="text-14 font-semibold"
              >
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[13].td_titulo : ''}
              </Typography>
              <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
                {listadoAnexosleft.length > 0 ? listadoAnexosleft[13].td_descripcion : ''}
              </Typography>
            </div>
            <div className={smallScreen ? "w-2/5" : 'w-full'}>
              <CustomUploadAnexo
                loading={loadingAnexos === 'modificacionAg' ? true : false}
                value={fileArrayList.modificacionAg}
                handleUploadDelete={handleUploadDelete}
                handleUploadChange={(e) => handleUploadChange(e, listadoAnexosleft[13].id_doc, 'modificacionAg')}
                style={{ backgroundColor: 'white' }} />
            </div>
          </div>
        </div>
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
