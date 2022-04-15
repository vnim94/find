import './Dropdown.css';
import { useState } from 'react';

function Dropdown(props) {

    const { industries, setIndustries, data } = props;

    return (
        <div className="dropdown">
            <ul className="dropdown-list">
                {Object.keys(data).map((industry,index) => { 
                    return <Classification 
                        key={index} 
                        industry={industry} 
                        industries={industries} 
                        setIndustries={setIndustries} 
                        jobCount={data[industry].jobCount}
                        professions={data[industry].professions}
                    />
                })}
            </ul>
        </div>
    )
}

function Classification(props) {

    const { industry, industries, setIndustries, jobCount, professions } = props;
    const [checked, setChecked] = useState(industries.indexOf(industry) > -1);

    const handleClick = () => {
        setChecked(!checked);
        industries.indexOf(industry) > -1 ? 
            setIndustries(industries.filter(c => c !== industry)) 
        : 
            setIndustries([ ...industries, industry]);
    }

    return (
        <li className="flex flex-col">
            <div className="item-container flex flex-row flex-jc-sb flex-ai-c" onClick={handleClick}>
                <div className="item flex flex-ai-c">
                    <span className={`${checked && 'checked'} checkbox`}></span>
                    <span className="item-text">{industry}</span>
                </div>
                {!checked && <span>{jobCount}</span>}
            </div>
            {checked && <SubClassification industry={industry} jobCount={jobCount} professions={professions} />}
        </li>
    )
}

function SubClassification(props) {

    const { industry, jobCount, professions } = props;
    const [allChecked, setAllChecked] = useState(true);
    const [selectedProfessions, setSelectedProfessions] = useState([]);

    return (
        <div className="sub-items">
            <div className="item-container flex flex-row flex-jc-sb flex-ai-c" onClick={() => setAllChecked(!allChecked)}>
                <div className="item flex flex-ai-c">
                    <span className={`${allChecked && 'checked'} checkbox`}></span>
                    <span className="item-text">All {industry}</span>
                </div>
                <span>{jobCount}</span>
            </div>
            <hr className="sub-item-divider"></hr>
            {professions && professions.map((profession, index) => {
                return <Item key={index} allChecked={allChecked} setAllChecked={setAllChecked} selectedProfessions={selectedProfessions} setSelectedProfessions={setSelectedProfessions} profession={profession} jobCount={0}/>
            })}
        </div>
    )
}

function Item(props) {

    const { allChecked, setAllChecked, selectedProfessions, setSelectedProfessions, profession, jobCount } = props;
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setAllChecked(false);
        setChecked(!checked);
    }

    return (
        <div className="item-container flex flex-row flex-jc-sb flex-ai-c" onClick={handleClick}>
            <div className="item flex flex-ai-c">
                <span className={`${checked && 'checked'} checkbox`}></span>
                <span className="item-text">{profession}</span>
            </div>
            <span>{jobCount}</span>
        </div>
    )
}

export default Dropdown;