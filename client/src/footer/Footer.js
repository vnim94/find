import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="page flex flex-col">
                <div className="flex flex-row">
                    <div className="column">
                        <span><b>Tools</b></span>
                        <a className="footer-link" href="/">Job search</a>
                        <a className="footer-link" href="/">Profile</a>
                        <a className="footer-link" href="/">Recommended jobs</a>
                        <a className="footer-link" href="/">Saved searches</a>
                        <a className="footer-link" href="/">Saved jobs</a>
                        <a className="footer-link" href="/">Applied jobs</a>
                        <a className="footer-link" href="/">Career Advice</a>
                        <a className="footer-link" href="/">Explore Careers</a> 
                        <a className="footer-link" href="/">Company reviews</a>
                        <div className="expandable-link flex flex-ai-c">
                            <a className="footer-link" href="/">Download apps</a> 
                            <span className="material-icons-outlined">expand_more</span>
                        </div>
                        <div className="expandable-link flex flex-ai-c">
                            <a className="footer-link" href="/">Find sites</a>
                            <span className="material-icons-outlined">expand_more</span>
                        </div>
                    </div>
                    <div className="column">
                        <span><b>Company</b></span>
                        <a className="footer-link" href="/">About Find</a>
                        <a className="footer-link" href="/">Newsroom</a>
                        <a className="footer-link" href="/">Investors</a>
                        <div className="expandable-link flex flex-ai-c">
                            <a className="footer-link" href="/">International partners</a>
                            <span className="material-icons-outlined">expand_more</span>
                        </div>
                        <div className="expandable-link flex flex-ai-c">
                            <a className="footer-link" href="/">Partner services</a>
                            <span className="material-icons-outlined">expand_more</span>
                        </div>
                    </div>
                    <div className="column">
                        <span><b>Connect</b></span>
                        <a className="footer-link" href="/">Help centre</a>
                        <a className="footer-link" href="/">Contact us</a>
                        <a className="footer-link" href="/">Work for Find</a>
                        <a className="footer-link" href="/">Product &amp; Tech Blog</a>
                        <a className="footer-link" href="/">Find videos</a>
                        <div className="expandable-link flex flex-ai-c">
                            <a className="footer-link" href="/">Social</a>
                            <span className="material-icons-outlined">expand_more</span>
                        </div>
                    </div>
                    <div className="column">
                        <span><b>Employers</b></span>
                        <a className="footer-link" href="/">Register for free</a>
                        <a className="footer-link" href="/">Post a job as</a>
                        <a className="footer-link" href="/">Products &amp; prices</a>
                        <a className="footer-link" href="/">Customer service</a>
                        <a className="footer-link" href="/">Hiring Advice</a>
                        <a className="footer-link" href="/">Market Insights</a>
                        <a className="footer-link" href="/">Recruitment software partners</a>
                    </div>
                </div>
                <div className="terms">
                    <a className="footer-link" href="/">Privacy</a>
                    <a className="footer-link" href="/">Terms &amp; Conditions</a>
                    <a className="footer-link" href="/">Protect yourself online</a>
                    <span>© Find. All rights reserved</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;