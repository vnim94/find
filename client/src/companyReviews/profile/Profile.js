import './Profile.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCompany, getCompanyReviewSummary } from '../company.api';
import About from './About';
import Culture from './Culture';
import CompanyJobs from './Jobs';
import Reviews from './Reviews';
import { RatingStars } from './Reviews';
import { setCompany, setReviewsSummary } from '../company.slice';

function CompanyProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tab = useParams().tab;    
    const companyId = useParams().company.split('-')[1];
    const company = useSelector(state => state.company.details);

    const handleClick = (tab) => {
        tab ? navigate(tab) : navigate(`/companies/${company.name.toLowerCase()}-${company.id}`);
    }

    useEffect(() => {
        async function fetchCompany() {
            const response = await getCompany(companyId);
            if (response.data.company) dispatch(setCompany(response.data.company));
        }
        async function fetchCompanyReviewsSummary() {
            const response = await getCompanyReviewSummary(companyId);
            if (response.data.reviewsSummary) dispatch(setReviewsSummary(response.data.reviewsSummary));
        }
        fetchCompany();
        fetchCompanyReviewsSummary();
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
                                    <RatingStars rating={company.reviews.averageRating} />
                                    <span>{company.reviews.averageRating} total rating from <a href="/">{company.reviews.totalCount} reviews</a></span>
                                </div>
                            </div>
                            <div>
                                <button className="bg-white dark-green btn-outline btn">Write a review</button>
                            </div>
                        </div>
                        <div className="company-profile-tabs">
                            <ul className="">
                                <li className={`company-profile-tab ${!tab && 'selected'}`} onClick={() => handleClick()}>About</li>
                                <li className={`company-profile-tab ${tab === 'culture' && 'selected'}`} onClick={() => handleClick('culture')}>Life and Culture</li>
                                <li className={`company-profile-tab ${tab === 'jobs' && 'selected'}`} onClick={() => handleClick('jobs')}>Jobs</li>
                                <li className={`company-profile-tab ${tab === 'reviews' && 'selected'}`} onClick={() => handleClick('reviews')}>Reviews</li>
                            </ul>
                        </div>
                    </div>
                    {!tab && <About />}
                    {tab === 'culture' && <Culture />}
                    {tab === 'jobs' && <CompanyJobs />}
                    {tab === 'reviews' && <Reviews />}
                </div>
            }
        </div>
    )
}

export default CompanyProfile;