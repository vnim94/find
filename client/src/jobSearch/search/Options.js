import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Options() {

    const [searchParams] = useSearchParams();
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

    const selectedWorkTypes = searchParams.getAll('workType');

    const [displayedPayBase, setDisplayedPayBase] = useState('$0');
    const [payBaseScale, setPayBaseScale] = useState('annually');
    const [displayedPayCeiling, setDisplayedPayCeiling] = useState('200k+');
    const [payCeilingScale, setPayCeilingScale] = useState('annually');
    const [displayedTime, setDisplayedTime] = useState('any time');

    return (
        <>
        <div className="bg-green-6 flex justify-center">
            <div className="py-3 w-[992px] flex flex-row">
                <div className="border-l border-grey-3"></div>
                <Option id="workType" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} 
                    text={selectedWorkTypes.length === 0 || selectedWorkTypes.length === workTypes.length ? 'All work types' : (selectedWorkTypes.length > 1 ? `${selectedWorkTypes.length} work types` : selectedWorkTypes[0])} 
                />
                <div className="border-l border-grey-3"></div>
                <Option id="payBase" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="paying" value={displayedPayBase.startsWith('$') ? displayedPayBase : `$${displayedPayBase}`}/>
                <div className="border-l border-grey-3"></div>
                <Option id="payCeiling" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="to" value={displayedPayCeiling.startsWith('$') ? displayedPayCeiling : `$${displayedPayCeiling}`} />
                <div className="border-l border-grey-3"></div>
                <Option id="time" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="listed" value={displayedTime.toLowerCase()} />
                <div className="border-l border-grey-3"></div>
            </div>
        </div>
        {selected === "workType" ? <ExpandedOption>{workTypes.map((value,index) => { return <MultiSubOption key={index} text={value} /> })}</ExpandedOption> : undefined}
        {selected === "payBase" ? <ExpandedOption type='toggle' toggle={payBaseScale} setToggle={setPayBaseScale}>
            {payBaseScale === 'annually' ? 
                Object.keys(payBasesAnnually).map((text,index) => { 
                    let disabled = payBasesAnnually[text] >= payCeilingsAnnually[displayedPayCeiling]
                    return <SingleSubOption key={index} disabled={disabled} setDisplay={setDisplayedPayBase} selectedSubOption={displayedPayBase} text={text} value={payBasesAnnually[text]} type={'payBase'} /> 
                })
            :
                Object.keys(payBasesHourly).map((text,index) => { 
                    let disabled = payBasesHourly[text] >= payCeilingsHourly[displayedPayCeiling]
                    return <SingleSubOption key={index} disabled={disabled} setDisplay={setDisplayedPayBase} selectedSubOption={displayedPayBase} text={text} value={payBasesHourly[text]} type={'payBase'} />
                })
            }
        </ExpandedOption> : undefined}
        {selected === "payCeiling" ? <ExpandedOption type='toggle' toggle={payCeilingScale} setToggle={setPayCeilingScale}>
            {payCeilingScale === 'annually' ? 
                Object.keys(payCeilingsAnnually).map((text,index) => {
                    return <SingleSubOption key={index} disabled={payCeilingsAnnually[text] <= payBasesAnnually[displayedPayBase]} setDisplay={setDisplayedPayCeiling} selectedSubOption={displayedPayCeiling} text={text} value={payCeilingsAnnually[text]} type={'payCeiling'} /> 
                })
            :
                Object.keys(payCeilingsHourly).map((text,index) => { 
                    return <SingleSubOption key={index} disabled={payCeilingsHourly[text] <= payBasesHourly[displayedPayBase]} setDisplay={setDisplayedPayCeiling} selectedSubOption={displayedPayCeiling} text={text} value={payCeilingsHourly[text]} type={'payCeiling'} />
                })
            }
        </ExpandedOption> : undefined}
        {selected === "time" ? <ExpandedOption>
            {Object.keys(times).map((text,index) => { return <SingleSubOption key={index} setDisplay={setDisplayedTime} selectedSubOption={displayedTime} text={text} value={times[text]} type={'added'} /> })}
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
        <div className="px-2 py-1 flex flex-row justify-center hover:cursor-pointer" onClick={handleClick}>
            <div className="flex space-x-2">
                {!value ? 
                <>
                    <span className={selected !== undefined && selected !== id ? 'text-black-1' : 'text-white'}>{text}</span>
                    <span className={`${expanded !== undefined && expanded === id ? 'rotate-180' : undefined} ${selected !== undefined && selected !== id ? 'text-black-1' : 'text-white'} transition material-icons-outlined`}>expand_more</span>
                </>
                :
                <>
                    <span className={selected !== undefined && selected !== id ? 'text-black-1' : 'text-grey-3'}>{text}</span>
                    <span className={selected !== undefined && selected !== id ? 'text-black-1' : 'text-white'}>{value}</span>
                    <span className={`${expanded !== undefined && expanded === id ? 'rotate-180' : undefined} ${selected !== undefined && selected !== id ? 'text-black-1' : 'text-white'} transition material-icons-outlined`}>expand_more</span>
                </>
                }
            </div>
        </div>
    )
}

function ExpandedOption({ children, toggle, setToggle, type }) {
    return (
        <div className="bg-green-6 flex justify-center">
            <nav className="w-[992px]">
                <ul className="mt-1 mb-3 flex flex-row justify-between rounded-md border border-white text-white divide-x">
                    {children}
                </ul>
                {type && type === 'toggle' && <ScaleToggle toggle={toggle} setToggle={setToggle}/>}
            </nav>
        </div>
    )
}

function MultiSubOption(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedWorkTypes = searchParams.getAll('workType');
    const { text } = props;

    const handleClick = () => {
        if (selectedWorkTypes.indexOf(text) > -1) {
            let remaining = selectedWorkTypes.filter(type => type !== text);
            searchParams.delete('workType');
            remaining.forEach(type => searchParams.append('workType', type));
        } else {
            searchParams.append('workType', text);
        }
        setSearchParams(searchParams);
    }

    return (
        <li className={`${selectedWorkTypes.includes(text) ? 'bg-white text-black-1' : undefined} py-2 flex flex-grow justify-center hover:cursor-pointer`} onClick={handleClick}>
            <span>{text}</span>
        </li>
    )
}

function SingleSubOption(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const { disabled, setDisplay, selectedSubOption, text, type, value } = props;
    
    const handleClick = () => {
        setDisplay(text);
        if (text !== 'Any time') {
            searchParams.set(type, value);
            setSearchParams(searchParams);
        }
    }

    return (
        <li className={`${selectedSubOption === text ? 'bg-white text-black-1' :  undefined} ${disabled && 'text-grey-3 hover:cursor-default'} py-2 flex flex-grow justify-center hover:cursor-pointer`} onClick={!disabled && handleClick}>
            <span>{text}</span>
        </li>        
    )
}

function ScaleToggle(props) {

    const { setToggle, toggle } = props;

    return (
        <div className="mb-3 flex justify-center">
            <span className={`${toggle === 'annually' ? 'text-white border-b-2 border-white' : undefined} p-2 hover:cursor-pointer`} onClick={() => setToggle('annually')}>Annually</span>
            <span className={`${toggle === 'hourly' ? 'text-white border-b-2 border-white' : undefined} p-2 hover:cursor-pointer`} onClick={() => setToggle('hourly')}>Hourly</span>
        </div>
    )
}


export default Options;