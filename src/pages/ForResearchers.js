import HorizontalNonLinearStepper from '../components/HorizontalNonLinearStepper';
import Typography from '@mui/material/Typography';
import '../styles/ForResearchers.css';

export default function ForResearchers()
{
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
            <Typography className="Title-name" variant="h2" style={{marginBottom: "10vh"}}>
                For Researchers: How to Write in Plain Language
            </Typography>
            <HorizontalNonLinearStepper/>
        </div>     
    );
}