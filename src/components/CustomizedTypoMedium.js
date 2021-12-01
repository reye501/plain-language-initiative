import { withStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';

const CustomizedTypoMedium = withStyles({
    root: {
        fontSize: "calc( 10px + (16 - 10) * (100vw - 400px) / (800 - 400) ) !important"
    }
  })(Typography);

export default CustomizedTypoMedium;