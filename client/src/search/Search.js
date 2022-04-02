import './Search.css';

function Search() {
    return (
        <section className="search flex flex-jc-c">
            <div className="page flex flex-row flex-jc-sb flex-ai-c">
                <div className="search-bar">
                    <form className="flex flex-row flex-jc-sb">
                        <div className="what flex flex-col">
                            <label>What</label>
                            <div className="flex flex-row">
                                <input className="form-control" type="text" placeholder="Enter Keywords"></input>
                                <div className="form-control flex flex-ai-c flex-jc-sb">
                                    <span className="dropdown">Any Classification</span>
                                    <span className="material-icons-outlined">expand_more</span>
                                </div>
                            </div>
                        </div>
                        <div className="where flex flex-col">
                            <label>Where</label>
                            <input className="form-control" type="search" placeholder="Enter suburb, city, or region"></input>
                        </div>
                        <div className="find flex flex-ai-fe">
                            <button className="bg-black white btn">Find</button>
                        </div>
                    </form>
                    <div className="flex flex-jc-fe">
                        <div className="flex flex-ai-c">
                            <span className="more">More options</span>
                            <span className="material-icons-outlined">expand_more</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Search;