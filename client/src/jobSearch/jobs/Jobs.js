import './Jobs.css'
import { useState } from 'react';

function Jobs() {

    const [sort, setSort] = useState(false);

    return (
        <div className="jobs">
            <div className="page flex flex-row">
                <div className="job-feed">
                    <div className="job-search-result">
                        <span>114,525 jobs found</span>
                        <div className="sort flex flex-row flex-ai-c">
                            <span>Sorted by</span>
                            <div className="sort-option flex flex-ai-c" onClick={() => setSort(!sort)}>
                                <b>Relevance</b>
                                <span className={`${sort && 'expand'} material-icons-outlined`}>expand_more</span>
                            </div>
                        </div>
                    </div>
                    <div className="job-listings">
                        <JobCard 
                            role="Developer" 
                            company="SEEK" 
                            date="22h ago" 
                            location={{ city: 'Melbourne', suburb: 'CBD & Inner Suburbs' }}
                            classification={{ main: 'Information & Communication Technology', sub: 'Developers/Progammers' }} 
                            description="Supportive of flexible working"
                            headliner="Working in one of our cross-functional squads, you will make a significant technical contribution to the delivery of the various business priorities"
                        />
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

    const { role, company, date, location, classification, description, headliner, logo } = props;

    return (
        <div className="job-card">
            <div className="flex flex-row flex-jc-sb">
                <div className="flex flex-col">
                    <a className="medium" href="/">{role}</a>
                    <span>{company}</span>
                </div>
                <span>{date}</span>
            </div>
            <div>
                <div className="flex flex-row">
                    <b>{location.city}</b>
                    <span className="material-icons-outlined">navigate_next</span>
                    <span>{location.suburb}</span>
                </div>
                <div className="flex flex-row">
                    <b>{classification.main}</b>
                    <span className="material-icons-outlined">navigate_next</span>
                    <span>{classification.sub}</span>
                </div>
            </div>
            <div className="description">
                {description}
            </div>
            <div className="headliner">
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