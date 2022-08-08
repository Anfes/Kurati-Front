import { Grid, Typography } from '@mui/material';

const Singularidad = () => {
  return (
    <Grid
      container
      justifyContent="center"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #EFE8FF 100%)' }}
    >
      <Grid item xs={11} lg={10} className="mb-160">
        <div className="flex flex-col">
          <div className="flex flex-col items-center w-full mb-60">
            <Typography className="font-semibold text-20 mb-20 text-center w-1/3" color="#3C00BB">
              ¿Qué nos hace diferentes?
            </Typography>
            <Typography className="font-bold text-32 text-center w-1/3" color="#3B3F5D">
              Acceso oportuno a los mejores especialistas
            </Typography>
          </div>
          <div className="flex">
            <div className="w-1/3 flex flex-col justify-between">
              <div>
                <Typography className="font-semibold text-16 mb-16 text-right" color="#3C00BB">
                  Conexión
                </Typography>
                <Typography className="text-14 text-right" color="#6B7097">
                  Te vinculamos con los mejores especialistas para tu procedimiento de{' '}
                  <span className="font-bold">forma ágil y oportuna.</span>
                </Typography>
              </div>
              <div>
                <Typography className="font-semibold text-16 mb-16 text-right" color="#3C00BB">
                  Cobertura
                </Typography>
                <Typography className="text-14 text-right" color="#6B7097">
                  Contamos con presencia en la principales ciudades del país{' '}
                  <span className="font-bold">(Bogotá, Medellín, Cali, entre otras).</span>
                </Typography>
              </div>
            </div>
            <div className="w-1/3">
              <img
                src="/assets/images/home/img-doctora-kurati.png"
                style={{ width: '100%' }}
                alt="doc landing"
              />
            </div>
            <div className="w-1/3 flex flex-col justify-between">
              <div>
                <Typography className="font-semibold text-16 mb-16 text-left" color="#3C00BB">
                  Asesoría
                </Typography>
                <Typography className="text-14 text-left" color="#6B7097">
                  Te orientamos de en cada una de las
                  <span className="font-bold">forma personalizada</span> etapas de tu procedimiento.
                </Typography>
              </div>
              <div>
                <Typography className="font-semibold text-16 mb-16 text-left" color="#3C00BB">
                  Financiación
                </Typography>
                <Typography className="text-14 text-left" color="#6B7097">
                  <span className="font-bold">Estamos trabajando </span>
                  en ofrecerte opciones de financiación para tus procedimientos médicos.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Singularidad;
