import './Header.css';

function Header() {
    return (
        <header className="border">
            <div className="top">
                <div className="page flex flex-row flex-jc-sb">
                    <div className="domain flex flex-jc-c">
                        <div className="flex flex-jc-sa flex-ai-c">
                            <a className="selected" href="/">Jobs</a>
                            <a href="/">Courses</a>
                            <a href="/">Businesses for sale</a>
                            <a href="/">Volunteering</a>
                        </div>
                    </div>
                    {/* <div className="country flex flex-jc-sa">
                        <a className="selected" href="/">AU</a>
                        <a href="/">NZ</a>
                    </div> */}
                </div>
            </div>
            <div className="banner flex flex-jc-c">
                <div className="page flex flex-jc-sb flex-ai-c">
                    <div className="logo flex flex-ai-c">
                        <img src="/magnifying-glass.jpg" alt="manifying-glass"></img>
                        <span>Find</span>
                    </div>
                    <div className="account flex flex-row flex-jc-sb">
                        <span><a className="green" href="/">Sign In</a> or <a className="green" href="/">Register</a></span>
                        <span className="divider">|</span>
                        <span><a className="green" href="/">Employer site</a></span>
                    </div>
                </div>
            </div>
            <div className="tabs flex flex-jc-c">
                <div className="page">
                    <ul className="tab flex flex-row">
                        <li className="selected">Job Search</li>
                        <li>Profile</li>
                        <li>Career Advice</li>
                        <li>Company Reviews</li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;