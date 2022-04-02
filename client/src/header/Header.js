import './Header.css';
import { useState } from 'react';
import Link from './Link';

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
                            <Link id="jobs" type="site-link" text="Jobs" selected={selectedSite} setSelected={setSelectedSite}/>
                            <Link id="courses" type="site-link" text="Courses" selected={selectedSite} setSelected={setSelectedSite}/>
                            <Link id="businesses" type="site-link" text="Businesses for sale" selected={selectedSite} setSelected={setSelectedSite}/>
                            <Link id="volunteering" type="site-link" text="Volunteering" selected={selectedSite} setSelected={setSelectedSite}/>
                        </ul>
                    </nav>
                    <nav className="region">
                        <ul className="site-links flex flex-row">
                            <Link id="AU" type="site-link" text="AU" selected={selectedRegion} setSelected={setSelectedRegion}/>
                            <Link id="NZ" type="site-link" text="NZ" selected={selectedRegion} setSelected={setSelectedRegion}/>
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
                            <a href="/">Sign in</a>
                            <span>or</span>
                            <a href="/">Register</a>
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
                        <Link id="jobs" type="tab" text="Jobs" selected={selectedPage} setSelected={setSelectedPage}/>
                        <Link id="profile" type="tab" text="Profile" selected={selectedPage} setSelected={setSelectedPage}/>
                        <Link id="career" type="tab" text="Career Advice" selected={selectedPage} setSelected={setSelectedPage}/>
                        <Link id="reviews" type="tab" text="Company Reviews" selected={selectedPage} setSelected={setSelectedPage}/>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;