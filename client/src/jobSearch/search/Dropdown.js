import './Dropdown.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIndustry, removeIndustry, addProfession, removeProfession } from '../job.slice';

function Dropdown(props) {
    return (
        <div className="dropdown">
            <ul className="dropdown-list">
                {props.children}
            </ul>
        </div>
    )
}

export function Classification(props) {

    const dispatch = useDispatch();
    const selectedIndustries = useSelector(state => state.jobSearch.industries);

    const { industry, jobCount, professions } = props;
    const [checked, setChecked] = useState(selectedIndustries.some(i => i.code === industry.code));

    const handleClick = () => {
        setChecked(!checked);
        selectedIndustries.some(i => i.code === industry.code) ? dispatch(removeIndustry(industry)) : dispatch(addIndustry(industry));
    }

    return (
        <li className="flex flex-col">
            <div className="item-container flex flex-row flex-jc-sb flex-ai-c" onClick={handleClick}>
                <div className="item flex flex-ai-c">
                    <span className={`${checked && 'checked'} checkbox`}></span>
                    <span className="item-text">{industry.name}</span>
                </div>
                {!checked && <span>{jobCount}</span>}
            </div>
            {checked && <SubClassification industry={industry.name} jobCount={jobCount} professions={professions} />}
        </li>
    )
}

function SubClassification(props) {
    
    const selectedProfessions = useSelector(state => state.jobSearch.professions);
    const { industry, jobCount, professions } = props;
    const [allChecked, setAllChecked] = useState(true);

    return (
        <div className="sub-items">
            <div className="item-container flex flex-row flex-jc-sb flex-ai-c" onClick={() => setAllChecked(!allChecked)}>
                <div className="item flex flex-ai-c">
                    <span className={`${allChecked && selectedProfessions.length === 0 && 'checked'} checkbox`}></span>
                    <span className="item-text">All {industry}</span>
                </div>
                <span>{jobCount}</span>
            </div>
            <hr className="sub-item-divider"></hr>
            {professions && professions.map((profession, index) => {
                return <CheckBoxItem 
                    key={index} 
                    allChecked={allChecked} 
                    setAllChecked={setAllChecked} 
                    profession={profession} 
                />
            })}
        </div>
    )
}

function CheckBoxItem(props) {

    const dispatch = useDispatch();
    const selectedProfessions = useSelector(state => state.jobSearch.professions);
    const { allChecked, setAllChecked, profession } = props;
    const [checked, setChecked] = useState(selectedProfessions.some(p => p.code === profession.code));

    const handleClick = () => {
        setChecked(!checked);
        // selectedProfessions.length === 1 && checked === false && allChecked === false ? setAllChecked(true) : setAllChecked(false);
        selectedProfessions.some(p => p.code === profession.code) ? dispatch(removeProfession(profession)) : dispatch(addProfession(profession));
    }

    return (
        <div className="item-container flex flex-row flex-jc-sb flex-ai-c" onClick={handleClick}>
            <div className="item flex flex-ai-c">
                <span className={`${checked && 'checked'} checkbox`}></span>
                <span className="item-text">{profession.name}</span>
            </div>
            <span>{profession.jobCount}</span>
        </div>
    )
}

export function Item(props) {

    const dispatch = useDispatch();
    const { text, toggleList } = props;

    const handleClick = () => {
        toggleList(false);
    }

    return (
        <li className="list-item">
            <div className="item-container flex flex-row flex-jc-sb flex-ai-c" onClick={handleClick}>
                <div className="item flex flex-ai-c">
                    <span className="item-text">{text}</span>
                </div>
            </div>
        </li>
    )
}

export default Dropdown;