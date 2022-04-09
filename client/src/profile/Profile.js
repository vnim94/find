import './Profile.css';
import { useState } from 'react';
import { VisibilityDropdown } from './Onboarding';

function Profile() {

    const [hidden, setHidden] = useState(false);
    const [profileVisibility, setProfileVisibility] = useState('Standard');

    return  (
        <div className="bg-lighter-grey profile">
            <div className="profile-banner">
                <div class="page">
                    <h1>Victor Nim</h1>
                    <div className="flex flex-col">
                        <span>All Melbourne</span>
                        <span>victor.nim01@gmail.com</span>
                    </div>
                    <button className="btn">Edit personal details</button>
                </div>
            </div>
            <div className="page flex flex-col">
                <div className="bg-lighter-grey flex flex-row">
                    <div className="profile-details">
                        <div className="bg-pale-green profile-card">
                            <span className="medium">Create a new resume from your Find Profile</span>
                            <div className="flex flex-row flex-ai-c">
                                <button className="bg-dark-green white btn">Get started</button>
                                <span>Or, upload your resume</span>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Personal summary</span>
                            <span>Add a personal summary to your profile as a way to introduce who you are</span>
                            <div>
                                <button className="bg-white dark-green btn">Add summary</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Career history</span>
                            <div className="role">

                            </div>
                            <div>
                                <button className="bg-white dark-green btn">Add role</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Education</span>
                            <span>Tell employers about your education.</span>
                            <div>
                                <button className="bg-white dark-green btn">Add education</button>
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
                                    <span className="skills underline"><b>View suggested skills</b></span>
                                </div>
                            </div>
                            <div></div>
                            <div>
                                <button className="bg-white dark-green btn">Add skills</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Languages</span>
                            <span>Add languages to appeal to more companies and employers.</span>
                            <div>
                                <button className="bg-white dark-green btn">Add language</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">Resume</span>
                            <div>
                                <button className="bg-white dark-green btn">Add resume</button>
                            </div>
                        </div>
                        <div className="profile-card">
                            <span className="medium">About your next role</span>
                            <table className="next-role">
                                <tr>
                                    <th>Availability</th>
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
                                <button className="bg-white dark-green btn">Add or edit preferences</button>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar">
                        <div className="card">
                            <span className="medium">Profile visibility</span>
                            <span>Your profile visibility setting controls if employers can approach you with job opportunities</span>
                            <div className="flex flex-col">
                                <div className="profile-visibility relative flex flex-row flex-jc-sb">
                                    <span><b>{profileVisibility}</b></span>
                                    <div className="select-visibility flex flex-row" onClick={() => setHidden(!hidden)}>
                                        <span>Select</span>
                                        <span className={`${!hidden ? 'expand' : undefined} select-visibility-arrow material-icons-outlined`}>expand_more</span>
                                    </div>
                                    {!hidden && <VisibilityDropdown value={profileVisibility} setValue={setProfileVisibility} setHidden={setHidden}/>}
                                </div>
                                <span>For all settings, your Profile including any verified credentials will be sent to the employer with you applications.</span>
                                <a className="green" href="/">Learn more about visibility</a>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <span>Profile strength: <b>Silver</b></span>
                            </div>
                            <div className="flex flex-row flex-ai-c flex-jc-sb">
                                <span className="grey material-icons-outlined">star</span>
                                <div className="completion">
                                    <div></div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="flex flex-col">
                                <span>Add a minimum salary to appear in more searches by employers.</span>
                                <button className="bg-white dark-green btn">Add salary</button>
                                <div className="flex flex-jc-c">
                                    <span className="dark-green">Next tip</span>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;