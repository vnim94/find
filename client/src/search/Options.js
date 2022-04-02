import './Options.css';

function Options() {
    return (
        <div className="options flex flex-jc-c">
            <div className="page flex flex-row">
                <span className="light-black">|</span>
                <div className="option flex flex-row flex-jc-c">
                    <div className="flex">
                        <span className="white">All work types</span>
                        <span className="white material-icons-outlined">expand_more</span>
                    </div>
                </div>
                <span className="light-black">|</span>
                <div className="option flex flex-row flex-jc-c">
                    <div className="flex">
                        <span className="grey">paying</span>
                        <span className="white">$0</span>
                        <span className="white material-icons-outlined">expand_more</span>
                    </div>
                </div>
                <span className="light-black">|</span>
                <div className="option flex flex-row flex-jc-c">
                    <div className="flex">
                        <span className="grey">to</span>
                        <span className="white">$200k+</span>
                        <span className="white material-icons-outlined">expand_more</span>
                    </div>
                </div>
                <span className="light-black">|</span>
                <div className="option flex flex-row flex-jc-c">
                    <div className="flex">
                        <span className="grey">listed</span>
                        <span className="white">any time</span>
                        <span className="white material-icons-outlined">expand_more</span>
                    </div>
                </div>
                <span className="light-black">|</span>
            </div>
        </div>
    )
}

export default Options;