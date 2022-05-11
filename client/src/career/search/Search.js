import './Search.css';
import { useState } from 'react';

function CareerSearch() {

    const [cancel, setCancel] = useState(false);

    return (<>
        <div className="career-search">
            <div className="page">
                <div className="form-group flex flex-row flex-ai-c">
                    <div className="career-search-bar search-bar form-control flex flex-row flex-ai-c">
                        <span className="search-glass material-icons-outlined">search</span>
                        <input className="career-search-bar search-bar form-control" type="text" onFocus={() => setCancel(true)} onBlur={() => setCancel(false)}/>
                    </div>
                    <button className="bg-dark-green white btn search-btn">Search</button>
                    <span className={`${!cancel && 'search-cancel'} cursor underline`}>Cancel</span>
                </div>
            </div>
        </div>
        {cancel && <div className="overlay"></div>}
        <Tabs />
    </>)
}

function Tabs() {

    const [selectedPage, setSelectedPage] = useState();

    return (
        <div className="pages">
            <nav className="page">
                <ul className="tabs flex flex-row flex-jc-sb">
                </ul>
            </nav>
        </div>
    )
}

function Tab({ id, text, type, selected }) {

    const handleClick = () => {

    }

    return (
        <li id={id} className={`${type} ${selected === id && 'selected'}`} onClick={handleClick}>
            <span>{text}</span>
        </li>
    )
}

export default CareerSearch;