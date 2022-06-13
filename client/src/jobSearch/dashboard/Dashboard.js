import { useSelector } from 'react-redux';

function Dashboard() {

    // const user = useSelector(state => state.user.details);
    const user = {};
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
        <div className={`border-t border-t-grey-2 py-7 flex justify-center items-center`}>
            {!user && 
            <div className="py-12 w-[992px] flex flex-row justify-center">
                <span className="material-icons-outlined">person_outlined</span>
                <div className="font-semibold text-lg">
                    <span>
                        <a className="text-green-4 hover:underline" href="/login">Sign in</a> or <a className="text-green-4 hover:underline" href="/register">Register</a> to see your saved searches and saved jobs on all your devices
                    </span>
                </div>
            </div>}
            {user && 
            <div className="w-[992px] grid grid-cols-3 gap-x-2">
                <DashboardTile count={50} icon="thumb_up" heading="Recommended jobs">
                    {recommended.map((job,index) => { 
                        return <div key={index} className="text-sm flex flex-col">
                            <a className="text-green-4 hover:underline" href="/">{job.title}</a>
                            <span className="text-grey-3">{job.company}</span>
                        </div>
                    })}
                </DashboardTile>
                <DashboardTile count={1} icon="star_outline" heading="Saved job">
                    {saved.map((job,index) => { 
                        return <div key={index} className="text-sm flex flex-col">
                            <a className="text-green-4 hover:underline" href="/">{job.title}</a>
                            <span className="text-grey-3">{job.company}</span>
                        </div>
                    })}
                </DashboardTile>
                <DashboardTile count={0} icon="favorite_border" heading="Saved search">
                    {searches.map((search,index) => { 
                        return <div key={index} className="text-sm flex space-x-2">
                            <span className="text-green-4">{search.new} new</span>
                            <a href="/">{search.what} in {search.where}</a>
                        </div>
                    })}
                </DashboardTile>
            </div>}
        </div>
    )
}

function DashboardTile({ children, count, icon, heading }) {
    return (
        <div className="grid grid-rows-[1fr_5fr_1fr] space-y-3">
            <div className="flex items-center space-x-2">
                <span className="dark-green material-icons-outlined">{icon}</span>
                <span className="text-lg">{heading}</span>
                <div className="w-6 bg-green-3 text-green-6 text-sm font-semibold rounded-md flex justify-center">
                    <span>{count}</span>
                </div>
            </div>
            <div className="flex flex-col flex-grow space-y-3">
                {children}
            </div>
            <div className="flex items-center text-green-4">
                <a className="hover:underline" href="/">View all</a>
                <span className="material-icons-outlined">navigate_next</span>
            </div>
        </div>
    )
}

export default Dashboard;