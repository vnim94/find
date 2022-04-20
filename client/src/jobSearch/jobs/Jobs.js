import './Jobs.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import getTimeElapsed from '../../helpers/getTimeElapsed';

function Jobs() {

    const jobs = useSelector(state => state.jobSearch.jobs);
    const [sort, setSort] = useState(false);

    return (
        <div className="jobs">
            <div className="page flex flex-row">
                <div className="job-feed">
                    <div className="job-search-result">
                        <span><b>{jobs && jobs.length}</b> jobs found</span>
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

    const { title, headliner, summary, company, city, suburb, industry, profession, workType, added, logo } = props.job;

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
                    <b>{city}</b>
                    {suburb && <>
                        <span className="material-icons-outlined">navigate_next</span>
                        <span>{suburb}</span>
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

export default Jobs;