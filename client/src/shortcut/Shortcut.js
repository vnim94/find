import './Shortcut.css';
import { useState } from 'react';

function Shortcut() {

    const [expanded, setExpanded] = useState(false);
    const [visible, setVisible] = useState(false);

    const classifications = [
        'Accounting',
        'Administration & Office Support',
        'Advertising, Arts & Media',
        'Banking & Financial Services',
        'Call Centre & Customer Service',
        'CEO & General Management',
        'Community Services & Development',
        'Construction',
        'Consulting & Strategy',
        'Design & Architecture',
        'Education & Training',
        'Engineering',
        'Farming, Animals & Conservation',
        'Government & Defence',
        'Healthcare & Medical',
        'Hospitality & Tourism',
        'Human Resources & Recruitment',
        'Information & Communication Technology',
        'Insurance & Superannuation',
        'Legal',
        'Manufacturing, Transport & Logistics',
        'Marketing & Communications',
        'Mining, Resources & Energy',
        'Real Estate & Property',
        'Retail & Consumer Products',
        'Sales',
        'Science & Technology',
        'Self Employment',
        'Sport & Recreation',
        'Trades & Services'
    ];
    const cities = [
        'Sydney',
        'Melbourne',
        'Brisbane',
        'Gold Coast',
        'Perth',
        'Adelaide',
        'Hobart',
        'Darwin',
        'Canberra'
    ];
    const others = [
        'Covid 19',
        'All Jobs',
        'Graduate / Entry Level',
        'Volunteer',
        'Search by Recruiter'
    ]

    const handleClick = () => {
        setExpanded(!expanded);
        setVisible(!visible);
    }

    return (
        <div className="shortcuts">
            <div className="page">
                <div>
                    <span><b>Quick search</b></span>
                </div>
                <div className="shortcut flex">
                    <div className="shortcut-link-type">
                        <span>Classifications</span>
                    </div>
                    <div className="shortcut-links flex flex-row">
                        <a>Accounting</a>
                        <a>Education &amp; Training</a>
                        <a>Government &amp; Defence</a>
                        <a>Healthcare &amp; Medical</a>
                        <a>Sales</a>
                        <div className="all flex flex-ai-c" onClick={handleClick}>
                            <span>View all</span>
                            <span className={`${expanded && 'expand'} medium material-icons-outlined`}>expand_more</span>
                        </div>
                    </div>
                </div>
                {visible && 
                <div className="all-shortcuts-links flex flex-row">
                    {classifications.map((classification, index) => {
                        return <a key={index} className="shortcut-link" href="/">{classification}</a>
                    })}
                </div>
                }
                <div className="shortcut flex">
                    <div className="shortcut-link-type">
                        <span>Major cities</span>
                    </div>
                    <div className="shortcut-links">
                    {cities.map((city, index) => {
                        return <a key={index} href="/">{city}</a>
                    })}
                    </div>
                </div>
                <div className="shortcut flex">
                    <div className="shortcut-link-type">
                        <span>Other</span>
                    </div>
                    <div className="shortcut-links">
                    {others.map((other, index) => {
                        return <a key={index} href="/">{other}</a>
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shortcut;