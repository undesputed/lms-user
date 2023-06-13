import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BasicInformationForm from './BasicInfoForm';
import LabTestForm from './LabTestForm';
import FinalForm from './LastForm';
import { StepperType } from './types.d';

const steps = [
  {
    label: 'Patient Basic Information',
    form: BasicInformationForm
  },
  {
    label: 'Select Laboratory Tests',
    form: LabTestForm
  },
  {
    label: 'Finish',
    form: FinalForm
  }
];

const RequestFormStepper: React.FC<StepperType> = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const CurrentForm = steps[activeStep].form;

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <CurrentForm
                subCategory={props.subCategory}
                length={steps?.length}
                index={index}
                handleNext={handleNext}
                handleBack={handleBack}
                handleOnChange={props.handleOnChange}
                handleFinish={props.handleFinish}
                handleSubcategoryChange={props.handleSubcategoryChange}
                category={props.category}
                handleSelectCat={props.handleSelectCat}
                handleSubmit={props.handleSubmit}
                selected={props.selected}
                onDelete={props.onDelete}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps?.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default RequestFormStepper;
