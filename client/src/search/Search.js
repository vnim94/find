import './Search.css';
import Dropdown from './Dropdown';
import Options from './Options';
import { useState } from 'react';

function Search() {

    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);

    return (
        <>
        <section className="search flex flex-jc-c">
            <div className="page flex flex-col flex-jc-sb flex-ai-c">
                <div className="search-bar">
                    <form className="flex flex-row flex-jc-sb">
                        <div className="what flex flex-col">
                            <label>What</label>
                            <div className="flex flex-row">
                                <input className="form-control" type="text" placeholder="Enter Keywords"></input>
                                <div className={`classification form-control flex flex-ai-c flex-jc-sb ${visible && 'outlined'}`} onClick={() => setVisible(!visible)}>
                                    <span className="dark-grey">Any Classification</span>
                                    <span className={`${visible && 'flip'} material-icons-outlined`}>expand_more</span>
                                </div>
                                {visible && <Dropdown />}
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
                    {!expanded && <div className="flex flex-jc-fe">
                        <div className="more flex flex-ai-c" onClick={() => setExpanded(!expanded)}>
                            <span className="small underlined">More options</span>
                            <span className="material-icons-outlined">expand_more</span>
                        </div>
                    </div>}
                </div>
            </div>
        </section>
        {expanded && <Options />}
        </>
    )
}

export default Search;