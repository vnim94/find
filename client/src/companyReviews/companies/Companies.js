import './Companies.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySearch from './CompanySearch';
import { getCompanies } from '../company.api';
import { Loading } from '../../jobSearch/jobs/Jobs';
import { RatingStars } from '../profile/Reviews';

function Companies(props) {

    const [companies, setCompanies] = useState();

    useEffect(() => {
        async function fetchCompanies() {
            const response = await getCompanies();
            if (response.data) setCompanies(response.data.companies);
        }   
        fetchCompanies();
    },[])

    return (
        <div className="bg-pale-grey companies">
            <div className="page">
                {!props.reviews && <CompanySearch />}
                {!props.reviews && <div className="review-heading flex flex-row flex-jc-sb">
                    <span className="large">Explore Company Profiles</span>
                    <button className="bg-dark-green white btn">Write a Review</button>
                </div>}
                {!companies && <Loading />}
                {companies && <div className="tiles">
                    {companies.map((company, index) => {
                        return <Tile key={index} company={company}/>
                    })}
                </div>}
                <div className="flex flex-jc-c">
                    <a className="bg-dark-green btn white" href="/companies/browse-reviews">See all companies</a>
                </div>
            </div>
        </div>
    )
}

function Tile({ company }) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${company.name.toLowerCase()}-${company.id}`);
    }

    return (
        <div className="tile" onClick={handleClick}>
            <div className="tag-div flex flex-ai-c flex-jc-fe">
                <span className="tag">hiring</span>
            </div>
            <div>
                <img className="company-logo" src={company.logo} alt="company-logo"></img>
            </div>
            <div className="company-details">
                <span><b>{company.name}</b></span>
                <div className="rating">
                    <RatingStars rating={company.reviews.averageRating} />
                </div>
                <span className="small">{company.reviews.totalCount} ratings</span>
            </div>
        </div>
    )
}

export default Companies;