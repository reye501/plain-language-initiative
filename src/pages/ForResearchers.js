import HorizontalNonLinearStepper from '../components/HorizontalNonLinearStepper';
import Typography from '@mui/material/Typography';
import '../styles/ForResearchers.css';
import CustomizedTypo from '../components/CustomizedTypo';

export default function ForResearchers()
{
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
            <CustomizedTypo className="Title-name" style={{marginBottom: "5vh"}}>
                For Researchers: How to Write in Plain Language
            </CustomizedTypo>
            <HorizontalNonLinearStepper/>
        </div>     
    );
}