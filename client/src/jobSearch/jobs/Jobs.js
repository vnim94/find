import './Jobs.css'
import { useEffect, useState } from 'react';
import { getAllJobs } from '../job.api';
import getTimeElapsed from '../../helpers/getTimeElapsed';

function Jobs() {

    const [sort, setSort] = useState(false);
    const [jobs, setJobs] = useState();

    useEffect(() => {
        async function fetchJobs() {
            const response = await getAllJobs();
            setJobs(response.data.jobs);
        }
        fetchJobs();
    }, [])

    return (
        <div className="jobs">
            <div className="page flex flex-row">
                <div className="job-feed">
                    <div className="job-search-result">
                        <span>{jobs && jobs.length} jobs found</span>
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
                            let details = job;
                            details.company = job.company.name;
                            details.industry = details.industry.name;
                            details.profession = details.profession.name;
                            return <JobCard key={index} job={details} />
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
                    <span>{company}</span>
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
                    <b>{industry}</b>
                    <span className="material-icons-outlined">navigate_next</span>
                    <span>{profession}</span>
                </div>
            </div>
            {summary && <div>
                <ul className="summary">
                {summary.split('\n').map((line, index) => {
                    return <li>{line}</li>
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