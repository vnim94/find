import './Onboarding.css';
import { useState } from 'react';
import { Error } from './Form';

function Onboarding() {

    const [visible, setVisible] = useState(true);
    const [current, setCurrent] = useState(false);
    const [visibilityOptions, setVisibilityOptions] = useState(false);

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

    const [firstName, setFirstName] = useState({ value: '', updated: false });
    const [lastName, setLastName] = useState({ value: '', updated: false });

    const [jobTitle, setJobTitle] = useState({ value: '', updated: false });
    const [company, setCompany] = useState({ value: '', updated: false });

    const [startMonth, setStartMonth] = useState({ value: '', updated: false });
    const [startYear, setStartYear] = useState({ value: '', updated: false });
    const [endMonth, setEndMonth] = useState({ value: '', updated: false });
    const [endYear, setEndYear] = useState({ value: '', updated: false });

    const [location, setLocation] = useState({ value: '', updated: false });
    const [classification, setClassification] = useState({ value: '', updated: false });
    const [subClassification, setSubclassification] = useState({ value: '', updated: false });
    const [profileVisibility, setProfileVisibility] = useState({ value: '', updated: false });

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
                                    <div className={current && 'hidden'}>
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
                                    <div className={`${current && 'left'} current flex flex-row`}>
                                        <input type="checkbox" onChange={() => setCurrent(!current)}/>
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
                        <Select label="Lives in" placeholder="Select location..."/>
                    </div>
                    <div className="flex flex-col">
                        <Select label="Preferred classification" placeholder="Select classification"/>
                        <Select label="Sub-classification" placeholder="Select sub-classification"/>
                    </div>
                    <div className="line flex flex-col">
                        <div className="form-group flex flex-col">
                            <label>Profile visibility</label>
                            <span>Your profile visibility setting controls if employers can approach you with job opportunities</span>
                            <div className="relative">
                                <div className="visibility form-control" onClick={() => setVisibilityOptions(!visibilityOptions)}>
                                    <span>Select a profile visibility level</span>
                                </div>
                                <span className="material-icons-outlined">expand_more</span>
                                {visibilityOptions && <div className="visibility-dropdown">
                                    <ul>
                                        <li className="visibility-option">
                                            <div className="flex flex-row flex-ai-c">
                                                <span><b>Standard</b></span>
                                                <span className="recommend">Recommended</span>
                                            </div>
                                            <span className="grey">Employers can view my Profile and resume and can contact me directly or via Find.</span>
                                        </li>
                                        <li className="visibility-option">
                                            <span><b>Limited</b></span>
                                            <span className="grey">Employers can view my Profile, but not my resume and can only contact me via Find.</span>
                                        </li>
                                        <li className="visibility-option">
                                            <span><b>Hidden</b></span>
                                            <span className="grey">Employers cannot search for me. My Profile can only be seen by employers as part of my applications.</span>
                                        </li>
                                    </ul>
                                </div>}
                            </div>
                            <span className="small">For all settings, your Profile including any verified credentials will be sent to the employer with your applications.<a>Learn more about visibility.</a></span>
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

    const { label, placeholder } = props;
    const [selected, setSelected] = useState('');

    return (
        <div className="form-group flex flex-col">
            <label>{label}</label>
            <select className="form-control" value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="">{placeholder}</option>
            </select>
            <span className="option-dropdown material-icons-outlined">expand_more</span>
        </div>
    )
}

export default Onboarding;