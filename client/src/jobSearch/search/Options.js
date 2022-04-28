import './Options.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkType, removeWorkType, setPayBase, setPayCeiling, setTimeElapsed } from '../job.slice';

function Options() {

    const [selected, setSelected] = useState();
    const [expanded, setExpanded] = useState();

    const workTypes = [
        'Full time',
        'Part time',
        'Contract/Temp',
        'Casual/Vacation'
    ];
    const payBasesAnnually = {
        '$0': 0,
        '30k': 30000,
        '40k': 40000,
        '50k': 50000,
        '60k': 60000,
        '70k': 70000,
        '80k': 80000,
        '100k': 100000,
        '120k': 120000,
        '150k': 150000,
        '200k': 200000
    };
    const payBasesHourly = {
        '$0': 0,
        '$15': 30000,
        '$20': 40000,
        '$25': 50000,
        '$30': 60000,
        '$35': 70000,
        '$40': 80000,
        '$50': 100000,
        '$60': 120000,
        '$75': 150000,
        '$100': 200000
    }
    const payCeilingsAnnually = {
        '30k': 30000,
        '40k': 40000,
        '50k': 50000,
        '60k': 60000,
        '70k': 70000,
        '80k': 80000,
        '100k': 100000,
        '120k': 120000,
        '150k': 150000,
        '200k': 200000,
        '200k+': 999999
    };
    const payCeilingsHourly = {
        '$15': 30000,
        '$20': 40000,
        '$25': 50000,
        '$30': 60000,
        '$35': 70000,
        '$40': 80000,
        '$50': 100000,
        '$60': 120000,
        '$75': 150000,
        '$100': 200000,
        '$100+': 999999
    }
    const times = {
        'Any time': null,
        'Today': Date.now(),
        'Last 3 days': Date.now() - 3 * 24 * 60 * 60 * 1000, 
        'Last 7 days': Date.now() - 7 * 24 * 60 * 60 * 1000,
        'Last 14 days': Date.now() - 14 * 24 * 60 * 60 * 1000,
        'Last 30 days': Date.now() - 30 * 24 * 60 * 60 * 1000
    }

    const selectedWorkTypes = useSelector(state => state.jobSearch.workTypes);
    const [displayedPayBase, setDisplayedPayBase] = useState('$0');
    const [payBaseScale, setPayBaseScale] = useState('annually');
    const [displayedPayCeiling, setDisplayedPayCeiling] = useState('200k+');
    const [payCeilingScale, setPayCeilingScale] = useState('annually');
    const [time, setTime] = useState('any time');

    return (
        <>
        <div className="options flex flex-jc-c">
            <div className="page flex flex-row">
                <span className="light-black">|</span>
                <Option id="workType" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} 
                    text={selectedWorkTypes.length === 0 || selectedWorkTypes.length === workTypes.length ? 'All work types' : (selectedWorkTypes.length > 1 ? `${selectedWorkTypes.length} work types` : selectedWorkTypes[0])} 
                />
                <span className="light-black">|</span>
                <Option id="payBase" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="paying" value={displayedPayBase.startsWith('$') ? displayedPayBase : `$${displayedPayBase}`}/>
                <span className="light-black">|</span>
                <Option id="payCeiling" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="to" value={displayedPayCeiling.startsWith('$') ? displayedPayCeiling : `$${displayedPayCeiling}`} />
                <span className="light-black">|</span>
                <Option id="time" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="listed" value={time.toLowerCase()} />
                <span className="light-black">|</span>
            </div>
        </div>
        {selected === "workType" ? <ExpandedOption>{workTypes.map((value,index) => { return <MultiSubOption key={index} text={value} /> })}</ExpandedOption> : undefined}
        {selected === "payBase" ? <ExpandedOption type='toggle' toggle={payBaseScale} setToggle={setPayBaseScale}>
            {payBaseScale === 'annually' ? 
                Object.keys(payBasesAnnually).map((text,index) => { 
                    let disabled = payBasesAnnually[text] < payBasesAnnually[displayedPayBase] || payBasesAnnually[text] >= payCeilingsAnnually[displayedPayCeiling]
                    return <SingleSubOption key={index} disabled={disabled} setDisplay={setDisplayedPayBase} selectedSubOption={displayedPayBase} text={text} value={payBasesAnnually[text]} setValue={setPayBase} /> 
                })
            :
                Object.keys(payBasesHourly).map((text,index) => { 
                    let disabled = payBasesHourly[text] < payBasesHourly[displayedPayBase] || payBasesHourly[text] >= payCeilingsHourly[displayedPayCeiling]
                    return <SingleSubOption key={index} disabled={disabled} setDisplay={setDisplayedPayBase} selectedSubOption={displayedPayBase} text={text} value={payBasesHourly[text]} setValue={setPayBase} />
                })
            }
        </ExpandedOption> : undefined}
        {selected === "payCeiling" ? <ExpandedOption type='toggle' toggle={payCeilingScale} setToggle={setPayCeilingScale}>
            {payCeilingScale === 'annually' ? 
                Object.keys(payCeilingsAnnually).map((text,index) => {
                    return <SingleSubOption key={index} disabled={payCeilingsAnnually[text] <= payBasesAnnually[displayedPayBase]} setDisplay={setDisplayedPayCeiling} selectedSubOption={displayedPayCeiling} text={text} value={payCeilingsAnnually[text]} setValue={setPayCeiling} /> 
                })
            :
                Object.keys(payCeilingsHourly).map((text,index) => { 
                    return <SingleSubOption key={index} disabled={payCeilingsHourly[text] <= payBasesHourly[displayedPayBase]} setDisplay={setDisplayedPayCeiling} selectedSubOption={displayedPayCeiling} text={text} value={payCeilingsHourly[text]} setValue={setPayCeiling} />
                })
            }
        </ExpandedOption> : undefined}
        {selected === "time" ? <ExpandedOption>
            {Object.keys(times).map((text,index) => { return <SingleSubOption key={index} setDisplay={setTime} selectedSubOption={time} text={text} value={times[text]} setValue={setTimeElapsed} /> })}
        </ExpandedOption> : undefined}
        </>
    )
}

function Option(props) {

    const { id, expanded, setExpanded, selected, setSelected, text, value } = props;

    const handleClick = () => {
        expanded === id ? setExpanded(undefined) : setExpanded(id);
        selected === id ? setSelected(undefined) : setSelected(id);
    }

    return (
        <div className="option flex flex-row flex-jc-c" onClick={handleClick}>
            <div className="flex">
                {!value ? 
                <>
                    <span className={selected !== undefined && selected !== id ? 'black' : 'white'}>{text}</span>
                    <span className={`${expanded !== undefined ? 'flip' : undefined} ${selected !== undefined && selected !== id ? 'black' : 'white'} material-icons-outlined`}>expand_more</span>
                </>
                :
                <>
                    <span className={selected !== undefined && selected !== id ? 'black' : 'grey'}>{text}</span>
                    <span className={selected !== undefined && selected !== id ? 'black' : 'white'}>{value}</span>
                    <span className={`${expanded !== undefined && expanded === id ? 'flip' : undefined} ${selected !== undefined && selected !== id ? 'black' : 'white'} material-icons-outlined`}>expand_more</span>
                </>
                }
            </div>
        </div>
    )
}

function ExpandedOption(props) {

    const { toggle, setToggle, type } = props;
    
    return (
        <div className="expanded-option flex flex-jc-c">
            <nav className="page">
                <ul className="expanded-sub-options flex flex-row flex-jc-sb">
                    {props.children}
                </ul>
                {type && type === 'toggle' && <ScaleToggle toggle={toggle} setToggle={setToggle}/>}
            </nav>
        </div>
    )
}

function MultiSubOption(props) {

    const dispatch = useDispatch();
    const selectedWorkTypes = useSelector(state => state.jobSearch.workTypes);
    const { text } = props;

    const handleClick = () => {
        selectedWorkTypes.indexOf(text) > -1 ? dispatch(removeWorkType(text)) : dispatch(addWorkType(text));
    }

    return (
        <li className={selectedWorkTypes.includes(text) ? 'selected-sub-option' :  undefined} onClick={handleClick}>
            <span>{text}</span>
        </li>
    )
}

function SingleSubOption(props) {

    const dispatch = useDispatch();
    const { disabled, setDisplay, selectedSubOption, text, value, setValue } = props;
    
    const handleClick = () => {
        setDisplay(text);
        dispatch(setValue(value));
    }

    return (
        <li className={`${selectedSubOption === text ? 'selected-sub-option' :  undefined} ${disabled && 'disabled'}`} onClick={!disabled && handleClick}>
            <span>{text}</span>
        </li>        
    )
}

function ScaleToggle(props) {

    const { setToggle, toggle } = props;

    return (
        <div className="scale-toggle flex flex-jc-c">
            <span className={toggle === 'annually' ? 'selected' : undefined} onClick={() => setToggle('annually')}>Annually</span>
            <span className={toggle === 'hourly' ? 'selected' : undefined} onClick={() => setToggle('hourly')}>Hourly</span>
        </div>
    )
}


export default Options;