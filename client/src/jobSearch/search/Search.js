import './Search.css';
import Dropdown from './Dropdown';
import Options from './Options';
import { useState } from 'react';

function Search(props) {

    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(props.expanded);
    const [classifications, setClassifications] = useState([]);

    const data = [
        { classification: 'Accounting', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Administration & Office Support', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Advertising, Arts & Media', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Banking & Financial Services', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Call Centre & Customer Service', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'CEO & General Management', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Community Services & Development', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Construction', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Consulting & Strategy', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Design & Architecture', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Education & Training', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Engineering', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Farming, Animals & Conservation', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Government & Defence', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Healthcare & Medical', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Hospitality & Tourism', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Human Resources & Recruitment', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Information & Communication Technology', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Insurance & Superannuation', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Legal', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Manufacturing, Transport & Logistics', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Marketing & Communications', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Mining, Resources & Energy', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Real Estate & Property', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Retail & Consumer Products', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Sales', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Science & Technology', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Self Employment', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Sport & Recreation', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { classification: 'Trades & Services', jobCount: (Math.random() * 10000).toLocaleString(undefined, { maximumFractionDigits: 0 }) }
    ];

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
                                        {classifications.length === 0 ? 
                                            'Any classification' 
                                        : 
                                            classifications.length > 1 ? 
                                                `${classifications.length} classifications`
                                            : 
                                                classifications[0].length > 20 ? 
                                                    `${classifications[0].slice(0,20)} ...`
                                                :
                                                    classifications[0]
                                                    }
                                    </span>
                                    <div className={`${classifications.length > 0 && 'shrink'} list-action flex flex-ai-c`}>
                                        <span className={`${visible && 'flip'} material-icons-outlined`}>expand_more</span>
                                        <div className={`${classifications.length === 0 && 'hidden'} clear flex flex-ai-c`} onClick={() => setClassifications([])}>
                                            <span className="medium material-icons-outlined">clear</span>
                                        </div>
                                    </div>
                                </div>
                                {visible && <Dropdown classifications={classifications} setClassifications={setClassifications} data={data}/>}
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