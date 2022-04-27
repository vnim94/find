import './Jobs.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../job.slice';
import getTimeElapsed from '../../helpers/getTimeElapsed';

function Jobs() {

    const jobs = useSelector(state => state.jobSearch.jobs);
    const totalJobs = useSelector(state => state.jobSearch.totalJobs);
    const [sort, setSort] = useState(false);

    return (
        <div className="jobs">
            <div className="page flex flex-row">
                <div className="job-feed">
                    <div className="job-search-result">
                        <span><b>{totalJobs && totalJobs}</b> jobs found</span>
                        <div className="sort flex flex-row flex-ai-c">
                            <span>Sorted by</span>
                            <div className="sort-option flex flex-ai-c" onClick={() => setSort(!sort)}>
                                <b>Relevance</b>
                                <span className={`${sort && 'expand'} material-icons-outlined`}>expand_more</span>
                            </div>
                        </div>
                    </div>
                    <div className="job-listings">
                        {jobs && jobs.map((job, index) => {
                            return <JobCard key={index} job={job} />
                        })}
                    </div>
                    {totalJobs && <Paginator totalPages={Math.ceil(totalJobs / 15)}/>}
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

    const { title, headliner, summary, company, location, industry, profession, workType, added, logo } = props.job;

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
                <img className="company-logo" src={logo} alt="company-logo"></img>
            </div>
        </div>
    )
}

function Paginator(props) {

    const { totalPages } = props;
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.jobSearch.currentPage);

    const handleClick = (event) => {
        dispatch(setCurrentPage(parseInt(event.target.innerText)))
    }

    let pages = []
    for (let i = 0; i < totalPages; i++) {
        pages.push(<span key={i} className={`${i + 1 === currentPage ? 'current-page' :  undefined} paginator-item`} onClick={handleClick}>{i + 1}</span>)
    }

    return (
        <div className="paginator">
            {pages}
            <div className="paginator-next" onClick={() => currentPage < totalPages && dispatch(setCurrentPage(currentPage + 1))}>
                <span>Next</span>
                <span className="material-icons-outlined">navigate_next</span>
            </div>
        </div>
    )
}

export default Jobs;