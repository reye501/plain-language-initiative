import { withStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';

const CustomizedTypo = withStyles({
    root: {
        fontSize: "calc( 12px + (20 - 12) * (100vw - 400px) / (800 - 400) ) !important"
    }
  })(Typography);

export default CustomizedTypo;