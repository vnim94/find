import './Dashboard.css';
import { useSelector } from 'react-redux';

function Dashboard() {

    const user = useSelector(state => state.user.details);
    const recommended = [{
        title: 'Web Developer',
        company: 'Company'
    }, {
        title: 'Designer',
        company: 'Company'
    }
    ];
    const saved = [{
        title: 'Web Developer',
        company: 'Company'
    }];
    const searches = [{
        new: 0,
        what: 'web developer',
        where: 'All Melbourne VIC'
    }];

    return (
        <div className={`${user && 'signed-in'} dashboard flex flex-jc-c flex-ai-c`}>
            {!user && 
            <div className="page flex flex-row flex-jc-c flex-ai-c">
                <span className="material-icons-outlined">person_outlined</span>
                <div className="medium">
                    <span>
                        <a className="green banner-link" href="/login">Sign in</a> or <a className="green banner-link" href="/register">Register</a> to see your saved searches and saved jobs on all your devices
                    </span>
                </div>
            </div>}
            {user && 
            <div className="page flex flex-row flex-jc-sb">
                <div className="dashboard-tile">
                    <div className="dashboard-tile-heading flex">
                        <span className="dark-green material-icons-outlined">thumb_up</span>
                        <span className="medium dark-green">50</span>
                        <span className="medium">Recommended jobs</span>
                    </div>
                    {recommended.map((job,index) => { 
                        return <div key={index} className="dashboard-tile-item flex flex-col">
                            <a href="/">{job.title}</a>
                            <span>{job.company}</span>
                        </div>
                    })}
                </div>
                <div className="dashboard-tile">
                    <div className="dashboard-tile-heading flex">
                        <span className="green material-icons-outlined">star_outline</span>
                        <span className="medium green">1</span>
                        <span className="medium">Saved job</span>
                    </div>
                    {saved.map((job,index) => { 
                        return <div key={index} className="dashboard-tile-item flex flex-col">
                            <a href="/">{job.title}</a>
                            <span>{job.company}</span>
                        </div>
                    })}
                </div>
                <div className="dashboard-tile">
                    <div className="dashboard-tile-heading flex">
                        <span className="light-green material-icons-outlined">favorite_border</span>
                        <span className="medium green">0</span>
                        <span className="medium">Saved search</span>
                    </div>
                    {searches.map((search,index) => { 
                        return <div key={index} className="dashboard-tile-item flex flex-row flex-jc-sa">
                            <span>{search.new} new</span>
                            <a href="/">{search.what} in {search.where}</a>
                        </div>
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Dashboard;