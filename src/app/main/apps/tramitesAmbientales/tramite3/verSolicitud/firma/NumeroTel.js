import React  from "react";
import { Typography } from "@mui/material";
import CustomTextField from "@components/CustomTextField";
import CustomButton from "@components/CustomButton";

const NumeroTel = (props) => {
    const {
        formFirma,
        changeNumber
    } = props;
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between border-1 border-primaryBlack rounded-t-8 p-28 w-full items-center">
                <div>
                    <Typography
                        className="font-bold text-14"
                        style={{ color: "#4C647A" }}
                    >
                        Ingresa tu número de celular
                    </Typography>
                </div>
            </div>
            <div className="flex flex-col  border-1 border-primaryBlack rounded-b-8 p-28 w-full items-center h-full">
                <Typography style={{ color: '#647F97' }}>Enviaremos un código de confirmación
                    <span className="font-bold"> vía mensaje SMS a tu número de teléfono y un email </span>
                    para confirmar que eres tú.</Typography>
                <div className="flex sm:flex-row flex-col justify-between my-32">
                    <div className="flex">
                        <div
                            className="w-56 h-56 rounded-8 flex justify-center items-center mx-8"
                            style={{ border: "1px solid #BDD7EF", background: "#F9FCFF" }}
                        >
                            <p className="text-primaryBlack text-16">+57</p>
                        </div>
                        <div className="mx-8">
                            <CustomTextField
                                label="Número de teléfono"
                                maxLenght="10"
                                name="phone"
                                value={formFirma.telefono}
                                onChange={changeNumber('telefono')}
                            />
                        </div>
                    </div>
                    <div className="sm:mx-8 flex justify-center sm:mt-0 mt-12">
                        <CustomButton
                            label='Enviar código'
                            className='secondary'
                            height='large'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumeroTel;
