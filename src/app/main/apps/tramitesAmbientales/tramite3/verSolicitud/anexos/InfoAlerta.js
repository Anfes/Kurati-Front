import React from 'react';
import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const InfoAlerta = (props) => {
    const {statusAnexos} = props;
    return (
        <div className='w-full ' >
{statusAnexos === 1 ?
            <div className="flex flex-col border-1 rounded-8 p-28 mb-16" style={{ backgroundColor: '#FFEDED', borderColor: '#FF4D4D' }}>
                <div className='flex mb-8'>
                    <WarningIcon style={{ color: '#FF4D4D' }} />
                    <Typography className='font-bold mt-2' style={{ color: '#364A5D' }}>La autoridad competente CORTOLIMA, te han enviado unos requerimientos a corregir:</Typography>
                </div>
                <div>
                    <Typography className='font-bold mt-2' style={{ color: '#364A5D' }}>Observación o requerimientos a corregir</Typography>
                    <Typography>
                        Se requiere que cambie los documentos definidos a continuacion lorem ipsum sit amet..... (Si en el mensaje anterior, le piden documentos adicionales, adjuntarlos en la la sección de: Documentos adicionales requeridos )
                    </Typography>
                </div>
                <Typography className='font-bold mt-2' style={{ color: '#364A5D' }}>
                    Documentos con observaciones para actualizar:
                </Typography>
                <ol className='list-disc ml-20 mx-8 '>
                    <li>
                        <span className='font-semibold' style={{ color: '#364A5D' }}>Sociedades: </span>
                        Se debe poner el documento al 150%
                    </li>
                    <li>
                       <span className='font-semibold' style={{ color: '#364A5D' }}>Tenedor: </span>
                        Debe ingresar...
                    </li>
                </ol>
            </div>
            :null}
            <div>
                <div className="flex flex-col border-1 rounded-8 p-28" style={{ backgroundColor: '#FFF6D6', borderColor: '#FCC500' }}>
                    <div className='flex mb-8'>
                        <WarningIcon style={{ color: '#FCC500' }} />
                        <Typography className='mx-8 font-bold mt-2' style={{ color: '#364A5D' }}>Información a tener en cuenta para adjuntar archivos</Typography>
                    </div>
                    <ol className='list-disc ml-20'>
                        <li>Los tipos de archivos soportados son los siguientes: PDF, Documentos de word (.doc), Hojas de cálculo (.xlsx) e Imágenes (.png y .jpg)</li>
                        <li>Los archivos que adjuntes no deben superar los 5MB</li>
                        <li>Puedes adjuntar hasta 10 archivos por campo</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default InfoAlerta
