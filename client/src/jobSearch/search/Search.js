import './Search.css';
import Dropdown from './Dropdown';
import Options from './Options';
import { useState } from 'react';

function Search(props) {

    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(props.expanded);
    const [industries, setIndustries] = useState([]);

    const data = { 
        'Accounting': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Accounts Officers/Clerks', 'Accounts Payable']
        }, 
        'Administration & Office Support': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Administrative Assistant', 'Client & Sales Administration'] 
        },
        'Advertising, Arts & Media': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Agency Account Management', 'Art Direction'] 
        },
        'Banking & Financial Services': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Account & Relationship Management', 'Analysis & Reporting'] 
        },
        'Call Centre & Customer Service': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Collections', 'Customer Service - Call Center'] 
        },
        'CEO & General Management': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Board Appointments', 'CEO'] 
        },
       'Community Services & Development': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Aged & Disability Support', 'Child Welfare, Youth & Family Services'] 
        },
        'Construction': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Contracts Management', 'Estimating'] 
        },
        'Consulting & Strategy': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Analysts', 'Corporate Development'] 
        },
        'Design & Architecture': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Architectural Drafting', 'Architecture'] 
        },
        'Education & Training': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Childcare & Outside School Hours Care', 'Library Services & Information Management'] 
        },
        'Engineering': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Aerospace Engineering', 'Automative Engineering'] 
        },
        'Farming, Animals & Conservation': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Agronomy & Farm Services', 'Conservation, Parks & Wildlife'] 
        },
        'Government & Defence': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Air Force', 'Army'] 
        },
        'Healthcare & Medical': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Ambulance/Paramedics', 'Chiropractic & Osteopathic'] 
        },
        'Hospitality & Tourism': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Airlines', 'Bar & Beverage Staff'] 
        },
        'Human Resources & Recruitment': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Consulting & Generalist HR', 'Industrial & Employee Relations'] 
        },
        'Information & Communication Technology': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Architects', 'Business/System Analysts'] 
        },
        'Insurance & Superannuation': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Actuarial', 'Assessment'] 
        },
        'Legal': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Banking & Finance Law', 'Construction Law'] 
        },
        'Manufacturing, Transport & Logistics': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Analysis & Reporting', 'Assembly & Process Work'] 
        },
        'Marketing & Communications': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Brand Management', 'Digital & Search Marketing'] 
        },
        'Mining, Resources & Energy': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Analysis & Reporting', 'Health, Safety & Environment'] 
        },
        'Real Estate & Property': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Administration', 'Analysts'] 
        },
        'Retail & Consumer Products': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Buying', 'Management - Area/Multi-site'] 
        },
        'Sales': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Account & Relationship Management', 'Analysis & Reporting'] 
        },
        'Science & Technology': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Biological & Biomedical Sciences', 'Self Employment'] 
        },
        'Self Employment': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: [] 
        },
        'Sport & Recreation': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Coaching & Instruction', 'Fitness & personal Training'] 
        },
        'Trades & Services': {
            jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }),
            professions: ['Air Conditioning & Refigeration', 'Automotive Trades'] 
        }
    };

    return (
        <>
        <section className="search flex flex-jc-c">
            <div className="page flex flex-col flex-jc-sb flex-ai-c">
                <div className="search-container">
                    <form className="flex flex-row flex-jc-sb">
                        <div className="what flex flex-col">
                            <label>What</label>
                            <div className="flex flex-row">
                                <input className="form-control" type="text" placeholder="Enter Keywords"></input>
                                <div className={`classification form-control flex flex-ai-c flex-jc-sb ${visible && 'outlined'}`} onClick={() => setVisible(!visible)}>
                                    <span className="dark-grey">
                                        {industries.length === 0 ? 
                                            'Any classification' 
                                        : 
                                            industries.length > 1 ? 
                                                `${industries.length} classifications`
                                            : 
                                                industries[0].length > 20 ? 
                                                    `${industries[0].slice(0,20)} ...`
                                                :
                                                    industries[0]
                                        }
                                    </span>
                                    <div className={`${industries.length > 0 && 'shrink'} list-action flex flex-ai-c`}>
                                        <span className={`${visible && 'flip'} material-icons-outlined`}>expand_more</span>
                                        <div className={`${industries.length === 0 && 'hidden'} clear flex flex-ai-c`} onClick={() => setIndustries([])}>
                                            <span className="medium material-icons-outlined">clear</span>
                                        </div>
                                    </div>
                                </div>
                                {visible && <Dropdown industries={industries} setIndustries={setIndustries} data={data}/>}
                            </div>
                        </div>
                        <div className="where flex flex-col">
                            <label>Where</label>
                            <input className="form-control" type="search" placeholder="Enter suburb, city, or region"></input>
                        </div>
                        <div className="find flex flex-ai-fe">
                            <button className="bg-black white btn">Find</button>
                        </div>
                    </form>
                    {!expanded && <div className="flex flex-jc-fe">
                        <div className="more flex flex-ai-c" onClick={() => setExpanded(!expanded)}>
                            <span className="small underlined">More options</span>
                            <span className="material-icons-outlined">expand_more</span>
                        </div>
                    </div>}
                </div>
            </div>
        </section>
        {expanded && <Options />}
        </>
    )
}

export default Search;