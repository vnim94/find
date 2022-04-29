import './Profile.css';
import { useState } from 'react';

function CompanyProfile() {

    const [selectedTab, setSelectedTab] = useState('about');

    const handleClick = (tab) => {
        selectedTab !== tab && setSelectedTab(tab);
    }

    return (
        <div className="company-profile">
            <div className="page">
                <div className="company-profile-section">
                    <div>
                        <img src="/mcdonalds.jpg" alt="company-logo"></img>
                    </div>
                    <div className="flex flex-row flex-jc-sb">
                        <div>
                            <span>SEEK</span>
                            <div className="company-review-rating flex flex-row">
                                <div className="flex flex-ai-c">
                                    {Array(4).fill().map((_, index) => { return <span key={index} className="medium material-icons-outlined">star</span> })}
                                    <span className="medium material-icons-outlined">star_half</span>
                                </div>
                                <span>4.4 total rating from <a href="/">266 reviews</a></span>
                            </div>
                        </div>
                        <div>
                            <button className="bg-white dark-green btn-outline btn">Write a review</button>
                        </div>
                    </div>
                </div>
                <div className="company-profile-tabs">
                    <ul className="">
                        <li className={`company-profile-tab ${selectedTab === 'about' && 'selected'}`} onClick={() => handleClick('about')}>About</li>
                        <li className={`company-profile-tab ${selectedTab === 'culture' && 'selected'}`} onClick={() => handleClick('culture')}>Life and Culture</li>
                        <li className={`company-profile-tab ${selectedTab === 'jobs' && 'selected'}`} onClick={() => handleClick('jobs')}>Jobs</li>
                        <li className={`company-profile-tab ${selectedTab === 'reviews' && 'selected'}`} onClick={() => handleClick('reviews')}>Reviews</li>
                    </ul>
                </div>
            </div>
            {selectedTab === 'about' && <About />}
            {selectedTab === 'culture' && <Culture />}
            {selectedTab === 'jobs' && <Jobs />}
            {selectedTab === 'reviews' && <Reviews />}
        </div>
    )
}

function About() {
    return (<>
        <div className="company-profile-section">
            <span className="large">Company Overview</span>
            <table>
                <tbody className="company-profile-details">
                    <tr>
                        <th>Website</th>
                        <td><a href="http://seek.com.au">http://seek.com.au</a></td>
                    </tr>
                    <tr>
                        <th>Industry</th>
                        <td>Advertising, Arts &amp; Media</td>
                    </tr>
                    <tr>
                        <th>Company Size (Aus &amp; NZ)</th>
                        <td>1,0001-5,000 employees</td>
                    </tr>
                    <tr>
                        <th>Primary Location</th>
                        <td>60 Cremorne St, Cremorne, VIC 3121</td>
                    </tr>
                    <tr>
                        <th>Specialities</th>
                        <td>Online Employment Classifieds, Job Boards, Education</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <p>
                    SEEK's portfolio of diverse businesses make a positive impact on a truly global scale.
                    Our purpose is to help people live more fulfilling and productive working lives and helps organisations succeed.
                    We create world-class technology solutions to connect more people to relevant employment, education, small business and volunteer opportunities.

                    We have a culture of high-performance in our workplaces and celebrate the diversity of our employees who contribute to the success of our organisation.
                </p>
            </div>
        </div>
        <div className="company-profile-section">
            <span className="large">Our mission statement</span>
            <p>We help people live more fulfilling and productive working lives and help organisations succeed.</p>
        </div>
        <div className="company-profile-section">
            <div className="flex flex-ai-c flex-jc-sb">
                <span className="large">Reviews</span>
                <a href="/">See all reviews</a>
            </div>
            <div className="flex flex-jc-sb">
                <div>average rating</div>
                <div>ratings overview</div>
                <div>salary rating %</div>
                <div>recommended %</div>
            </div>
            <div>
                <span className="small">Your trust is our main concern so these ratings for Find are shared 'as is' from employees in line with our <a href="/">community guidelines</a></span>
            </div>
        </div>
        <div className="company-profile-section">
            <span className="large">Featured</span>
        </div>
        <div className="company-profile-section">
            <div className="flex flex-ai-c flex-jc-sb">
                <span className="large">SEEK Photos</span>
                <a href="/">See all photos</a>
            </div>
        </div>
    </>)
}

function Culture() {
    return (<>
        <div className="company-profile-section">
            <span className="large">Culture and values</span>
            <div>
                <span className="medium"></span>
                <p></p>
            </div>
            <div>
                <span className="medium"></span>
                <p></p>
            </div>
            <div>
                <span className="medium"></span>
                <p></p>
            </div>
            <div>
                <span className="medium"></span>
                <p></p>
            </div>
        </div>
        <div className="company-profile-section">
            <span className="large">Perks and benefits</span>
            <Card heading="Family focus" text="14 weeks paid primary carer leave with Parental coaching program Flexible working" />
        </div>
        <div className="company-profile-section">
            <span className="large">Our approach to diversity, equity and inclusion</span>
        </div>
        <div className="company-profile-section">
            <span className="large">Gallery</span>
            <div></div>
        </div>
    </>)
}

function Card(props) {

    const { heading, text } = props;

    return (
        <div className="section-card">
            <div>
                <span className="material-icons-outlined">auto_awesome</span>
            </div>
            <div className="flex flex-col">
                <span className="medium">{heading}</span>
                <span className="grey">{text}</span>
            </div>
        </div>
    )
}

function Jobs() {
    return (<></>)
}

function Reviews() {
    return (<></>)
}

export default CompanyProfile;