import './Dropdown.css';
import { useEffect, useState } from 'react';
import { getAllIndustries } from '../job.api';
import { useDispatch, useSelector } from 'react-redux';
import { addIndustry, removeIndustry, addProfession, removeProfession } from '../job.slice';

function Dropdown() {

    const [allIndustries, setAllIndustries] = useState();

    useEffect(() => {
        async function fetchAllIndustries() {
            const response = await getAllIndustries();
            setAllIndustries(response.data.allIndustries);
        }
        fetchAllIndustries();
    },[getAllIndustries])

    return (
        <div className="dropdown">
            <ul className="dropdown-list">
                {allIndustries && allIndustries.map((industry,index) => { 
                    return <Classification 
                        key={index} 
                        industry={industry.name} 
                        jobCount={industry.jobCount}
                        professions={industry.professions}
                    />
                })}
            </ul>
        </div>
    )
}

function Classification(props) {

    const dispatch = useDispatch();
    const industries = useSelector(state => state.jobSearch.industries);

    const { industry, jobCount, professions } = props;
    const [checked, setChecked] = useState(industries.indexOf(industry) > -1);

    const handleClick = () => {
        setChecked(!checked);
        industries.indexOf(industry) > -1 ? dispatch(removeIndustry(industry)) : dispatch(addIndustry(industry));
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
                return <Item 
                    key={index} 
                    allChecked={allChecked} 
                    setAllChecked={setAllChecked} 
                    profession={profession.name} 
                    jobCount={profession.jobCount}
                />
            })}
        </div>
    )
}

function Item(props) {

    const dispatch = useDispatch();
    const selectedProfessions = useSelector(state => state.jobSearch.professions);
    const { allChecked, setAllChecked, profession, jobCount } = props;
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setAllChecked(false);
        setChecked(!checked);
        selectedProfessions.indexOf(profession) > -1 ? dispatch(removeProfession(profession)) : dispatch(addProfession(profession));
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