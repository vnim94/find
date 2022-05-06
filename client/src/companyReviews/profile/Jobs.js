function CompanyJobs() {
    return (<>
        <div className="company-profile-section flex-col">
            <div>
                <span className="medium bold">85 jobs in SEEK</span>
            </div>
            <div>
                <div className="form-group">
                    <label>Refine by job type</label>
                    <div className="company-job-search">
                        <input className="form-control" type="text" placeholder="eg. Baker"></input>
                        <button className="bg-dark-green white btn" type="submit">Show jobs</button>
                    </div>
                </div>
            </div>
            <div className="company-jobs flex flex-row">
                <JobCard />
                <JobCard />
            </div>
            <div>
                <a className="green" href="/">See all jobs at SEEK</a>
            </div>
        </div>
    </>)
}

function JobCard() {
    return (
        <div className="company-job-card">
            <div className="flex flex-jc-sb">
                <a className="medium" href="/">{"Account Executive - Corporate Sales"}</a>
                <span>1d ago</span>
            </div>
            <div className="flex flex-ai-c">
                <span className="grey material-icons-outlined">location_on</span>
                <span className="grey small">Melbourne - CBD &amp; Inner Suburbs</span>
            </div>
            <div>
                <span>Provide superior phone based account management for our Corporate SME clients that delivers employment and talent sourcing solutions</span>
            </div>
        </div>
    )
}

export default CompanyJobs;