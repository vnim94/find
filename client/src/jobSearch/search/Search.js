import './Search.css';
import Dropdown from './Dropdown';
import Options from './Options';
import { useState } from 'react';


function Search(props) {

    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(props.expanded);
    const [industries, setIndustries] = useState([]);

    const handleSubmit = () => {
    }

    return (
        <>
        <section className="search flex flex-jc-c">
            <div className="page flex flex-col flex-jc-sb flex-ai-c">
                <div className="search-container">
                    <form className="flex flex-row flex-jc-sb" onSubmit={handleSubmit}>
                        <div className="what flex flex-col">
                            <label>What</label>
                            <div className="flex flex-row">
                                <input className="form-control" type="text" placeholder="Enter Keywords"></input>
                                <div className={`classification form-control flex flex-ai-c flex-jc-sb ${visible && 'outlined'}`} onClick={() => setVisible(!visible)}>
                                    <span className="dark-grey">
                                        {industries.length === 0 ? 
                                            'Any classification' 
                                        : 
                                            industries.length > 1 ? 
                                                `${industries.length} classifications`
                                            : 
                                                industries[0].length > 20 ? 
                                                    `${industries[0].slice(0,20)} ...`
                                                :
                                                    industries[0]
                                        }
                                    </span>
                                    <div className={`${industries.length > 0 && 'shrink'} list-action flex flex-ai-c`}>
                                        <span className={`${visible && 'flip'} material-icons-outlined`}>expand_more</span>
                                        <div className={`${industries.length === 0 && 'hidden'} clear flex flex-ai-c`} onClick={() => setIndustries([])}>
                                            <span className="medium material-icons-outlined">clear</span>
                                        </div>
                                    </div>
                                </div>
                                {visible && <Dropdown industries={industries} setIndustries={setIndustries} />}
                            </div>
                        </div>
                        <div className="where flex flex-col">
                            <label>Where</label>
                            <input className="form-control" type="search" placeholder="Enter suburb, city, or region"></input>
                        </div>
                        <div className="find flex flex-ai-fe">
                            <button className="bg-black white btn" type="submit">Find</button>
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