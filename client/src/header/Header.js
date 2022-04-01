import './Header.css';
import { useState } from 'react';

function Header() {

    const [selectedSite, setSelectedSite] = useState();
    const [selectedPage, setSelectedPage] = useState(); 

    const handleSiteClick = (event) => {
        event.preventDefault();
        setSelectedSite(event.currentTarget.id);
    }

    const handlePageClick = (event) => {
        event.preventDefault();
        setSelectedPage(event.currentTarget.id);
    }

    return (
        <header>
            <div className="sites flex flex-jc-c">
                <div className="page flex flex-row flex-jc-c">
                    <nav className="domain">
                        <ul className="site-links flex flex-row flex-ai-c flex-jc-se">
                            <li id="jobs" className={`site-link ${selectedSite === 'jobs' && 'selected'}`} onClick={handleSiteClick}>
                                <a href="/">Jobs</a>
                            </li>
                            <li id="courses" className={`site-link ${selectedSite === 'courses' && 'selected'}`} onClick={handleSiteClick}>
                                <a href="/">Courses</a>
                            </li>
                            <li id="businesses" className={`site-link ${selectedSite === 'businesses' && 'selected'}`} onClick={handleSiteClick}>
                                <a href="/">Businesses for sale</a>
                            </li>
                            <li id="volunteering" className={`site-link ${selectedSite === 'volunteering' && 'selected'}`} onClick={handleSiteClick}>
                                <a href="/">Volunteering</a>
                            </li>
                        </ul>
                    </nav>
                    <nav className="country">
                        <ul className="site-links flex flex-row">
                            <li className="site-link selected">
                                <a href="/">AU</a>
                            </li>
                            <li className="site-link">
                                <a href="/">NZ</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="banner flex flex-jc-c">
                <div className="page flex flex-jc-sb flex-ai-c">
                    <div className="logo flex flex-ai-c">
                        <img src="/magnifying-glass.png" alt="logo"></img>
                        <span className="logo-heading">find</span>
                    </div>
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
                        <li id="jobs" className={`tab ${selectedPage === 'jobs' && 'selected'}`} onClick={handlePageClick}>
                            <a href="/">Jobs</a>
                        </li>
                        <li id="profile" className={`tab ${selectedPage === 'profile' && 'selected'}`} onClick={handlePageClick}>
                            <a href="/">Profile</a>
                        </li>
                        <li id="career" className={`tab ${selectedPage === 'career' && 'selected'}`} onClick={handlePageClick}>
                            <a href="/">Career Advice</a>
                        </li>
                        <li id="reviews" className={`tab ${selectedPage === 'reviews' && 'selected'}`} onClick={handlePageClick}>
                            <a href="/">Company Reviews</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;