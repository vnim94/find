import './Profile.css';

function Profile() {
    return  (
        <div className="profile">
            <div className="page flex flex-col">
                <div className="profile-banner">
                    <h1>Victor Nim</h1>
                    <div className="flex flex-col">
                        <span>All Melbourne</span>
                        <span>victor.nim01@gmail.com</span>
                    </div>
                    <button className="btn">Edit personal details</button>
                </div>
                <div className="flex flex-row">
                    <div className="profile-details">
                        <div className="bg-light-grey profile-card">
                            <span className="medium">Create a new resume from your Find Profile</span>
                            <div className="flex flex-row flex-ai-c">
                                <button className="btn">Get started</button>
                                <span>Or, upload your resume</span>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Personal summary</span>
                            <span>Add a personal summary to your profile as a way to introduce who you are</span>
                            <div>
                                <button className="btn">Add summary</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Career history</span>
                            <div className="role">

                            </div>
                            <div>
                                <button className="btn">Add role</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Education</span>
                            <span>Tell employers about your education.</span>
                            <div>
                                <button className="btn">Add education</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Licences &amp; certifications</span>
                            <div className="colour-card flex flex-row">
                                <div>
                                    <span className="material-icons-outlined">auto_awesome</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>Add you COVID-19 vaccination status.</span>
                                    <a className="underline" href="/">Learn more</a>
                                </div>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Skills</span>
                            <div className="colour-card flex flex-row">
                                <div>
                                    <span className="material-icons-outlined">info</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>Building your Find Profile is now easier with skills suggested based on your roles.</span>
                                    <span className="underline" href="/"><b>View suggested skills</b></span>
                                </div>
                            </div>
                            <div></div>
                            <div>
                                <button className="btn">Add skills</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Languages</span>
                            <span>Add languages to appeal to more companies and employers.</span>
                            <div>
                                <button className="btn">Add language</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Resume</span>
                            <div>
                                <button className="btn">Add resume</button>
                            </div>
                        </div>
                        <div className="border profile-card">
                            <span className="medium">About your next role</span>
                            <table className="next-role">
                                <tr>
                                    <th className="border">Availability</th>
                                    <td>Not specified</td>
                                    <td>Add</td>
                                </tr>
                                <tr>
                                    <th>Preferred work type</th>
                                    <td>Not specified</td>
                                    <td>Add</td>
                                </tr>
                                <tr>
                                    <th>Preferred work types</th>
                                    <td>Not specified</td>
                                    <td>Add</td>
                                </tr>
                                <tr>
                                    <th>Right to work</th>
                                    <td>Not specified</td>
                                    <td>Add</td>
                                </tr>
                                <tr>
                                    <th>Salary expectation</th>
                                    <td>Not specified</td>
                                    <td>Add</td>
                                </tr>
                                <tr>
                                    <th>Classification of interest</th>
                                    <td>Not specified</td>
                                    <td>Add</td>
                                </tr>
                                <tr>
                                    <th>Approachability</th>
                                    <td>Not specified</td>
                                    <td>Add</td>
                                </tr>
                            </table>
                            <div>
                                <button className="btn">Add or edit preferences</button>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar">
                        <div className="card">
                            <span className="medium">Profile visibility</span>
                            <span>Your profile visibility setting controls if employers can approach you with job opportunities</span>
                            <div className="flex flex-col">
                                <span><b>Standard</b></span>
                                <div className="flex flex-row">
                                    <span>Select</span>
                                    <span className="material-icons-outlined">expand_more</span>
                                </div>
                                <span>For all settings, your Profile including any verified credentials will be sent to the employer with you applications.</span>
                                <a href="/">Learn more about visibility</a>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <span>Profile strength: <b>Silver</b></span>
                            </div>
                            <hr></hr>
                            <div>
                                <span>Add a minimuim salary to appear in more searches by employers.</span>
                                <button className="btn">Add salary</button>
                                <button className="btn">Next tip</button>    
                            </div>
                        </div>
                        <div className="card">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;