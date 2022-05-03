import './Jobs.css'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../job.api';
import { toggleLoading, toggleSort, setJobs, setCurrentPage, setTotalJobs } from '../job.slice';
import getTimeElapsed from '../../helpers/getTimeElapsed';

function Jobs() {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const jobs = useSelector(state => state.jobSearch.jobs);
    const totalJobs = useSelector(state => state.jobSearch.totalJobs);
    const page = parseInt(searchParams.get('page'));
    const sortByDate = searchParams.get('sortByDate') === 'true';
    const loading = useSelector(state => state.jobSearch.loading);

    const [displaySortOptions, setDisplaySortOptions] = useState(false);
    const [sortOption, setSortOption] = useState('relevance');
    
    const handleClick = async () => {
        if (sortByDate) {
            setSortOption('relevance');
            setDisplaySortOptions(!displaySortOptions);
            searchParams.set('sortByDate', false);
            searchParams.set('page', 1);
            setSearchParams(searchParams);
        } else {
            setSortOption('date'); 
            setDisplaySortOptions(!displaySortOptions);
            searchParams.set('sortByDate', true); 
            searchParams.set('page', 1);
            setSearchParams(searchParams);
        }
    }

    useEffect(() => {
        async function fetchJobs() {
            dispatch(toggleLoading(true));

            let query = {};
            searchParams.forEach((value, param) => {
                if (!query[param] && searchParams.getAll(param).length > 1) {
                    query[param] = searchParams.getAll(param);
                } else if (!query[param]) {
                    if (param === 'added' || param === 'payBase'|| param === 'payCeiling' || param === 'page') { 
                        query[param] = parseInt(value);
                    } else if (param === 'sortByDate') {
                        value === 'false' ? query[param] = false : query[param] = true;
                    } else {
                        query[param] = value;
                    }
                }
            });
            
            const response = await getJobs({ ...query, limit: 15 });
            if (response.data) {
                dispatch(setJobs(response.data.getJobs.jobs));
                dispatch(setTotalJobs(response.data.getJobs.totalJobs));
            }

            dispatch(toggleLoading(false));
        }
        fetchJobs();
    },[dispatch, searchParams, page, sortByDate])

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
                <span>{getTimeElapsed(added, Date.now())}</span>
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
    // const dispatch = useDispatch();
    const currentPage = parseInt(searchParams.get('page'));

    const handleClick = (event) => {
        searchParams.set('page', parseInt(event.target.innerText));
        setSearchParams(searchParams)
        // dispatch(setCurrentPage(parseInt(event.target.innerText)))
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            searchParams.set('page', currentPage + 1);
            setSearchParams(searchParams)
            // dispatch(setCurrentPage(currentPage + 1));
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

function Loading() {
    return (
        <div className="loading">
            <div className="dot"></div>
            <div className="dot delay-1"></div>
            <div className="dot delay-2"></div>
        </div>
    )
}

export default Jobs;