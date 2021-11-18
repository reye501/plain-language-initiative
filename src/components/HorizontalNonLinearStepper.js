// dependencies
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {Editor1, Editor2, Editor3, Editor4, Editor5, Editor6} from './specific_editors/Editor1';
// import custom_theme, { stepperStyles } from '../utility/Theme';
import ExpandPanel from './ExpandPanel';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CustomizedButton from './CustomizedButton';

import '../styles/Stepper.css';

const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing.unit,
    color: "#2D6A4F !important"
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  stepIconRoot: {
    color: "grey !important",
  },
  stepIconActive: {
    color: "#2D6A4F !important",
  },
  editor: {
    minHeight: '60vh'
  },
  questionBorder: {
    backgroundColor: '#2D6A4F'
  }
});

function getSteps() {
  return ['When and where?', 'Why was this conducted?', 'Who participated?', 'What happened?', 'What were the problems?', 'Comments?'];
}

function getInstruction(step) {
  switch (step) {
    case 0:
      return "The study took place in X state(s)/country/countries. Participants were in this study for X amount of time. The study started in X month, Y year and ended in X month, Y year.";
    case 1:
      return "Suggestions: For example, was this trial conducted to look for a better treatment over existing ones? Did this trial want to examine the product’s safety in humans and any possible medical problems?";
    case 2:
      return "Note: For EU regulation, list the number of subjects included in the trial in the Member State concerned, in the Union and in third countries. For FDA/U.S. regulation, list the country/countries (or state(s)) where trials were held. Also list age group breakdown and gender breakdown, and inclusion and exclusion criteria. Inclusion and exclusion criteria should be the most important and relevant ones (5 or less). Additionally, any technical criteria should not be included if the participant would not likely be familiar with. Include if there were any direct benefits to participation.";
    case 3:
      return "Note: Avoid using language such as “better than” or “worse than”. Focus on reporting primary endpoints and any secondary endpoints that are relevant to the participants and able to be understood by them. If available, include and explain quality of life results.";
    case 4:
      return "Take information from the pg. 7 “Risks and Discomforts” subsection of the “Detailed Information” section. Add new information from the trial where necessary. Avoid using percentages or fractions. Instead, statements like “one in three people”.";
    case 5:
      return "Suggestions: Include statement that discloses that these results are only from a single trial and that different results may arise from different or future trials.";

  }
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Step 1: Where and when was the trial conducted?";
    case 1:
      return "Step 2: What questions did this research want to answer? Why was this research conducted?";
    case 2:
      return "Step 3: Who participated in the study?";
    case 3:
      return "Step 4: What happened during the study? What were the results of the study?";
    case 4:
      return "Step 5: What medical problems did participants have and how often did they have them?"
    case 5:
      return "Step 6: Comments on Trial Results. How has this trial helped patients and researchers?"
    default:
      return "Unknown step";
  }
}

function getNewEditor(step) {
  console.log(step);
  switch (step) {
    case 0:
      return <Editor1 order={step + 1} q_default="Hello 1" id="question-1" className={"Researchers-input"} />
    case 1:
      return <Editor2 order={step + 1} q_default="Hello 2" id="question-2" className={"Researchers-input"} />
    case 2:
      return <Editor3 order={step + 1} q_default="Hello 3" id="question-3" className={"Researchers-input"} />
    case 3:
      return <Editor4 order={step + 1} q_default="Hello 4" id="question-4" className={"Researchers-input"} />
    case 4:
      return <Editor5 order={step + 1} q_default="Hello 5" id="question-5" className={"Researchers-input"} />
    case 5:
      return <Editor6 order={step + 1} q_default="Hello 6" id="question-6" className={"Researchers-input"} />
  }
}

class HorizontalNonLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    completed: {}
  };

  totalSteps = () => {
    return getSteps().length;
  };

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {}
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper className="Stepper" nonLinear alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  <StepLabel
                    StepIconProps={{ 
                      classes: { 
                        root: classes.stepIconRoot,
                        active: classes.stepIconActive,
                      } 
                    }}
                  >
                    {label}
                  </StepLabel>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>

        <div>
          {this.allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <CustomizedButton onClick={this.handleReset}>Reset</CustomizedButton>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ExpandPanel summary={getStepContent(activeStep)} details={getInstruction(activeStep)}/>
              {getNewEditor(activeStep)}

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <CustomizedButton
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </CustomizedButton>
                <Box sx={{ flex: '1 1 auto' }} />
                  <CustomizedButton className="Next-button" onClick={this.handleNext} sx={{ mr: 1 }}>
                    Next
                  </CustomizedButton>

                  {activeStep !== steps.length &&
                    (this.state.completed[this.state.activeStep] ? (
                      <Typography variant="subtitle1" className="Complete-box">
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <CustomizedButton onClick={this.handleComplete}>
                        {this.completedSteps() === this.totalSteps() - 1
                          ? 'Finish'
                          : 'Complete Step'}
                      </CustomizedButton>
                    ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

HorizontalNonLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalNonLinearStepper);
