import './Content.css';

function Content() {
    return (
        <div className="content">
            <div className="page flex flex-row flex-jc-sb">
                <div className="bg-black light-grey jumbo-card">
                    <div className="flex flex-col">
                        <span className="medium">Take advantage of</span>
                        <span className="large"><b>The Great Job Boom</b></span>
                    </div>
                    <button className="btn">Search jobs</button>
                </div>
                <div className="bg-black light-grey jumbo-card">
                    <div className="flex flex-col">
                        <span className="large"><b>Hiring?</b></span>
                        <span className="medium">The best jobs ads find</span> 
                        <span className="medium">the best people</span>
                    </div>
                    <button className="btn">Find out more</button>
                </div>
            </div>
        </div>
    )
}

export default Content;