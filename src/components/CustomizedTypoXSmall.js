import { withStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';

const CustomizedTypoXSmall = withStyles({
    root: {
        fontSize: "calc( 4px + (8 - 4) * (100vw - 400px) / (800 - 400) ) !important"
    }
  })(Typography);

export default CustomizedTypoXSmall;