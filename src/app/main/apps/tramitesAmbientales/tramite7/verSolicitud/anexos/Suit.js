import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CustomUploadAnexo from "@components/CustomUploadAnexo";
import CustomCollapsibleTable from "@components/CustomCollapsibleTable";


const Suit = (props) => {
  const {
    listadoAnexosRight,
    handleUploadChange,
    handleUploadDelete,
    fileArrayList,
    checkTable,
    checkedTable,
  } = props;

  const smallScreen = useMediaQuery('(min-width:500px)')

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between border-1 border-primaryBlack rounded-t-8 p-28 w-full items-center">
        <div>
          <Typography
            className="font-bold text-14"
            style={{ color: "#4C647A" }}
          >
            Documentos del SUIT
          </Typography>
        </div>
      </div>
      <div className="flex flex-col justify-between border-1 border-primaryBlack rounded-b-8 p-28 w-full items-center">
        <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
          <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
            <Typography
              style={{ color: "#4C647A" }}
              className="text-14 font-semibold"
            >
              {listadoAnexosRight.length > 0 ? listadoAnexosRight[0].td_titulo : ''}
            </Typography>
            <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
              {listadoAnexosRight.length > 0 ? listadoAnexosRight[0].td_descripcion : ''}
            </Typography>
          </div>
          <div className={smallScreen ? "w-2/5" : 'w-full'}>
            <CustomUploadAnexo
              value={fileArrayList.cdcrdd}
              handleUploadDelete={handleUploadDelete}
              handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[0].id_doc, 'cdcrdd')}
            />
          </div>
        </div>
        <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
          <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
            <Typography
              style={{ color: "#4C647A" }}
              className="text-14 font-semibold"
            >
              {listadoAnexosRight.length > 0 ? listadoAnexosRight[1].td_titulo : ''}
            </Typography>
            <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
              {listadoAnexosRight.length > 0 ? listadoAnexosRight[1].td_descripcion : ''}
            </Typography>
          </div>
          <div className={smallScreen ? "w-2/5" : 'w-full'}>
            <CustomUploadAnexo
              value={fileArrayList.anotacionesAd}
              handleUploadDelete={handleUploadDelete}
              handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[1].id_doc, 'anotacionesAd')}
            />
          </div>
        </div>
        <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
          <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
            <Typography
              style={{ color: "#4C647A" }}
              className="text-14 font-semibold"
            >
              {listadoAnexosRight.length > 0 ? listadoAnexosRight[2].td_titulo : ''}
            </Typography>
            <Typography style={{ color: "#4C647A" }} className="text-14 mr-28">
              {listadoAnexosRight.length > 0 ? listadoAnexosRight[2].td_descripcion : ''}
            </Typography>
          </div>
          <div className={smallScreen ? "w-2/5" : 'w-full'}>
            <CustomUploadAnexo
              value={fileArrayList.disenoPozo}
              handleUploadDelete={handleUploadDelete}
              handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[2].id_doc, 'disenoPozo')}
              />
          </div>
        </div>
        <div
          className="border-1 rounded-8 flex w-full justify-start mt-5 p-16 my-16"
          style={{ backgroundColor: "#EEF7FF", borderColor: "#2E7EC5" }}
        >
          <InfoRoundedIcon className="mr-8" style={{ color: "#2E7EC5" }} />
          <Typography style={{ color: "#2E7EC5" }}>
            Debes escoger una única opción y adjuntar todos los documentos
            requeridos
          </Typography>
        </div>
        <div className="w-full my-16">
          <CustomCollapsibleTable
            label="Para prestación de servicios públicos"
            checked={checkedTable === 1 ?true: false}
            onChange={checkTable('servicios')}
            content={
              <div>
                <div className={smallScreen ? "flex my-16 w-full" : '"flex flex-col my-16 w-full'}>
                  <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 font-semibold"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[3].td_titulo : ''}
                    </Typography>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 mr-28"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[3].td_descripcion : ''}
                    </Typography>
                  </div>
                  <div className={smallScreen ? "w-2/5" : 'w-full'}>
                    <CustomUploadAnexo
                      value={fileArrayList.preCenso}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[3].id_doc, 'preCenso')}
                      disabled={checkedTable !== 1}
                      />
                  </div>
                </div>
                <div className={smallScreen ? "flex my-16 w-full" : '"flex flex-col my-16 w-full'}>
                  <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 font-semibold"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[4].td_titulo : ''}
                    </Typography>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 mr-28"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[4].td_descripcion : ''}
                    </Typography>
                  </div>
                  <div className={smallScreen ? "w-2/5" : 'w-full'}>
                    <CustomUploadAnexo
                      value={fileArrayList.preAutoricacion}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[4].id_doc, 'preAutoricacion')}
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
            label="Para refrigeración de máquinas"
            checked={checkedTable === 2 ?true: false}
            onChange={checkTable('refrigeracion')}
            content={
              <div>
                <div className={smallScreen ? "flex my-16 w-full" : '"flex flex-col my-16 w-full'}>
                  <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 font-semibold"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[5].td_titulo : ''}
                    </Typography>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 mr-28"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[5].td_descripcion : ''}
                    </Typography>
                  </div>
                  <div className={smallScreen ? "w-2/5" : 'w-full'}>
                    <CustomUploadAnexo
                      value={fileArrayList.refriDetalle}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[5].id_doc, 'refriDetalle')}
                      disabled={checkedTable !== 2}
                      />
                  </div>
                </div>
                <div className={smallScreen ? "flex my-16 w-full" : '"flex flex-col my-16 w-full'}>
                  <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 font-semibold"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[6].td_titulo : ''}
                    </Typography>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 mr-28"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[6].td_descripcion : ''}
                    </Typography>
                  </div>
                  <div className={smallScreen ? "w-2/5" : 'w-full'}>
                    <CustomUploadAnexo
                      value={fileArrayList.refriAdicional}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[6].id_doc, 'refriAdicional')}
                      disabled={checkedTable !== 2}
                      />
                  </div>
                </div>
                <div className={smallScreen ? "flex my-16 w-full" : '"flex flex-col my-16 w-full'}>
                  <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 font-semibold"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[7].td_titulo : ''}
                    </Typography>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 mr-28"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[7].td_descripcion : ''}
                    </Typography>
                  </div>
                  <div className={smallScreen ? "w-2/5" : 'w-full'}>
                    <CustomUploadAnexo
                      value={fileArrayList.refriOperaciones}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[7].id_doc, 'refriOperaciones')}
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
            label="Para uso energético"
            checked={checkedTable === 3 ?true: false}
            onChange={checkTable('energetico')}
            content={
              <div>
                <div className={smallScreen ? "flex my-16 w-full" : '"flex flex-col my-16 w-full'}>
                  <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 font-semibold"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[8].td_titulo : ''}
                    </Typography>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 mr-28"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[8].td_descripcion : ''}
                    </Typography>
                  </div>
                  <div className={smallScreen ? "w-2/5" : 'w-full'}>
                    <CustomUploadAnexo
                      value={fileArrayList.energAnotacion}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[8].id_doc, 'energAnotacion')}
                      disabled={checkedTable !== 3}
                      />
                  </div>
                </div>
                <div className={smallScreen ? "flex my-16 w-full" : '"flex flex-col my-16 w-full'}>
                  <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 font-semibold"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[9].td_titulo : ''}
                    </Typography>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 mr-28"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[9].td_descripcion : ''}
                    </Typography>
                  </div>
                  <div className={smallScreen ? "w-2/5" : 'w-full'}>
                    <CustomUploadAnexo
                      value={fileArrayList.energCantidad}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[9].id_doc, 'energCantidad')}
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
            label="Para uso industrial"
            checked={checkedTable === 4 ?true: false}
            onChange={checkTable('industrial')}
            content={
              <div>
                <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
                  <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 font-semibold"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[10].td_titulo : ''}
                    </Typography>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 mr-28"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[10].td_descripcion : ''}
                    </Typography>
                  </div>
                  <div className={smallScreen ? "w-2/5" : 'w-full'}>
                    <CustomUploadAnexo
                      value={fileArrayList.industrialFactibilidad}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[10].id_doc, 'industrialFactibilidad')}
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
            label="Para uso minero y petrolero"
            checked={checkedTable === 5 ?true: false}
            onChange={checkTable('minero')}
            content={
              <div className="w-full">
                <div className={smallScreen ? "flex my-16 w-full" : '"flex flex- col my-16 w-full'}>
                  <div className={smallScreen ? "flex flex-col justify-start mt-5 w-3/5" : "flex flex-col justify-start mt-5 w-full mb-12"}>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 font-semibold"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[11].td_titulo : ''}
                    </Typography>
                    <Typography
                      style={{ color: "#4C647A" }}
                      className="text-14 mr-28"
                    >
                      {listadoAnexosRight.length > 0 ? listadoAnexosRight[11].td_descripcion : ''}
                    </Typography>
                  </div>
                  <div className={smallScreen ? "w-2/5" : 'w-full'}>
                    <CustomUploadAnexo
                      value={fileArrayList.minerofactibilidad}
                      handleUploadDelete={handleUploadDelete}
                      handleUploadChange={(e) => handleUploadChange(e, listadoAnexosRight[11].id_doc, 'minerofactibilidad')}
                      disabled={checkedTable !== 5}
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
