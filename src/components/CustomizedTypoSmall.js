import { withStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';

const CustomizedTypoSmall = withStyles({
    root: {
        fontSize: "calc( 8px + (12 - 8) * (100vw - 400px) / (800 - 400) ) !important"
    }
  })(Typography);

export default CustomizedTypoSmall;