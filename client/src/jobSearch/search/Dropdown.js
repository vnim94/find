import './Dropdown.css';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addIndustry, removeIndustry } from '../job.slice';

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
    const [searchParams, setSearchParams] = useSearchParams();
    const industries = searchParams.getAll('industry');

    const { industry, jobCount, professions } = props;
    const [checked, setChecked] = useState(industries.some(code => code === industry.code));

    const handleClick = () => {
        setChecked(!checked);
        if (industries.some(code => code === industry.code)) {
            dispatch(removeIndustry(industry.name));
            let remaining = industries.filter(code => code !== industry.code);
            searchParams.delete('industry');
            remaining.forEach(code => searchParams.append('industry', code));
        } else {
            dispatch(addIndustry(industry.name));
            searchParams.append('industry', industry.code); 
        }
        setSearchParams(searchParams);
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
    
    const [searchParams] = useSearchParams();
    const selectedProfessions = searchParams.getAll('professions');
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

    const { allChecked, setAllChecked, profession } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedProfessions = searchParams.getAll('profession');
    const [checked, setChecked] = useState(selectedProfessions.some(code => code === profession.code));

    const handleClick = () => {
        setChecked(!checked);
        // TODO: check all when no professions selected
        selectedProfessions.length === 1 && checked === false && allChecked === false ? setAllChecked(true) : setAllChecked(false);
        
        if (selectedProfessions.some(code => code === profession.code)) {
            let remaining = selectedProfessions.filter(code => code !== profession.code);
            searchParams.delete('profession');
            remaining.forEach(code => searchParams.append('profession', code));
        } else {
            searchParams.append('profession', profession.code);
        }
        setSearchParams(searchParams);
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

    const [searchParams, setSearchParams] = useSearchParams();
    const { text, toggleList } = props;

    const handleClick = () => {
        searchParams.set('location', text.toLowerCase());
        setSearchParams(searchParams);
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