import React, { useState } from 'react';
import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const InfoAlerta = (props) => {
    return (
        <div className='w-full ' >
            <Typography className='font-bold text-14 mb-16' style={{ color: '#4C647A' }}>Documentación por anexar*</Typography>
            <div className="flex flex-col border-1 rounded-8 p-28" style={{backgroundColor:'#FFF6D6', borderColor:'#FCC500'}}>
                <div className='flex mb-8'>
            <WarningIcon style={{color:'#FCC500'}}/>
            <Typography className='mx-8 font-semibold mt-2' style={{color:'#364A5D'}}>Información a tener en cuenta para adjuntar archivos</Typography>
                </div>
                <ol className='list-disc ml-20'>
                    <li>Los tipos de archivos soportados son los siguientes: PDF, Documentos de word (.doc), Hojas de cálculo (.xlsx) e Imágenes (.png y .jpg)</li>
                    <li>Los archivos que adjuntes no deben superar los 5MB</li>
                    <li>Puedes adjuntar hasta 10 archivos por campo</li>
                </ol>
            </div>
        </div>
    )
}

export default InfoAlerta
