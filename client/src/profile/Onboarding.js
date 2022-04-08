import './Onboarding.css';
import { useState } from 'react';
import { Error } from './Form';

function Onboarding() {

    const [visible, setVisible] = useState(true);
    const [current, setCurrent] = useState(false);
    const [visibilityOptions, setVisibilityOptions] = useState(false);

    const [firstName, setFirstName] = useState({ value: '', updated: false });
    const [lastName, setLastName] = useState({ value: '', updated: false });

    const [jobTitle, setJobTitle] = useState({ value: '', updated: false });
    const [company, setCompany] = useState({ value: '', updated: false });

    const [startMonth, setStartMonth] = useState({ value: '', updated: false });
    const [startYear, setStartYear] = useState({ value: '', updated: false });
    const [endMonth, setEndMonth] = useState({ value: '', updated: false });
    const [endYear, setEndYear] = useState({ value: '', updated: false });

    const [location, setLocation] = useState('');
    const [classification, setClassification] = useState('');
    const [subClassification, setSubclassification] = useState('');
    const [subClassificationOptions, setSubClassificationOptions] = useState();
    const [profileVisibility, setProfileVisibility] = useState('Select a profile visibility level');

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const years = Array(new Date().getFullYear() - 1970 + 1).fill().map((_, index) => 1970 + index);
    const locations = {
        'Australia - Major Cities': ['Sydney', 'Melbourne', 'Brisbane', 'Gold Coast', 'Perth', 'Adelaide', 'Hobart', 'Darwin', 'Canberra'],
        'Australia - Regional': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Northern Territory'],
        'New Zealand': [
            'Auckland', 'Northland', 'Waikato', 'Bay of Plenty', 'Gisborne', 'Hawkes Bay', 'Taranaki', 'Manawatu', 'Wellington', 'Tasman',
            'Mariborough', 'Canterbury', 'Otago', 'West Coast', 'Southland'
        ],
        'UK': ['London', 'Rest of the UK'],
        'Other': ['Asia Pacific', 'Americas', 'Europe & Russia', 'Ireland', 'Middle East & Africa']
    }
    const locationOptions = Object.keys(locations).map((location, index) => {
        return <optgroup key={index} label={location}>
            {locations[location].map((o, i) => <option key={i} value={o}>{o}</option>)}
        </optgroup>
    })
    const classifications = {
        'Accounting': ['Accounts Officers/Clerks','Accounts Payable'],
        'Administration & Office Support': [],
        'Advertising, Arts & Media': [],
        'Banking & Financial Services': [],
        'Call Centre & Customer Service': [],
        'CEO & General Management': [],
        'Community Services & Development': [],
        'Construction': [],
        'Consulting & Strategy': [],
        'Design & Architecture': [],
        'Education & Training': [],
        'Engineering': [],
        'Farming, Animals & Conservation': [],
        'Government & Defence': [],
        'Healthcare & Medical': [],
        'Hospitality & Tourism': [],
        'Human Resources & Recruitment': [],
        'Information & Communication Technology': [],
        'Insurance & Superannuation': [],
        'Legal': [],
        'Manufacturing, Transport & Logistics': [],
        'Marketing & Communications': [],
        'Mining, Resources & Energy': [],
        'Real Estate & Property': [],
        'Retail & Consumer Products': [],
        'Sales': [],
        'Science & Technology': [],
        'Self Employment': [],
        'Sport & Recreation': [],
        'Trades & Services': []
    }
    const classificationOptions = Object.keys(classifications).map((c, i) => {
        return <option key={i}>{c}</option>
    })

    const handleChange = (e) => {
        setClassification(e.target.value)
        setSubClassificationOptions(classifications[e.target.value].map((o, i) => {
            return <option key={i}>{o}</option>
        }));
    }

    return (
        <div className="onboarding">
            <div className="page">
                <form className="flex flex-col">
                    <div>
                        <h1>Almost done</h1>
                        <span className="medium">Be found by employers. Start a Find Profile.</span>
                    </div>
                    <div className="name flex flex-row">
                        <Input label="First name" value={firstName} onChange={setFirstName}/>
                        <Input label="Last name" value={lastName} onChange={setLastName}/>
                    </div>
                    <div className="line">
                        <span className="medium">Recent experience</span>
                        <div className="form-group flex flex-ai-c">
                            <div className="toggle-btn flex flex-ai-c">
                                <input className="exp" type="checkbox" checked={visible} onChange={() => setVisible(!visible)}/>
                                <span className="slider"></span>
                            </div>  
                            <label>I have experience</label>
                        </div>
                        {visible ? 
                            <>
                                <div className="">
                                    <Input label="Job title" value={jobTitle} onChange={setJobTitle} />
                                    <Input label="Company name" value={company} onChange={setCompany}/>
                                </div>
                                <div className="flex form-group flex-col">
                                    <label>Started</label>
                                    <div className="date flex flex-row">
                                        <div className="relative">
                                            <select className="form-control" value={startMonth.value} onChange={(e) => setStartMonth({ value: e.target.value, updated: true })}>
                                                <option value="" disabled>Month</option>
                                                {months.map((month, index) => {
                                                    return <option key={index} value={month}>{month}</option>
                                                })}
                                            </select>
                                            <span className="date-dropdown material-icons-outlined">expand_more</span>
                                        </div>
                                        <div className="relative">
                                            <select className="form-control" value={startYear.value} onChange={(e) => setStartYear({ value: e.target.value, updated: true })}>
                                                <option value="" disabled>Year</option>
                                                {years.map((year, index) => {
                                                    return <option key={index} value={year}>{year}</option>
                                                })}
                                            </select>
                                            <span className="date-dropdown material-icons-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex form-group flex-col">
                                    <div className={current ? 'hidden': undefined}>
                                        <label>Ended</label>
                                        <div className="date flex flex-row flex-ai-c">
                                            <div className="relative">
                                                <select className="form-control" value={endMonth.value} onChange={(e) => setEndMonth({ value: e.target.value, updated: true })}>
                                                    {months.map((month, index) => {
                                                        return <option key={index} value={month}>{month}</option>
                                                    })}
                                                </select>
                                                <span className="date-dropdown material-icons-outlined">expand_more</span>
                                            </div>
                                            <div className="relative">
                                                <select className="form-control" value={endYear.value} onChange={(e) => setEndYear({ value: e.target.value, updated: true })}>
                                                    <option value="" disabled>Year</option>
                                                    {years.map((year, index) => {
                                                        return <option key={index} value={year}>{year}</option>
                                                    })}
                                                </select>
                                                <span className="date-dropdown material-icons-outlined">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${current ? 'left' : undefined} current flex flex-row`}>
                                        <input type="checkbox" checked={current} onChange={() => setCurrent(!current)}/>
                                        <label>Still in role</label>
                                    </div>
                                </div>
                            </>
                        :
                            <div className="colour-card flex flex-row flex-ai-c">
                                <span className="material-icons-outlined">auto_awesome</span>
                                <span>New to the industry? That's fine. You can always add your work experience later in your Profile.</span>
                            </div>
                        }
                    </div>
                    <div className="line flex flex-col">
                        <Select label="Lives in" placeholder="Select location..." value={location} onChange={(e) => setLocation(e.target.value)}>
                            {locationOptions}
                        </Select>
                    </div>
                    <div className="flex flex-col">
                        <Select label="Preferred classification" placeholder="Select classification" value={classification} onChange={handleChange}>
                            {classificationOptions}
                        </Select>
                        <Select label="Sub-classification" placeholder="Select sub-classification" value={subClassification} onChange={(e) => setSubclassification(e.target.value)}>
                            {subClassificationOptions}
                        </Select>
                    </div>
                    <div className="line flex flex-col">
                        <div className="form-group flex flex-col">
                            <label>Profile visibility</label>
                            <span>Your profile visibility setting controls if employers can approach you with job opportunities</span>
                            <div className="relative">
                                <div className="visibility form-control" onClick={() => setVisibilityOptions(!visibilityOptions)}>
                                    <span>{profileVisibility}</span>
                                </div>
                                <span className="material-icons-outlined">expand_more</span>
                                {visibilityOptions && <div className="visibility-dropdown">
                                    <ul>
                                        <li className="visibility-option" onClick={() => { setProfileVisibility('Standard'); setVisibilityOptions(!visibilityOptions); }}>
                                            <div className="flex flex-row flex-ai-c">
                                                <span><b>Standard</b></span>
                                                <span className="recommend">Recommended</span>
                                            </div>
                                            <span className="grey">Employers can view my Profile and resume and can contact me directly or via Find.</span>
                                        </li>
                                        <li className="visibility-option" onClick={() => { setProfileVisibility('Limited'); setVisibilityOptions(!visibilityOptions); }}>
                                            <span><b>Limited</b></span>
                                            <span className="grey">Employers can view my Profile, but not my resume and can only contact me via Find.</span>
                                        </li>
                                        <li className="visibility-option" onClick={() => { setProfileVisibility('Hidden'); setVisibilityOptions(!visibilityOptions); }}>
                                            <span><b>Hidden</b></span>
                                            <span className="grey">Employers cannot search for me. My Profile can only be seen by employers as part of my applications.</span>
                                        </li>
                                    </ul>
                                </div>}
                            </div>
                            <span className="small">For all settings, your Profile including any verified credentials will be sent to the employer with your applications. <a className="green" href="/">Learn more about visibility.</a></span>
                        </div>
                    </div>
                    <div className="action">
                        <button className="bg-black white btn">Save and continue</button>
                        <a href="/">Do it later</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

function Input(props) {

    const { label, value, onChange } = props;

    return (
        <div className="form-group flex flex-col">
            <label>{label}</label>
            <input className={`${value.updated && value.value.length === 0 && 'invalid'} form-control`} type="text" value={value.value} onChange={(e) => onChange({ value: e.target.value, updated: true})}/>
            <Error field={value}/>
        </div>
    )
}

function Select(props) {

    const { label, placeholder, value, onChange } = props;

    return (
        <div className="form-group flex flex-col">
            <label>{label}</label>
            <select className="form-control" value={value} onChange={onChange} required>
                <option value="" disabled>{placeholder}</option>
                {props.children}
            </select>
            <span className="option-dropdown material-icons-outlined">expand_more</span>
        </div>
    )
}

export default Onboarding;