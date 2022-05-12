import './Search.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CareerSearch() {

    const [cancel, setCancel] = useState(false);

    return (<>
        <div className="career-search">
            <div className="page">
                <div className="form-group flex flex-row flex-ai-c">
                    <div className="career-search-bar search-bar form-control flex flex-row flex-ai-c">
                        <span className="search-glass material-icons-outlined">search</span>
                        <input className="career-search-bar search-bar form-control" type="text" placeholder="E.g. nurse, resume, interview, sales..." onFocus={() => setCancel(true)} onBlur={() => setCancel(false)}/>
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

    const navigate = useNavigate();
    const [selected, setSelected] = useState('');

    return (
        <div className="pages flex flex-jc-c">
            <nav className="page">
                <ul className="tabs flex flex-row">
                    <li className={`home tab ${selected === '' && 'selected'}`} onClick={() => { setSelected(''); navigate(''); }}>
                        <span className="material-icons-outlined">home</span>
                    </li>
                    <Tab id="explore-careers" text="Explore careers" selected={selected} setSelected={setSelected}/>
                    <Tab id="job-hunting" text="Job hunting" selected={selected} setSelected={setSelected}/>
                    <Tab id="working-life" text="Working life" selected={selected} setSelected={setSelected}/>
                </ul>
            </nav>
        </div>
    )
}

function Tab({ id, text, selected, setSelected }) {

    const navigate = useNavigate();
    const handleClick = () => {
        setSelected(id);
        navigate(id);
    }

    return (
        <li id={id} className={`tab ${selected === id && 'selected'}`} onClick={handleClick}>
            <span>{text}</span>
        </li>
    )
}

export default CareerSearch;