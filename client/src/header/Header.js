import './Header.css';
import { useState } from 'react';

function Header() {

    const [selectedSite, setSelectedSite] = useState('jobs');
    const [selectedPage, setSelectedPage] = useState('jobs'); 
    const [selectedRegion, setSelectedRegion] = useState('AU');

    return (
        <header>
            <div className="sites flex flex-jc-c">
                <div className="page flex flex-row flex-jc-c">
                    <nav className="site">
                        <ul className="site-links flex flex-row flex-ai-c flex-jc-se">
                            <ListItem id="jobs" type="site-link" text="Jobs" selected={selectedSite} setSelected={setSelectedSite}/>
                            <ListItem id="courses" type="site-link" text="Courses" selected={selectedSite} setSelected={setSelectedSite}/>
                            <ListItem id="businesses" type="site-link" text="Businesses for sale" selected={selectedSite} setSelected={setSelectedSite}/>
                            <ListItem id="volunteering" type="site-link" text="Volunteering" selected={selectedSite} setSelected={setSelectedSite}/>
                        </ul>
                    </nav>
                    <nav className="region">
                        <ul className="site-links flex flex-row">
                            <ListItem id="AU" type="site-link" text="AU" selected={selectedRegion} setSelected={setSelectedRegion}/>
                            <ListItem id="NZ" type="site-link" text="NZ" selected={selectedRegion} setSelected={setSelectedRegion}/>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="banner flex flex-jc-c">
                <div className="page flex flex-jc-sb flex-ai-c">
                    <a className="logo flex flex-ai-c" href="/">
                        <img src="/magnifying-glass.png" alt="logo"></img>
                        <span className="logo-heading">find</span>
                    </a>
                    <nav className="flex flex-row">
                        <div className="banner-link">
                            <a href="/login">Sign in</a>
                            <span>or</span>
                            <a href="/register">Register</a>
                        </div>
                        <div className="divider">|</div>
                        <div className="banner-link">
                            <a href="/">Employer site</a>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="pages flex flex-jc-c">
                <nav className="page">
                    <ul className="tabs flex flex-row flex-jc-sb">
                        <ListItem id="jobs" type="tab" text="Jobs" selected={selectedPage} setSelected={setSelectedPage}/>
                        <ListItem id="profile" type="tab" text="Profile" selected={selectedPage} setSelected={setSelectedPage}/>
                        <ListItem id="career" type="tab" text="Career Advice" selected={selectedPage} setSelected={setSelectedPage}/>
                        <ListItem id="reviews" type="tab" text="Company Reviews" selected={selectedPage} setSelected={setSelectedPage}/>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

function ListItem(props) {

    const { id, type, text, selected, setSelected } = props;

    const handleClick = (event) => {
        event.preventDefault();
        setSelected(id)
    }

    return (
        <li id={id} className={`${type} ${selected === id && 'selected'}`} onClick={handleClick}>
            {id === 'career' && <img className="panda" src="/panda.png" alt="panda"></img>}
            <a href="/">{text}</a>
        </li>
    )
}

export default Header;