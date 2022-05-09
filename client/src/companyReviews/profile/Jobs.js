import { getJobs } from '../../jobSearch/job.api';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTimeElapsed } from '../../helpers';
import { Loading } from '../../jobSearch/jobs/Jobs';

function CompanyJobs() {
    
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const title = searchParams.get('title') || '';
    const company = useSelector(state => state.company.details);
    const [jobs, setJobs] = useState();
    const [totalJobs, setTotalJobs] = useState();

    const handleChange = (event) => {
        searchParams.set('title', event.target.value);
        setSearchParams(searchParams);
    }

    const handleClick = () => {
        searchParams.set('company', company.id);
        navigate({
            pathname: '/jobs',
            search: searchParams.toString()
        })
    }

    useEffect(() => {
        async function fetchJobs() {
            const response = await getJobs({ company: company.id, limit: 5 });
            if (response.data) { setJobs(response.data.getJobs.jobs); setTotalJobs(response.data.getJobs.totalJobs)};
        }
        fetchJobs();
    },[])
    
    return (<>
        <div className="company-profile-section flex-col">
            {!jobs && <Loading />}
            {jobs && <>
            <div>
                <span className="medium bold">{totalJobs} jobs in {company.name}</span>
            </div>
            <div>
                <div className="form-group">
                    <label>Refine by job type</label>
                    <div className="company-job-search">
                        <input className="form-control" type="text" value={title} onChange={handleChange} placeholder="eg. Baker"></input>
                        <button className="bg-dark-green white btn" onClick={handleClick}>Show jobs</button>
                        <div className={`${title.length === 0 ? 'hidden' : undefined} clear-search flex flex-ai-c`} onClick={() => { searchParams.delete('title'); setSearchParams(searchParams) }}>
                            <span className="medium material-icons-outlined">clear</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="company-jobs">
                {jobs.map((job, index) => <JobCard key={index} job={job}/>)}
            </div>
            <div>
                <a className="green" href={`/jobs?company=${company.id}`}>See all jobs at {company.name}</a>
            </div>
            </>}
        </div>
    </>)
}

function JobCard({ job }) {

    const { title, location, headliner, added } = job;

    return (
        <div className="company-job-card">
            <div className="flex flex-jc-sb">
                <a className="green medium" href="/">{title}</a>
                <span className="small">{getTimeElapsed(added)}</span>
            </div>
            <div className="flex flex-ai-c">
                <span className="small grey material-icons-outlined">location_on</span>
                <span className="grey small">{location.city} - {location.suburb}</span>
            </div>
            <div>
                <span>{headliner}</span>
            </div>
        </div>
    )
}

export default CompanyJobs;