import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useHistory } from 'react-router-dom';

import { IconButton, Breadcrumbs, Link, Dialog, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomStepper from '@components/CustomStepper';
// import reducer from '../store';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import CustomButton from '@components/CustomButton';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { DocumentIcon } from '@components/FuseSvgIcon';
import CustomTextField from '@components/CustomTextField';
import CustomToggleButtons from '@components/CustomToggleButtons';
import CustomDocumentsList from "@components/CustomDocumentsList";
import CustomCheckBox from "@components/CustomCheckBox";

const data = [
    {
        id: '1',
        name_doc: 'Formato único nacional',
        dosc: [
            {
                link_doc: 'http://www.africau.edu/images/default/sample.pdf',
                id: '20'
            }
        ],
        description: 'Formato unificado único nacional',
        correct: '',
        observation: '',
        estado: 1,
        fecha: '25 de Febrero de 2022 (3:00pm)',
    },
    {
        id: '2',
        name_doc: 'Documento identidad del Solicitante principal',
        dosc: [
            {
                link_doc: 'http://www.africau.edu/images/default/sample.pdf',
                id: '205'
            },
            {
                link_doc: 'http://www.africau.edu/images/default/sample.pdf',
                id: '207'
            },
            {
                link_doc: 'http://www.africau.edu/images/default/sample.pdf',
                id: '209'
            },
            {
                link_doc: 'http://www.africau.edu/images/default/sample.pdf',
                id: '2000'
            },
        ],
        description: 'Documento de identidad del solicitante principal del trámite. Foto al 150%',
        correct: '',
        observation: '',
        estado: 2,
        fecha: '25 de Febrero de 2022 (3:00pm)',
    },
    {
        id: '3',
        name_doc: 'Documento identidad del Solicitante principal',
        dosc: [
            {
                link_doc: 'http://www.africau.edu/images/default/sample.pdf',
                id: '202'
            },
            {
                link_doc: 'http://www.africau.edu/images/default/sample.pdf',
                id: '203'
            },
            {
                link_doc: 'http://www.africau.edu/images/default/sample.pdf',
                id: '204'
            },
        ],
        description: 'Documento de identidad del solicitante principal del trámite. Foto al 150%',
        correct: '',
        observation: '',
        estado: 3,
        fecha: '25 de Febrero de 2022 (3:00pm)',
    },
]

const useStyles = makeStyles(() => ({
    headContain: {
        minHeight: 100,
        backgroundColor: '#EEF7FF',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 24
    },
    indicadorEtapa: {
        border: '1px solid rgba(58, 134, 201, 0.61)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 13,
        borderRadius: 16,
        color: '#2E7EC5',
        fontWeight: 600
    },
    infoContainer: {
        marginTop: 12,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 8,
        border: '1px solid #D1E3F5',
        padding: 10,
    },

    boxInfoStatus: {
        maxWidth: 288,
        minWidth: 285,
        height: 56,
        borderRadius: 16,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30
    }
}));

const Evaluacion = () => {
    const classes = useStyles();
    const [motivo, setMotivo] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [idIncorrect, setIdIncorrect] = useState('');
    const [dataDocs, setDataDocs] = useState(data);
    // console.log("🚀 ~ file: firstStep.js ~ line 111 ~ FirstStep ~ dataDocs", dataDocs)
    const [errorEmpty, setErrorEmpty] = useState(false);

    const closeDialog = () => {
        if (motivo === '') {
            const newData = dataDocs.map((e, i) => ({ ...e, correct: e.id === idIncorrect ? '' : e.correct }))
            setDataDocs(newData)
            setOpenDialog(false)
        }
    }

    const incorretDocument = (idItem) => () => {
        const newData = dataDocs.map((e, i) => ({ ...e, correct: e.id === idItem ? false : e.correct }))
        setDataDocs(newData)
        setOpenDialog(true)
        setIdIncorrect(idItem)
    }

    const corretDocument = (idItem) => () => {
        const newData = dataDocs.map((e, i) => ({ ...e, correct: e.id === idItem ? true : e.correct }))
        setDataDocs(newData)
    }

    const guardarMotivo = (e) => {
        if (motivo === '') {
            setErrorEmpty(true)
        } else {
            const newData = dataDocs.map((e, i) => ({ ...e, observation: e.id === idIncorrect ? motivo : e.observation }))
            setDataDocs(newData)
            setOpenDialog(false)
            setMotivo('')
        }
    }



    return (
        <div>
            <div className={classes.headContain}>
                <div className='flex w-full mx-10  justify-between'>
                    <div className='flex'>
                        <IconButton
                            style={{ backgroundColor: '#023E73', height: 24, width: 24 }}
                            onClick={() => { history.push('/solicitudes') }}
                        >
                            <ArrowBackIosRoundedIcon style={{ color: '#4FDFC8', fontSize: 15 }} />
                        </IconButton>
                        <div className='flex ml-12 flex-col'>
                            <p className='text-primaryBlack font-semibold'>
                                ID de solicitud:
                            </p>
                            <p className='text-primary font-semibold text-18'>
                                Radicado
                            </p>
                        </div>
                    </div>
                    <div>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                            <Link href="/" style={{ color: '#023E73' }}> Inicio </Link>
                            <Link href="/solicitudes" style={{ color: '#023E73' }}>
                                Solicitudes
                            </Link>
                            <p style={{ color: '#023E73' }}>Radicado</p>
                        </Breadcrumbs>
                        <div className={classes.indicadorEtapa}>
                            Evaluación - Radicado
                        </div>
                    </div>

                </div>
            </div>
            <div className={clsx(classes.infoContainer, 'flex flex-col md:flex-row justify-between md:items-center')}>
                <div className='flex flex-col'>
                    <p className='text-18 font-bold text-primary'> Trámite: </p>
                    <p className='text-16 font-bold mb-12' style={{ color: '#2E7EC5' }}>
                        Concesión de aguas superficiales
                    </p>
                    <p className='text-14 font-bold text-primary'>
                        Fecha Solicitud:
                    </p>
                    <p className='text-14 font-bold mb-12' style={{ color: '#2E7EC5' }}>
                        2022-01-01 (02:00pm)
                    </p>
                </div>
                <div className='flex flex-col items-start md:items-end'>
                    <p className='text-18 font-bold text-primary'>
                        Radicado #
                    </p>
                    <p className='text-16 font-bold mb-12' style={{ color: '#2E7EC5' }}>
                        23
                    </p>
                    <p className='text-14 font-bold text-primary'>
                        Solicitante :
                    </p>
                    <p className='text-14 font-bold mb-12' style={{ color: '#2E7EC5' }}>
                        Carlos Andrés Salcedo - C.C. 16838483
                    </p>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className={clsx(classes.infoContainer, 'max-h-450 overflow-auto')}>
                    <div className="flex justify-between m-16">
                        <p className="font-bold text-16 text-primaryDark">
                            Checkeo de documentos :
                        </p>
                        <p className="text-center text-14 font-500">
                            ¿Documento correcto y <br />
                            verificado?
                        </p>
                    </div>
                    <Dialog open={openDialog}>
                        <div className='flex flex-col items-center lg:min-w-512 min-h-200 py-14 px-20'>
                            <div className='flex justify-between items-center w-full m-12'>
                                <p className='text-red font-bold text-16'>
                                    Ingresa el motivo de rechazo del documento:
                                </p>
                                <IconButton onClick={closeDialog}>
                                    <CloseRoundedIcon style={{ color: '#023E73' }} />
                                </IconButton>
                            </div>
                            <div className='w-full m-12'>
                                <CustomTextField
                                    multiline={true}
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                    rows={5}
                                    label='Motivo'
                                    name='motivo'
                                    error={motivo === '' ? errorEmpty : false}
                                />
                            </div>
                            <div className='my-20 w-full flex justify-end'>
                                <CustomButton
                                    label='Guardar'
                                    className='primary'
                                    height='large'
                                    onClick={guardarMotivo}
                                    disabled={motivo === '' ? true : false}
                                />
                            </div>
                        </div>
                    </Dialog>
                    {dataDocs.map((e, i) => {
                        return (
                            <CustomDocumentsList
                                title={e.name_doc}
                                key={i}
                                description={e.description}
                                content={
                                    <div className='flex items-center'>
                                        <div
                                            className={classes.boxInfoStatus}
                                            style={{
                                                background: e.estado === 1 ? '#0F9D8736' : e.estado === 2 ? '#FFF6D6' : '#FFEDED',
                                                color: e.estado === 3 ? '#FF4D4D' : '#1F161E'
                                            }}
                                        >
                                            <p className='text-12 font-500'>
                                                {e.estado === 1 ? '(APROBADO)' : e.estado === 2 ? '(CORREGIDO)' : '(DEVUELTO)'}
                                            </p>
                                            <p className='text-11 font-700'>
                                                {e.estado === 1 ? 'Funcionario validó correctamente el documento' :
                                                    e.estado === 2 ? ' El usuario actualizó el documento' : ' Se solicitó corrección al usuario'}
                                            </p>
                                            <p className='text-11'>
                                                {e.fecha}
                                            </p>
                                        </div>
                                        <CustomToggleButtons
                                            selectedRight={e.correct !== '' && e.correct}
                                            selectedLeft={e.correct !== '' && !e.correct}
                                            close={incorretDocument(e.id)}
                                            open={corretDocument(e.id)}
                                        />
                                    </div>
                                }
                                documents={
                                    e.dosc.map(doc => {
                                        return (
                                            <IconButton
                                                target='_blank'
                                                href={doc.link_doc}
                                                style={{ background: '#F9FCFF', borderBottom: 'none', marginLeft: 10 }}
                                                key={doc.id}
                                            >
                                                <DocumentIcon
                                                    fill='#023E73'
                                                    height='40'
                                                    width='40'
                                                />
                                            </IconButton>
                                        )
                                    })
                                }
                            />
                        )
                    })}
                </div>
                <div className="flex mx-32 my-12">
                    <div className="w-4/5">
                        <CustomTextField
                            label='Requirmientos u observaciones adicionales'
                            multiline
                        />
                    </div>
                    <div className="flex flex-col w-1/5 items-center">
                        <Typography>
                            ¿Requiere algún documento adicional?
                        </Typography>
                        <div className="flex mt-12">
                            <div className="mx-12">
                                <CustomCheckBox
                                    label='Si'
                                    rounded
                                />
                            </div>
                            <div className="mx-12">
                                <CustomCheckBox
                                    label='No'
                                    rounded
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end my-20 px-32">
                    <div className='w-256 mr-12'>
                        <CustomButton
                            label='Enviar Requerimientos al usuario'
                            className='error'
                            height='medium'
                            width='full'
                        />
                    </div>
                    <div className='w-216'>
                        <CustomButton
                            label='Crear Expediente'
                            className='primary'
                            height='medium'
                            width='full'
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Evaluacion