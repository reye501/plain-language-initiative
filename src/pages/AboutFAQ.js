import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ForResearchers from './ForResearchers';
import '../styles/Home.css';

export default function Home() {
    return(
        <div>
            <div className="header">
                <div className="logo"> 
                    <h1><a>Plain Language Summaries</a></h1> 
                </div>

                <Router>
                    <ul className="nav-list" style={{display: 'flex', flexDirection: 'column'}}>
                        <Link className="link" to="/">Home</Link>
                        <Link className="link" to="/researchers">Researchers</Link>
                    </ul>

                    <div style={{height: '200px'}}>
                    </div>

                    <Switch>
                        <Route path="/researchers">
                            <ForResearchers/>
                        </Route>
                    </Switch>
                </Router>
            </div>

            <div className="about-faq">
                <div className="about-faq-items">
                    <h2>About and FAQ</h2>
                    <h3>Why I created this site</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsam facere omnis maxime, recusandae aliquam cupiditate illo assumenda dolores modi laboriosam veniam ex, autem suscipit rem impedit a. Saepe enim architecto aliquid accusantium facilis libero, numquam amet eaque eligendi eius porro sequi at unde ipsam necessitatibus illum deleniti ullam nam reprehenderit sit, voluptatibus quasi exercitationem alias. Natus aut optio obcaecati numquam inventore sint odio, itaque quibusdam debitis molestias voluptatem labore.</p>
                    <h3>Why are plain language summaries necessary? What are the incentives?</h3>
                    <p>Plain language summaries fulfill the ethical obligation set forth by documents such as the Belmont Report, the Declaration of Helsinki, and the Final Rule. These clinical research guidelines outline the duty researchers have to be transparent towards human research subjects and conduct research in a mutually beneficial way. If participants are willing to make sacrifices to participate in your study, then they have a right to review what happened during the study. Incentives for producing plain language summaries include participants feeling more respected and appreciated, better, more positive attitudes towards clinical research, and helping to make the development process for plain language summaries more efficient in the future. </p>
                    <h3>Won’t this cost a lot of time/funding/resources?</h3>
                    <p>Initially, the production of plain language summaries may seem to be an extra burden for the clinical research process. The point of templates such as this one is to make the development process as simple, user-friendly, and use the least amount of time, funding, or resources as possible. However, because plain language summaries are not currently ubiquitous, the process may be more onerous at first. As time goes on and future iterations of this template are developed time, funding, and resources will be less of a concern.</p>
                    <h3>How should I deliver the plain language summary to participants?</h3>
                    <p>Plain language summaries can be delivered in person such as at the study site, online through patient portals, or by email with a link to the summary page. Delivering the summary in person may allow participant-investigator discussion that can promote engagement and understanding in both parties. It is also important to note that some results may be negatively received by participants. Therefore, while it is important to emphasize the availability of these summaries, also acknowledge that some participants may not wish to view them.</p>
                    <h3>How do I ensure that the study is accurately represented and avoid bias and misinterpretation?</h3>
                    <p>For example, the efficacy results may be summarized by saying that treatment with the study drug was efficacious (because the primary endpoint showed a highly significant difference to placebo/comparator). Similarly, the overall result of the different safety analyses may be summarized by ‘no critical safety issues could be identified’. The terms that need to be used for generalizing statements (‘showed efficacy’, ‘raised no safety concerns’) are more comprehensive and hence open to misinterpretation. The need to use generalizing terms may lead to legal issues because such statements could be perceived as being promotional. It might be for this reason that most of the lay summaries that are currently available on the internet (November 2014) do not contain a summarizing or concluding statement. For the writer, the task is providing a high-level summary that does not overstate results. Therefore, the extent of comments on the outcome of the trial has to be considered carefully. (Transferring regulation into practice: The challenges of the new layperson summary of clinical trial results). Also mention that these results are only the results of one trial and different trials may have different results. Any healthcare . Any secondary endpoints relating to the primary endpoints.</p>
                    <h3>I’ve never written in plain language before. Where do I start? What do I need to know? Where can I go for more help?</h3>
                    <p>Writing for a non-academic, general audience can be tricky at first. As the U.S. Food and Drug Administration puts it, “Plain language, also known sometimes as ‘plain English’ is writing in a way that helps readers understand the content in a document the first time they read it”. This includes:</p> 
                    <ul className="tips">
                        <li>Identifying your audience and the point you’re trying to make</li>
                        <li>Putting the most important point at the beginning</li>
                        <li>Using common, easily understood words</li>
                        <li>Using only technical terms when necessary, and make certain you’ve explain their meaning</li>
                        <li>Using active verbs and personal pronouns</li>
                        <li>Using bullets, tables, and other design features that break up the text and add visual interest</li>
                        <li>Using short sentences and paragraphs (Sentences should average 15-20 words)</li>
                        <li>Using acronyms and abbreviations sparingly </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}