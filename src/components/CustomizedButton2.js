import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const CustomizedButton2 = withStyles({
    root: {
        textTransform: "capitalize",
        color: "white",
        background: "#2D6A4F",
        fontSize: "calc( 12px + (16 - 12) * (100vw - 400px) / (800 - 400) )"
    }
  })(Button);

export default CustomizedButton2;