import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import CustomAccordion from '@components/CustomAccordion';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CheckIcon from '@mui/icons-material/Check';
import { DocumentIcon } from '@components/FuseSvgIcon';
import { IconButton } from '@mui/material';

const useStyles = makeStyles(() => ({
  continerTitle: {
    backgroundColor: '#CDFFF7',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}));

export default function Solicitud() {
  const classes = useStyles();
  return (
    <div>
      <div className="mb-4">
        <CustomAccordion
          title="Revisión Documental"
          section="Solicitud"
          content={
            <div>
              <Timeline position="alternate">
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                    style={{
                      maxWidth: 150,
                      padding: 0,
                      display: 'flex',
                      marginTop: 18,
                    }}
                  >
                    <div>
                      <Typography style={{ color: '#9DB8D1' }} className="font-semibold">
                        12 de Octubre 2021
                      </Typography>
                      <Typography style={{ color: '#9DB8D1' }}>12:59 pm</Typography>
                    </div>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot style={{ backgroundColor: '#EEF7FF' }}>
                      <CheckIcon style={{ color: '#B2DBFF' }} className="text-16" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <div>
                      <Typography style={{ color: '#2E7EC5' }} className="font-semibold mb-4">
                        Documentación aprobada
                      </Typography>
                      <Typography style={{ color: '#4C647A' }}>
                        <span style={{ color: '#1A796A' }}>Solicitante:</span> Victor Cuervo - C.C.
                        15788778
                      </Typography>
                      <Typography style={{ color: '#4C647A' }} className="mb-4">
                        <span style={{ color: '#1A796A' }}>Aprobado por: </span> Juan Carlos Toro
                        (Jurídico)
                      </Typography>
                      <Typography style={{ color: '#2E7EC5' }} className="mb-4">
                        Documentos anexados y aprobados:
                      </Typography>
                      <div
                        className="p-4"
                        style={{
                          border: '1px solid #D1E3F5',
                          boxSizing: 'border-box',
                          borderRadius: 8,
                          maxHeight: 178,
                          overflowY: 'auto',
                        }}
                      >
                        <div>
                          <Typography style={{ color: '#145C9C' }} className="text-12">
                            Detalles de las obras
                          </Typography>
                          <div
                            style={{ backgroundColor: '#E4E4E4', border: '1px solid #E4E4E4' }}
                          />
                          <div className="flex">
                            <IconButton
                              target="_blank"
                              href="http://www.africau.edu/images/default/sample.pdf"
                              style={{ background: '#fff', borderBottom: 'none', marginLeft: 10 }}
                            >
                              <DocumentIcon fill="#9DB8D1" height="20" width="20" />
                            </IconButton>
                          </div>
                        </div>
                        <div>
                          <Typography style={{ color: '#145C9C', marginLeft: 10 }} className="text-12">
                            Detalles de las obras
                          </Typography>
                          <div
                            style={{ backgroundColor: '#E4E4E4', border: '1px solid #E4E4E4' }}
                          />
                          <div className="flex">
                            <IconButton
                              target="_blank"
                              href="http://www.africau.edu/images/default/sample.pdf"
                              style={{ background: '#fff', borderBottom: 'none', marginLeft: 10 }}
                            >
                              <DocumentIcon fill="#9DB8D1" height="20" width="20" />
                            </IconButton>
                          </div>
                        </div>
                        <div>
                          <Typography style={{ color: '#145C9C' }} className="text-12">
                            Detalles de las obras
                          </Typography>
                          <div
                            style={{ backgroundColor: '#E4E4E4', border: '1px solid #E4E4E4' }}
                          />
                          <div className="flex">
                            <IconButton
                              target="_blank"
                              href="http://www.africau.edu/images/default/sample.pdf"
                              style={{ background: '#fff', borderBottom: 'none', marginLeft: 10 }}
                            >
                              <DocumentIcon fill="#9DB8D1" height="20" width="20" />
                            </IconButton>
                          </div>
                        </div>
                        <div>
                          <Typography style={{ color: '#145C9C', marginLeft: 10 }} className="text-12">
                            Detalles de las obras
                          </Typography>
                          <div
                            style={{ backgroundColor: '#E4E4E4', border: '1px solid #E4E4E4' }}
                          />
                          <div className="flex">
                            <IconButton
                              target="_blank"
                              href="http://www.africau.edu/images/default/sample.pdf"
                              style={{ background: '#fff', borderBottom: 'none', marginLeft: 10 }}
                            >
                              <DocumentIcon fill="#9DB8D1" height="20" width="20" />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </div>
          }
        />
      </div>
      <div className="mb-4">
        <CustomAccordion
          title="Concepto"
          section="Solicitud"
          content={
            <div>
              <div className="w-full flex text-right justify-end">
                <Typography style={{ color: '#145C9C' }} className="text-10 font-semibold">
                  Creador: Andrea Echeverry (Planificación Ambiental)
                  <br />
                  25 Febrero de 2022 (2:00 pm)
                </Typography>
              </div>
              <Typography style={{ color: '#2E7EC5' }}>Concepto de Agua: </Typography>
              <Typography style={{ color: '#4C647A' }}>
                t is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that
                it has a more-or-less normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many desktop publishing
                packages and web page editors now use L.{' '}
              </Typography>
              <br />
              <Typography style={{ color: '#2E7EC5' }}>Concepto de Suelo: </Typography>
              <Typography style={{ color: '#4C647A' }}>
                t is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that
                it has a more-or-less normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many desktop publishing
                packages and web page editors now use L.{' '}
              </Typography>

              <div className="flex ">
                <Typography style={{ color: '#2E7EC5', marginLeft: 10 }} className="w-1/4 text-right mt-8">
                  Documentos de soporte a los conceptos:
                </Typography>
                <div className="flex">
                  <div className="flex">
                    <IconButton
                      target="_blank"
                      href="http://www.africau.edu/images/default/sample.pdf"
                      style={{ background: '#fff', borderBottom: 'none', }}
                    >
                      <DocumentIcon fill="#4FDFC8" height="40" width="40" />
                    </IconButton>
                  </div>
                  <div className="flex">
                    <IconButton
                      target="_blank"
                      href="http://www.africau.edu/images/default/sample.pdf"
                      style={{ background: '#fff', borderBottom: 'none'}}
                    >
                      <DocumentIcon fill="#4FDFC8" height="40" width="40" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
      <div className="mb-4">
        <CustomAccordion
          title="Liquidación"
          section="Solicitud"
          content={
            <div>
              <div className="w-full flex text-right justify-end">
                <Typography style={{ color: '#145C9C' }} className="text-10 font-semibold">
                  Creador: Andrea Echeverry (Planificación Ambiental)
                  <br />
                  25 Febrero de 2022 (2:00 pm)
                </Typography>
              </div>
              <Typography style={{ color: '#2E7EC5' }}>Concepto de Agua: </Typography>
              <Typography style={{ color: '#4C647A' }}>
                t is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that
                it has a more-or-less normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many desktop publishing
                packages and web page editors now use L.{' '}
              </Typography>
              <div className="flex">
                <div className="mt-10 text-14 w-1/2">
                  <Typography style={{ color: '#2E7EC5', marginLeft: 10 }}>Recibo de Liquidación</Typography>
                  <div className="flex">
                    <div className="flex">
                      <IconButton
                        target="_blank"
                        href="http://www.africau.edu/images/default/sample.pdf"
                        style={{ background: '#fff', borderBottom: 'none',  }}
                      >
                        <DocumentIcon fill="#4FDFC8" height="40" width="40" />
                      </IconButton>
                    </div>
                    <div className="flex items-center">
                      <Typography style={{ color: '#145C9C' }} className="text-10 ">
                        25 Febrero de 2022 <br /> (02:00 pm)
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="mt-10 text-14 w-1/2">
                  <Typography style={{ color: '#2E7EC5', marginLeft: 10 }}>Recibo de Pago</Typography>
                  <div className="flex">
                    <div className="flex">
                      <IconButton
                        target="_blank"
                        href="http://www.africau.edu/images/default/sample.pdf"
                        style={{ background: '#fff', borderBottom: 'none', }}
                      >
                        <DocumentIcon fill="#4FDFC8" height="40" width="40" />
                      </IconButton>
                    </div>
                    <div className="flex items-center">
                      <Typography style={{ color: '#145C9C' }} className="text-10 ">
                        25 Febrero de 2022 <br /> (02:00 pm)
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
      <div className="mb-4">
        <CustomAccordion
          title="Pago"
          section="Solicitud"
          content={
            <div>
              <div className="w-full flex text-right justify-end">
                <Typography style={{ color: '#145C9C' }} className="text-10 font-semibold">
                  Creador: Andrea Echeverry (Planificación Ambiental)
                  <br />
                  25 Febrero de 2022 (2:00 pm)
                </Typography>
              </div>
              <Typography style={{ color: '#2E7EC5' }}>Concepto de Agua: </Typography>
              <Typography style={{ color: '#4C647A' }}>
                t is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that
                it has a more-or-less normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many desktop publishing
                packages and web page editors now use L.{' '}
              </Typography>
              <div className="mt-10 text-14 w-1/2">
                <Typography style={{ color: '#2E7EC5', marginLeft: 10 }}>Soporte de pago:</Typography>
                <div className="flex">
                  <div className="flex">
                    <IconButton
                      target="_blank"
                      href="http://www.africau.edu/images/default/sample.pdf"
                      style={{ background: '#fff', borderBottom: 'none', }}
                    >
                      <DocumentIcon fill="#4FDFC8" height="40" width="40" />
                    </IconButton>
                  </div>
                  <div className="flex items-center">
                    <Typography style={{ color: '#145C9C' }} className="text-10 ">
                      25 Febrero de 2022 <br /> (02:00 pm)
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
