import { withStyles, styled } from "@material-ui/core/styles";
import MuiAccordion from '@mui/material/Accordion';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

// const CustomAccordion = styled((props) => (
//     <MuiAccordion disableGutters elevation={0} {...props} />
//   ))(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     backgroundColor: "#2D6A4F",
//     color: "white",
//     marginTop: 32,
//     alignItems: "start",
//     justifyContent: "flex-start",
//     paddingLeft: 15
//   }));

const CustomAccordion = withStyles({
    root: {
        display: "flex",
        // position: "fixed",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#2D6A4F",
        color: "white",
        marginTop: 0,
        marginBottom: 0,
        alignItems: "start",
        justifyContent: "flex-start",
        paddingLeft: 15
    }
  })(Accordion);

const CustomAccordionDetails = withStyles({
    root: {
        padding: 0,
        paddingBottom: 15
    }
})(AccordionDetails);


export default function ExpandPanel({summary, details}) {
    return (
      <div>
        <CustomAccordion disableGutters disableSpacing elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> {summary} </Typography>
          </AccordionSummary>
          <CustomAccordionDetails>
            <Typography align="left" variant="subtitle2">
              {details}
            </Typography>
          </CustomAccordionDetails>
        </CustomAccordion>
    </div>
    )
}