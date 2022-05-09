import { useSelector } from "react-redux";
import { RatingDashboard } from './Reviews';
import { useNavigate } from 'react-router-dom';

function About() {

    const navigate = useNavigate();
    const company = useSelector(state => state.company.details); 
    const reviewsSummary = useSelector(state => state.company.reviewsSummary);   
    const { name, website, industry, specialities, headquarters, overview, mission, size } = company;

    const handleClick = () => {
        navigate('reviews');
    }

    return (<>
        <div className="company-profile-section flex-col">
            <span className="large">Company Overview</span>
            <table>
                <tbody className="company-profile-details">
                    <tr>
                        <th>Website</th>
                        <td><a href={`https://${website}`}>{website}</a></td>
                    </tr>
                    <tr>
                        <th>Industry</th>
                        <td>{industry.name}</td>
                    </tr>
                    <tr>
                        <th>Company Size (Aus &amp; NZ)</th>
                        <td>{size} employees</td>
                    </tr>
                    <tr>
                        <th>Primary Location</th>
                        <td>{headquarters}</td>
                    </tr>
                    <tr>
                        <th>Specialities</th>
                        <td>{specialities.toString().replaceAll(',', ', ')}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <p>{overview}</p>
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Our mission statement</span>
            <p>{mission}</p>
        </div>
        <div className="company-profile-section flex-col">
            <div className="flex flex-ai-c flex-jc-sb">
                <span className="large">Reviews</span>
                <span className="green underline" onClick={handleClick}>See all reviews</span>
            </div>
            <RatingDashboard summary={reviewsSummary}/>
            <div>
                <span className="small">Your trust is our main concern so these ratings for Find are shared 'as is' from employees in line with our <a href="/">community guidelines</a></span>
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Featured</span>
        </div>
        <div className="company-profile-section flex-col">
            <div className="flex flex-ai-c flex-jc-sb">
                <span className="large">{name} Photos</span>
                <a href="/">See all photos</a>
            </div>
        </div>
    </>)
}

export default About;