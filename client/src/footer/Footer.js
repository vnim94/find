import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="page flex flex-col">
                <div className="flex flex-row">
                    <div className="column">
                        <span><b>Tools</b></span>
                        <a href="/">Job search</a>
                        <a href="/">Profile</a>
                        <a href="/">Recommended jobs</a>
                        <a href="/">Saved searches</a>
                        <a href="/">Saved jobs</a>
                        <a href="/">Applied jobs</a>
                        <a href="/">Career Advice</a>
                        <a href="/">Explore Careers</a> 
                        <a href="/">Company reviews</a>
                        <a href="/">Download apps</a> 
                        <a href="/">Find sites</a>
                    </div>
                    <div className="column">
                        <span><b>Company</b></span>
                        <a href="/">About Find</a>
                        <a href="/">Newsroom</a>
                        <a href="/">Investors</a>
                        <a href="/">International partners</a>
                        <a href="/">Partner services</a>
                    </div>
                    <div className="column">
                        <span><b>Connect</b></span>
                        <a href="/">Help centre</a>
                        <a href="/">Contact us</a>
                        <a href="/">Work for Find</a>
                        <a href="/">Product &amp; Tech Blog</a>
                        <a href="/">Find videos</a>
                        <a href="/">Social</a>
                    </div>
                    <div className="column">
                        <span><b>Employers</b></span>
                        <a href="/">Register for free</a>
                        <a href="/">Post a job as</a>
                        <a href="/">Products &amp; prices</a>
                        <a href="/">Customer service</a>
                        <a href="/">Hiring Advice</a>
                        <a href="/">Market Insights</a>
                        <a href="/">Recruitment software partners</a>
                    </div>
                </div>
                <div className="terms">
                    <a href="/">Privacy</a>
                    <a href="/">Terms &amp; Conditions</a>
                    <a href="/">Protect yourself online</a>
                    <span>© Find. All rights reserved</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;