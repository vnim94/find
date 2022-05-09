import './Jobs.css'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getJobs } from '../job.api';
import { getTimeElapsed } from '../../helpers';

function Jobs() {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const [jobs, setJobs] = useState();
    const [totalJobs, setTotalJobs] = useState();
    const allLocations = useSelector(state => state.jobSearch.allLocations);
    const page = parseInt(searchParams.get('page'));
    const sortByDate = searchParams.get('sortByDate') === 'true';
    const [loading, toggleLoading] = useState(false);

    const [displaySortOptions, setDisplaySortOptions] = useState(false);
    const [sortOption, setSortOption] = useState('relevance');
    
    const handleClick = async () => {
        if (sortByDate) {
            setSortOption('relevance');
            searchParams.set('sortByDate', false);
        } else {
            setSortOption('date'); 
            searchParams.set('sortByDate', true); 
        }

        setDisplaySortOptions(!displaySortOptions);
        searchParams.set('page', 1);
        setSearchParams(searchParams);
    }

    useEffect(() => {
        function findLocation (location) {
            return allLocations.filter(loc => 
                loc.city.toLowerCase().match(location) !== null || 
                loc.suburb.toLowerCase().match(location) !== null || 
                location === `${loc.city.toLowerCase()} ${loc.suburb.toLowerCase()}`
            ).map(loc => loc.id);
        }
        async function fetchJobs() {
            toggleLoading(true);

            let query = {};
            searchParams.forEach((value, param) => {
                switch (param) {
                    case 'location':
                        query[param] = findLocation(value);
                        break;
                    case 'industry':
                    case 'profession':
                        query[param] = searchParams.getAll(param);
                        break;
                    case 'added':
                    case 'payBase':
                    case 'payCeiling':
                    case 'page':
                        query[param] = parseInt(value);
                        break;
                    case 'sortByDate':
                        value === 'false' ? query[param] = false : query[param] = true;
                        break;
                    default:
                        query[param] = value;
                }
            });

            const response = await getJobs({ ...query, limit: 15 });
            if (response.data) {
                setJobs(response.data.getJobs.jobs);
                setTotalJobs(response.data.getJobs.totalJobs);
            }

            toggleLoading(false);
        }
        fetchJobs();
    },[allLocations, searchParams, page, sortByDate])

    return (
        <div className="jobs">
            <div className="page flex flex-row">
                <div className="job-feed">
                {jobs ? 
                <>
                    <div className="job-search-result">
                        <span><b>{totalJobs}</b> jobs found</span>
                        <div className="sort flex flex-row flex-ai-c">
                            <span>Sorted by</span>
                            <div className="sort-option flex flex-ai-c" onClick={() => setDisplaySortOptions(!displaySortOptions)}>
                                <b>{sortOption}</b>
                                <span className={`${displaySortOptions && 'expand'} material-icons-outlined`}>expand_more</span>
                            </div>
                            {displaySortOptions && <div className="sort-options">
                                <ul>
                                    <li onClick={handleClick}>Relevance</li>
                                    <li onClick={handleClick}>Date</li>
                                </ul>    
                            </div>}
                        </div>
                    </div>
                    {loading ? <Loading /> : 
                    <>
                        <div className="job-listings">
                            {jobs.map((job, index) => { return <JobCard key={index} job={job} />})}
                        </div>
                        {totalJobs > 0 && <Paginator totalPages={Math.ceil(totalJobs / 15)}/>}
                    </>}
                </>
                : <Loading />}
                </div>
                <div className="sidebar">
                    <div className="card">
                        <span className="medium material-icons-outlined">email</span>
                        <span>Save this search and get new jobs by email</span>
                        <button className="bg-dark-green white btn">Save</button>
                    </div>
                    <div className="ad">

                    </div>
                </div>
            </div>
        </div>
    )
}

function JobCard(props) {

    const { title, headliner, summary, company, location, industry, profession, workType, added } = props.job;

    return (
        <div className="job-card">
            <div className="flex flex-row flex-jc-sb">
                <div className="flex flex-col">
                    <a className="medium" href="/">{title}</a>
                    <span>{company.name}</span>
                </div>
                <span>{getTimeElapsed(added)}</span>
            </div>
            <div>
                <div className="flex flex-row">
                    <b>{location.city}</b>
                    {location.suburb && <>
                        <span className="material-icons-outlined">navigate_next</span>
                        <span>{location.suburb}</span>
                    </>
                    }
                </div>
                <div>
                    <span>{workType}</span>
                </div>
                <div className="flex flex-row">
                    <b>{industry.name}</b>
                    <span className="material-icons-outlined">navigate_next</span>
                    <span>{profession.name}</span>
                </div>
            </div>
            {summary && <div>
                <ul className="summary">
                {summary.split('\n').map((line, index) => {
                    return <li key={index}>{line}</li>
                })}
                </ul>
            </div>}
            <div className="grey">
                <span>{headliner}</span>
            </div>
            <div className="flex flex-row flex-jc-sb">
                <div className="flex flex-ai-fe">
                    <div className="flex flex-ai-c">
                        <span className="material-icons-outlined">star_outline</span>
                        <span>Save</span>
                    </div>
                </div>
                <img className="company-logo" src={company.logo} alt="company-logo"></img>
            </div>
        </div>
    )
}

function Paginator(props) {

    const { totalPages } = props;
    const [searchParams, setSearchParams] = useSearchParams(); 
    const currentPage = parseInt(searchParams.get('page'));

    const handleClick = (event) => {
        searchParams.set('page', parseInt(event.target.innerText));
        setSearchParams(searchParams)
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            searchParams.set('page', currentPage + 1);
            setSearchParams(searchParams)
        }
    }

    return (
        <div className="paginator">
            {Array(totalPages).fill().map((_,index) => {
                return <span key={index} className={`${index + 1 === currentPage ? 'current-page' :  undefined} paginator-item`} onClick={handleClick}>{index + 1}</span>
            })}
            <div className="paginator-next" onClick={handleNext}>
                <span>Next</span>
                <span className="material-icons-outlined">navigate_next</span>
            </div>
        </div>
    )
}

export function Loading() {
    return (
        <div className="loading">
            <div className="dot"></div>
            <div className="dot delay-1"></div>
            <div className="dot delay-2"></div>
        </div>
    )
}

export default Jobs;