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
        <div className="bg-grey-2 flex justify-center">
            <div className="w-[992px] py-5">
                <div>
                    <span><b>Quick search</b></span>
                </div>
                <div className="grid grid-cols-[1fr_6fr] items-center">
                    <div className="text-sm">
                        <span>Classifications</span>
                    </div>
                    <div className="text-sm text-green-4 flex flex-row items-center space-x-10">
                        <a className="hover:underline" href="/">Accounting</a>
                        <a className="hover:underline" href="/">Education &amp; Training</a>
                        <a className="hover:underline" href="/">Government &amp; Defence</a>
                        <a className="hover:underline" href="/">Healthcare &amp; Medical</a>
                        <a className="hover:underline" href="/">Sales</a>
                        <div className="all flex items-center hover:cursor-pointer" onClick={handleClick}>
                            <span className="text-green-4 hover:underline">View all</span>
                            <span className={`${expanded && 'rotate-180'} transition material-icons-outlined`}>expand_more</span>
                        </div>
                    </div>
                </div>
                {visible && 
                <div className="grid grid-cols-3 my-2">
                    {classifications.map((classification, index) => {
                        return <a key={index} className="my-1 text-sm text-green-4 hover:underline" href="/">{classification}</a>
                    })}
                </div>
                }
                <div className="grid grid-cols-[1fr_6fr]">
                    <div className="text-sm">
                        <span>Major cities</span>
                    </div>
                    <div className="text-sm flex space-x-10">
                        {cities.map((city, index) => {
                            return <a key={index} className="text-green-4 hover:underline" href="/">{city}</a>
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_6fr]">
                    <div className="text-sm">
                        <span>Other</span>
                    </div>
                    <div className="text-sm flex space-x-10">
                        {others.map((other, index) => {
                            return <a key={index} className="text-green-4 hover:underline" href="/">{other}</a>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shortcut;