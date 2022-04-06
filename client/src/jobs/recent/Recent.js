import './Recent.css';

function Recent() {
    return (
        <div className="recent flex flex-jc-c">
            <div className="page flex flex-col">
                <div className="flex flex-row">
                    <span className="material-icons-outlined">history</span>
                    <span className="medium">Recent searches</span>
                </div>
                <div className="flex flex-row flex-jc-sb">
                    <Card what="web developer" where="All Melbourne VIC"/>
                    <Card what="All jobs" where="Australia"/>
                    <Card what="designer" where="All Melbourne VIC"/>
                </div>
            </div>
        </div>
    )
}

function Card(props) {

    const { what, where } = props;

    return (
        <button className="recent-card">
            <div className="flex flex-row">
                <span className="green medium material-icons-outlined">search</span>
                <span className="green">{what}</span>
            </div>
            <div className="flex">
                <span>{where}</span>
            </div>
        </button>
    )
}

export default Recent;