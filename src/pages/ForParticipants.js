import '../styles/ForParticipants.css';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import CustomizedTypo from '../components/CustomizedTypo';
import CustomizedTypoSmall from '../components/CustomizedTypoSmall';
import CustomizedTypoXSmall from '../components/CustomizedTypoXSmall';
import CustomizedButton2 from '../components/CustomizedButton2';
import FeedbackRate from '../components/FeedbackRate';

export default function ForParticipants() {
    const questions = [ "How well can you understand the procedure?",
                        "Do the endpoints and outcome measures make sense?",
                        "Can you understand the adverse events and how often they occured?",
                        "Can you teach someone else about this trial?",
                    ];

    return(
        <div className="participant-main">
            <CustomizedTypo className="participant-main-title">
                For Participants: Evaluating Summaries
            </CustomizedTypo>
            
            <div className="participant-main-content">
                <div className="participant-main-content-pdf">
                    
                </div>

                <div className="participant-main-content-feedback">
                    <div className="participant-tips">
                        <div className="participant-tips-box">
                            <CustomizedTypoSmall>
                                What to look for in a summary
                            </CustomizedTypoSmall>
                            <CustomizedTypoXSmall>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo consequuntur enim earum quos voluptate aliquam quibusdam cum veniam? Repudiandae corrupti laboriosam minima voluptate nesciunt tempore fuga ut voluptates quam assumenda cum, fugit maxime doloribus accusantium totam consequatur blanditiis nulla itaque architecto. Corporis pariatur, odio mollitia sequi et earum est veritatis?
                            </CustomizedTypoXSmall>
                        </div>
                    </div>

                    <FormControl className="participant-feedback">
                        {questions.map((q) => {
                            return(
                                <div key={q}>
                                    <FeedbackRate question={q} />
                                </div>
                            )
                        })}
                        <TextField className="participant-feedback-form" multiline variant="outlined" rows={10}/>
                        <FormHelperText>Your feedback</FormHelperText>
                    </FormControl>

                    <CustomizedButton2 className="feedback-submit">
                        Submit
                    </CustomizedButton2>
                </div>
            </div>

        </div>
    );
}