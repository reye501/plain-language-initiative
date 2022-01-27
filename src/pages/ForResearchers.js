import HorizontalNonLinearStepper from '../components/HorizontalNonLinearStepper';
import '../styles/ForResearchers.css';
import CustomizedTypo from '../components/CustomizedTypo';
import TextField from '@mui/material/TextField';

export default function ForResearchers()
{
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw', height: 'auto'}}>
            <CustomizedTypo className="Title-name" style={{marginBottom: '5vh'}}>
                For Researchers: How to Write in Plain Language
            </CustomizedTypo>
            <div className="Research-textfields" style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',  marginBottom: '5vh'}}>
                <TextField
                    required
                    label="Research Title"
                    id="research-name"
                    style={{width: '30%', marginBottom: '20px'}}
                />
                <TextField
                    required
                    label="Authors"
                    id="research-authors"
                    style={{width: '30%', marginBottom: '20px'}}
                />
                <TextField
                    required
                    label="Institution"
                    id="research-institution"
                    style={{width: '30%', marginBottom: '20px'}}
                />
            </div>
            <HorizontalNonLinearStepper/>
        </div>     
    );
}