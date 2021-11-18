import React from "react";
import '../styles/Home.css';
import CustomizedTypo from '../components/CustomizedTypo';
import CustomizedTypoSmall from '../components/CustomizedTypoSmall';
import CustomizedButton2 from '../components/CustomizedButton2';

export default function Home() {
    return(
        <div>
            <div className="researcher-content">
                <div className="research-content-container-intro">
                    <CustomizedTypo variant="h5" className="research-headers">What a Plain Language Summary is and Why They are Necessary</CustomizedTypo>
                    <CustomizedTypoSmall>A plain language summary is as the name implies, a summary for clinical trial results written in a comprehensible manner for the audience. When one pictures clinical trial results, such as those found on{<a id="body-links" href="https://clinicaltrials.gov/ct2/home">ClinicalTrials.gov</a>}, they can imagine a lenghty document with small font and single point spacing. It is filled with scientific language and complex figures or tables, such as the image shown below.</CustomizedTypoSmall>
                
                    <img src="CT.GOV.png" alt="Image of ClinicalTrials.gov Website Clinical Trial Results"/>
                    
                    <CustomizedTypoSmall>To someone who is not constantly dealing with other professionals talking at the same comprehension level, with the similar educational backgrounds, this can be daunting. Likewise, because researchers are so accustomed to presenting results relevant to their level of understanding, writing in plain language can prove to be equally as difficult. As a result, many participants not only walk away from trials not understanding results, but also researchers fail to respect their sacrifice in participating. Drug development would be impossible without the sacrifice of participants, and therefore it is our obligation to inform them of what resulted from their participation. This is where plain language summaries, and this website, come in. The goal of this site is two-fold.</CustomizedTypoSmall>
                    <ul>
                        <CustomizedTypoSmall> To help both researchers and participants understand the need for plain language summaries in clinical research </CustomizedTypoSmall>
                        <CustomizedTypoSmall>To help researchers write plain language summaries for participants to give feedback on.</CustomizedTypoSmall>
                    </ul>
                    <CustomizedTypo variant="h5" className="research-headers">How to Write a Plain Language Summary</CustomizedTypo>
                    <CustomizedTypoSmall>
                        The following interactive page will walk you through the entire process of building a plain language summary. Each section of the plain language summary will be broken down and include tips, suggestions, and prompts for how to write in plain language. 
                    </CustomizedTypoSmall>
                    <CustomizedButton2 className="write-button">
                        Click Here to Begin Writing
                    </CustomizedButton2>
                </div>
            </div>
        </div>
    );
}