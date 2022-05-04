import './Profile.css';
import { useState } from 'react';
import About from './About';
import Culture from './Culture';
import Jobs from './Jobs';
import Reviews from './Reviews';

function CompanyProfile() {

    const [selectedTab, setSelectedTab] = useState('about');

    const handleClick = (tab) => {
        selectedTab !== tab && setSelectedTab(tab);
    }

    return (
        <div className="company-profile">
            <div className="page">
                <div className="company-profile-section flex-col">
                    <div>
                        <img src="/mcdonalds.jpg" alt="company-logo"></img>
                    </div>
                    <div className="flex flex-row flex-jc-sb">
                        <div className="company-review-rating">
                            <span>SEEK</span>
                            <div className="flex flex-row">
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
        </div>
    )
}

export default CompanyProfile;