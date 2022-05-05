import './Profile.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCompany } from '../company.api';
import About from './About';
import Culture from './Culture';
import Jobs from './Jobs';
import Reviews from './Reviews';
import { RatingStars } from './Reviews';
import { setCompany } from '../company.slice';

function CompanyProfile() {

    const dispatch = useDispatch();    
    const [selectedTab, setSelectedTab] = useState('about');
    const companyId = useParams().company.split('-')[1];
    const company = useSelector(state => state.company.details);

    const handleClick = (tab) => {
        selectedTab !== tab && setSelectedTab(tab);
    }

    useEffect(() => {
        async function fetchCompany() {
            const response = await getCompany(companyId);
            if (response.data.company) dispatch(setCompany(response.data.company));
        }
        fetchCompany();
    },[])

    return (
        <div className="company-profile">
            {company && 
                <div className="page">
                    <div className="company-profile-section flex-col">
                        <div>
                            <img src={company.logo} alt="company-logo"></img>
                        </div>
                        <div className="flex flex-row flex-jc-sb">
                            <div className="company-review-rating">
                                <span>{company.name}</span>
                                <div className="flex flex-row">
                                    <RatingStars rating={company.averageRating} />
                                    <span>{company.averageRating} total rating from <a href="/">266 reviews</a></span>
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
            }
        </div>
    )
}

export default CompanyProfile;