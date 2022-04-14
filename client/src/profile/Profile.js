import './Profile.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { VisibilityDropdown, Input, Select, Callout } from './Onboarding';
import { Error } from './Form';

function Profile() {

    const user = useSelector(state => state.user.details);

    const newValue = (value='') => {
        return {
            value: value,
            updated: false
        }
    }

    const [hidden, setHidden] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState('Standard');

    const [editPersonalDetails, setEditPersonalDetails] = useState(false);
    const [editSummary, setEditSummary] = useState(false);
    const [addRole, setAddRole] = useState(false);
    const [addEducation, setAddEducation] = useState(false);
    const [addLicence, setAddLicence] = useState(false);
    const [addSkills, setAddSkills] = useState(false);
    const [addLanguage, setAddLanguage] = useState(false);
    const [addResume, setAddResume] = useState(false);
    const [editPreferences, setEditPreferences] = useState(false);

    const [firstName, setFirstName] = useState(newValue());
    const [lastName, setLastName] = useState(newValue());
    const [location, setLocation] = useState(newValue());
    const [countryCode, setCountryCode] = useState(newValue())
    const [phone, setPhone] = useState(newValue());

    const [jobTitle, setJobTitle] = useState(newValue());

    return  (
        <div className="bg-pale-grey profile">
            <div className="profile-banner">
                <div className="page">
                    <h1>{user.firstName ? user.fullName : user.email.split('@')[0]}</h1>
                    <div className="flex flex-col">
                        <span>{user.location}</span>
                        <span>{user.email}</span>
                    </div>
                    <button className="bg-light-green black btn-outline btn" onClick={() => setEditPersonalDetails(true)}>Edit personal details</button>
                </div>
            </div>
            <div className="page flex flex-col">
                <div className="bg-pale-grey flex flex-row">
                    <div className="profile-details">
                        {editPersonalDetails &&
                        <div className="profile-card"> 
                            <Edit heading="Edit personal details" toggle={setEditPersonalDetails}>
                                <Callout icon="info">
                                    <span>Phone number has been updated to include a country code</span>
                                </Callout>
                                <div className="flex flex-row">
                                    <Input label="First name" value={firstName} onChange={setFirstName}/>
                                    <Input label="Last name" value={lastName} onChange={setLastName}/>
                                </div>
                                <Select label="Lives in" placeholder="Select location..." value={location} onChange={setLocation} />
                                <div className="flex flex-row">
                                    <div className="phone flex flex-col">
                                        <label>
                                            <span>Phone number</span>
                                            <span className="grey">(recommended)</span>
                                        </label>
                                        <div className="flex flex-row">
                                            <div className="form-group">
                                                <select className="form-control" value={countryCode} onChange={(e) => setCountryCode({ value: e.target.value, updated: true })} required>
                                                    <option value="" disabled>Select country code</option>
                                                </select>
                                                <span className="option-dropdown material-icons-outlined">expand_more</span>
                                            </div>
                                            <div className="form-group">
                                                <div className="country-code">
                                                    <span>123</span> 
                                                </div>
                                                <input className={`${phone.updated && phone.value.length === 0 && 'invalid'} form-control`} type="text" value={phone.value} onChange={(e) => setPhone({ value: e.target.value, updated: true})}/>
                                                <Error field={phone}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group flex flex-col">
                                    <label>Email address</label>
                                    <span>victor.nim01@gmail.com</span>
                                </div>
                                <Callout icon="info">
                                    <span>Change you email, password or delete your account in settings</span>
                                </Callout>
                            </Edit>
                        </div>}
                        <div className="bg-pale-green profile-card">
                            <span className="medium">Create a new resume from your Find Profile</span>
                            <div className="flex flex-row flex-ai-c">
                                <button className="bg-dark-green white btn">Get started</button>
                                <span>Or, upload your resume</span>
                            </div>
                        </div>
                        <div className="profile-card">
                            {editSummary ? 
                                <Edit heading="Add personal summary" toggle={setEditSummary}>
                                    <span><b>Summary</b></span>
                                    <span>Highlight your unique experiences, ambitions and strengths</span>
                                    <textarea></textarea>
                                </Edit>
                            :
                                <Card button="Add summary" heading="Personal summary" toggle={setEditSummary}>
                                    <span>Add a personal summary to your profile as a way to introduce who you are</span>
                                </Card>
                            }
                        </div>
                        <div className="profile-card">
                            {addRole ?
                                <Edit heading="Add role" toggle={setAddRole}>
                                    <Input label="Job title" value={jobTitle} onChange={setJobTitle}/>
                                </Edit>
                            :
                                <Card button="Add role" heading="Career history" toggle={setAddRole}>
                                    <div className="role">
                                    </div>
                                </Card>
                            }
                        </div>
                        <div className="profile-card">
                            {addEducation ?
                                <Edit heading="Add education" toggle={setAddEducation}>

                                </Edit>
                            :
                                <Card button="Add education" heading="Education" toggle={setAddEducation}>
                                    <span>Tell employers about your education.</span>
                                </Card> 
                            }
                        </div>
                        <div className="profile-card">
                            {addLicence ?
                                <Edit heading="Add licence or certification" toggle={setAddLicence}>

                                </Edit>
                            :
                                <Card button="Add licence or certification" heading="Licence &amp; certification" toggle={setAddLicence}>
                                    <Callout icon="auto_awesome">
                                        <span>Add you COVID-19 vaccination status.</span>
                                        <a className="underline" href="/">Learn more</a>
                                    </Callout>
                                </Card> 
                            }
                        </div>
                        <div className="profile-card">
                            {addSkills ?
                                <Edit heading="Add skill" toggle={setAddSkills}>

                                </Edit>
                            :
                                <Card button="Add skill" heading="Skills" toggle={setAddSkills}>
                                    <Callout icon="auto_awesome">
                                        <span>Building your Find Profile is now easier with skills suggested based on your roles.</span>
                                        <span className="skills underline"><b>View suggested skills</b></span>
                                    </Callout>
                                </Card> 
                            }
                        </div>
                        <div className="profile-card">
                            {addLanguage ?
                                <Edit heading="Add language" toggle={setAddLanguage}>

                                </Edit>
                            :
                                <Card button="Add language" heading="Languages" toggle={setAddLanguage}>
                                    <span>Add languages to appeal to more companies and employers.</span>
                                </Card> 
                            }
                        </div>
                        <div className="profile-card">
                            {addResume ?
                                <Edit heading="Add resumé" toggle={setAddResume}>

                                </Edit>
                            :
                                <Card button="Add resumé" heading="Resumé" toggle={setAddResume}>
                                </Card> 
                            }
                        </div>
                        <div className="profile-card">
                            {editPreferences ?
                                <Edit heading="About your next role" toggle={setEditPreferences}>

                                </Edit>
                            :
                                <Card button="Add or edit preferences" heading="About your next role" toggle={setEditPreferences}>
                                    <table className="next-role">
                                        <tbody>
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
                                        </tbody>
                                    </table>
                                </Card> 
                            }
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
                                <button className="btn-outline bg-white dark-green btn">Add salary</button>
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

function Card(props) {

    const { children, button, heading, toggle } = props;

    return (
        <>
            <span className="medium">{heading}</span>
            {children}
            <div>
                <button className="btn-outline bg-white dark-green btn" onClick={() => toggle(true)}>{button}</button>
            </div>
        </>
    )
}

function Edit(props) {

    const { children, heading, toggle } = props;

    return (
        <form>
            <span className="medium">{heading}</span>
            {children}
            <div>
                <button className="bg-dark-green white btn">Save</button>
                <button className="bg-white dark-green btn" onClick={() => toggle(false)}>Cancel</button>
            </div>
        </form>
    )
}

export default Profile;