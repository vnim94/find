import './Onboarding.css';
import { useState } from 'react';

function Onboarding() {

    const [visible, setVisible] = useState(true);
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

    return (
        <div className="onboarding">
            <div className="page flex flex-jc-c">
                <form className="flex flex-col">
                    <div>
                        <h1>Almost done</h1>
                        <span className="medium">Be found by employers. Start a Find Profile.</span>
                    </div>
                    <div className="name flex flex-row">
                        <Input text="First name" />
                        <Input text="Last name" />
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
                                    <Input text="Job title" />
                                    <Input text="Company name" />
                                </div>
                                <div className="flex form-group flex-col">
                                    <label>Started</label>
                                    <div className="date flex flex-row">
                                        <select className="form-control">
                                            {months.map((month, index) => {
                                                return <option key={index} value={month}>{month}</option>
                                            })}
                                        </select >
                                        <select className="form-control"></select>
                                    </div>
                                </div>
                                <div className="flex form-group flex-col">
                                    <label>Ended</label>
                                    <div className="date flex flex-row flex-ai-c">
                                        <select className="form-control">
                                            {months.map((month, index) => {
                                                return <option key={index} value={month}>{month}</option>
                                            })}
                                        </select>
                                        <select className="form-control"></select>
                                        <div className="flex flex-row flex-ai-c">
                                            <input className="current" type="checkbox" />
                                            <label>Still in role</label>
                                        </div>
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
                        <Select text="Lives in" placeholder="Select location..."/>
                    </div>
                    <div className="flex flex-col">
                        <Select text="Preferred classification" placeholder="Select classification"/>
                        <Select text="Sub-classification" placeholder="Select sub-classification"/>
                    </div>
                    <div className="line flex flex-col">
                        <div className="form-group flex flex-col">
                            <label>Profile visibility</label>
                            <span>Your profile visibility setting controls if employers can approach you with job opportunities</span>
                            <input className="form-control" placeholder="Select a profile visibility level" />
                            <span className="small">For all settings, your Profile including any verified credentials will be setn to the employer with your applications.<a>Learn more about visibility.</a></span>
                        </div>
                    </div>
                    <div>
                        <button className="btn">Save and continue</button>
                        <a href="/">Do it later</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

function Input(props) {
    return (
        <div className="form-group flex flex-col">
            <label>{props.text}</label>
            <input className="form-control" type="text"/>
        </div>
    )
}

function Select(props) {

    const { text, placeholder } = props;

    return (
        <div className="form-group flex flex-col">
            <label>{text}</label>
            <select className="form-control">
                <option value="" selected={true}>{placeholder}</option>
            </select>
        </div>
    )
}

export default Onboarding;