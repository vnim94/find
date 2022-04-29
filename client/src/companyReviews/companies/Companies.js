import './Companies.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanySearch from './CompanySearch';
import { getCompanies } from '../company.api';

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
                <div className="tiles">
                    {companies && companies.map((company, index) => {
                        return <Tile key={index} company={company}/>
                    })}
                </div>
                <div className="flex flex-jc-c">
                    <a className="bg-dark-green btn white" href="/companies/browse-reviews">See all companies</a>
                </div>
            </div>
        </div>
    )
}

function Tile(props) {

    const navigate = useNavigate();
    const { company } = props;

    const handleClick = () => {
        navigate(`/companies/${company.name.toLowerCase()}`)
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
                    {Array(5).fill().map((_,index) => { return <span key={index} className="medium material-icons-outlined">star</span> })}
                </div>
                <span className="small">3,471 ratings</span>
            </div>
        </div>
    )
}

export default Companies;