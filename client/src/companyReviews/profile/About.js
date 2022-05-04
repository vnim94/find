function About() {
    return (<>
        <div className="company-profile-section flex-col">
            <span className="large">Company Overview</span>
            <table>
                <tbody className="company-profile-details">
                    <tr>
                        <th>Website</th>
                        <td><a href="http://seek.com.au">http://seek.com.au</a></td>
                    </tr>
                    <tr>
                        <th>Industry</th>
                        <td>Advertising, Arts &amp; Media</td>
                    </tr>
                    <tr>
                        <th>Company Size (Aus &amp; NZ)</th>
                        <td>1,0001-5,000 employees</td>
                    </tr>
                    <tr>
                        <th>Primary Location</th>
                        <td>60 Cremorne St, Cremorne, VIC 3121</td>
                    </tr>
                    <tr>
                        <th>Specialities</th>
                        <td>Online Employment Classifieds, Job Boards, Education</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <p>
                    SEEK's portfolio of diverse businesses make a positive impact on a truly global scale.
                    Our purpose is to help people live more fulfilling and productive working lives and helps organisations succeed.
                    We create world-class technology solutions to connect more people to relevant employment, education, small business and volunteer opportunities.

                    We have a culture of high-performance in our workplaces and celebrate the diversity of our employees who contribute to the success of our organisation.
                </p>
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Our mission statement</span>
            <p>We help people live more fulfilling and productive working lives and help organisations succeed.</p>
        </div>
        <div className="company-profile-section flex-col">
            <div className="flex flex-ai-c flex-jc-sb">
                <span className="large">Reviews</span>
                <a href="/">See all reviews</a>
            </div>
            <div className="flex flex-jc-sb">
                <div>average rating</div>
                <div>ratings overview</div>
                <div>salary rating %</div>
                <div>recommended %</div>
            </div>
            <div>
                <span className="small">Your trust is our main concern so these ratings for Find are shared 'as is' from employees in line with our <a href="/">community guidelines</a></span>
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Featured</span>
        </div>
        <div className="company-profile-section flex-col">
            <div className="flex flex-ai-c flex-jc-sb">
                <span className="large">SEEK Photos</span>
                <a href="/">See all photos</a>
            </div>
        </div>
    </>)
}



export default About;