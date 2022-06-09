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
    const selectedProfessions = searchParams.getAll('profession');

    const { industry, jobCount, professions } = props;
    const [checked, setChecked] = useState(industries.some(id => id === industry.id));

    const handleClick = () => {
        setChecked(!checked);
        if (industries.some(id => id === industry.id)) {
            dispatch(removeIndustry(industry.name));
            let remaining = industries.filter(id => id !== industry.id);
            searchParams.delete('industry');
            remaining.forEach(id => searchParams.append('industry', id));

            // TODO: optimise
            let remainingProfessions = [];
            selectedProfessions.forEach(selectedProfession => {
                if (!professions.some(p => p.id === selectedProfession)) {
                    remainingProfessions.push(selectedProfession);
                }
            })
            searchParams.delete('profession');
            remainingProfessions.forEach(id => searchParams.append('profession', id));
        } else {
            dispatch(addIndustry(industry.name));
            searchParams.append('industry', industry.id); 
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
    const selectedProfessions = searchParams.getAll('profession');
    const { industry, jobCount, professions } = props;

    return (
        <div className="sub-items">
            <div className="item-container flex flex-row flex-jc-sb flex-ai-c">
                <div className="item flex flex-ai-c">
                    <span className={`${selectedProfessions.length === 0 && 'checked'} checkbox`}></span>
                    <span className="item-text">All {industry}</span>
                </div>
                <span>{jobCount}</span>
            </div>
            <hr className="sub-item-divider"></hr>
            {professions && professions.map((profession, index) => {
                return <CheckBoxItem 
                    key={index} 
                    profession={profession} 
                />
            })}
        </div>
    )
}

function CheckBoxItem(props) {

    const { profession } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedProfessions = searchParams.getAll('profession');
    const [checked, setChecked] = useState(selectedProfessions.some(id => id === profession.id));

    const handleClick = () => {
        setChecked(!checked);
        if (selectedProfessions.some(id => id === profession.id)) {
            let remaining = selectedProfessions.filter(id => id !== profession.id);
            searchParams.delete('profession');
            remaining.forEach(id => searchParams.append('profession', id));
        } else {
            searchParams.append('profession', profession.id);
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