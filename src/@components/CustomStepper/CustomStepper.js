import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  colorIconActive: {
    '& .MuiStepIcon-text': {
      fill: '#4FDFC8',
      fontSize: '1.4rem',
      fontWeight: 600,
    },
    '& .MuiSvgIcon-root': {
      color: '#023E73',
    },
  },

  colorIconNext: {
    '& .MuiStepIcon-text': {
      fill: '#fff',
      fontSize: '1.4rem',
      fontWeight: 600,
    },
    '& .MuiSvgIcon-root': {
      color: '#BDD7EF',
    },
  },

  colorIconReady: {
    '& .MuiSvgIcon-root': {
      color: '#023E73',
    },
  },
}));

export default function CustomStepper(props) {
  const {
    steps,
    content,
    activeStep,
    isStepOptional,
    isStepSkipped,
    handleNext,
    handleBack,
    handleSkip,
    handleReset,
  } = props;
  const classes = useStyles();

  return (
    <Box sx={{ width: '100%' }} className="">
      <Stepper activeStep={activeStep} className="px-20 py-14 overflow-scroll">
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              key={index}
              className={
                activeStep === index
                  ? classes.colorIconActive
                  : index > activeStep
                  ? classes.colorIconNext
                  : classes.colorIconReady
              }
              key={label}
              {...stepProps}
            >
              <StepLabel {...labelProps}>
                {activeStep === index ? (
                  <Typography className="text-primary font-bold text-16">{label}</Typography>
                ) : activeStep > index ? (
                  <Typography className="text-primary text-16 font-medium">{label}</Typography>
                ) : (
                  <Typography className="text-primaryBlack text-16">{label}</Typography>
                )}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          {content.map((cont, i) => {
            return <div key={i}>{activeStep === i ? cont : null}</div>;
          })}
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext} >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box> */}
        </>
      )}
    </Box>
  );
}
