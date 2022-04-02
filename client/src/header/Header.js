import './Header.css';
import { useState } from 'react';

function Header() {

    const [selectedSite, setSelectedSite] = useState('jobs');
    const [selectedPage, setSelectedPage] = useState('jobs'); 
    const [selectedRegion, setSelectedRegion] = useState('AU');

    const handleClick = (event) => {
        event.preventDefault();

        const parent = event.currentTarget.parentElement.parentElement.classList;
        const id = event.currentTarget.id

        if (parent.contains('site')) {
            setSelectedSite(id);
        } else if (parent.contains('region')) {
            setSelectedRegion(id);
        } else if (parent.contains('page')) {
            setSelectedPage(id);
        }
    }

    return (
        <header>
            <div className="sites flex flex-jc-c">
                <div className="page flex flex-row flex-jc-c">
                    <nav className="site">
                        <ul className="site-links flex flex-row flex-ai-c flex-jc-se">
                            <li id="jobs" className={`site-link ${selectedSite === 'jobs' && 'selected'}`} onClick={handleClick}>
                                <a href="/">Jobs</a>
                            </li>
                            <li id="courses" className={`site-link ${selectedSite === 'courses' && 'selected'}`} onClick={handleClick}>
                                <a href="/">Courses</a>
                            </li>
                            <li id="businesses" className={`site-link ${selectedSite === 'businesses' && 'selected'}`} onClick={handleClick}>
                                <a href="/">Businesses for sale</a>
                            </li>
                            <li id="volunteering" className={`site-link ${selectedSite === 'volunteering' && 'selected'}`} onClick={handleClick}>
                                <a href="/">Volunteering</a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="region">
                        <ul className="site-links flex flex-row">
                            <li id="AU" className={`site-link ${selectedRegion === 'AU' && 'selected'}`} onClick={handleClick}>
                                <a href="/">AU</a>
                            </li>
                            <li id="NZ" className={`site-link ${selectedRegion === 'NZ' && 'selected'}`} onClick={handleClick}>
                                <a href="/">NZ</a>
                            </li>
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
                        <li id="jobs" className={`tab ${selectedPage === 'jobs' && 'selected'}`} onClick={handleClick}>
                            <a href="/">Jobs</a>
                        </li>
                        <li id="profile" className={`tab ${selectedPage === 'profile' && 'selected'}`} onClick={handleClick}>
                            <a href="/">Profile</a>
                        </li>
                        <li id="career" className={`tab ${selectedPage === 'career' && 'selected'}`} onClick={handleClick}>
                            <a href="/">Career Advice</a>
                        </li>
                        <li id="reviews" className={`tab ${selectedPage === 'reviews' && 'selected'}`} onClick={handleClick}>
                            <a href="/">Company Reviews</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;