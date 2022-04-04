import './Options.css';
import { useState } from 'react';

function Options() {

    const [selected, setSelected] = useState();
    const [expanded, setExpanded] = useState();

    const workTypes = [
        'Full time',
        'Part time',
        'Contract/Temp',
        'Casual/Vacation'
    ];
    const payBases = [
        '$0',
        '30k',
        '40k',
        '50k',
        '60k',
        '70k',
        '80k',
        '100k',
        '120k',
        '150k',
        '200k'
    ];
    const payCeilings = [
        '30k',
        '40k',
        '50k',
        '60k',
        '70k',
        '80k',
        '100k',
        '120k',
        '150k',
        '200k',
        '200k+'
    ];
    const times = [
        'Any time',
        'Today',
        'Last 3 days', 
        'Last 7 days',
        'Last 14 days',
        'Last 30 days'
    ]

    const [workType, setWorkType] = useState([]);
    const [payBase, setPayBase] = useState(0);
    const [payCeiling, setPayCeiling] = useState('200k+');
    const [time, setTime] = useState('any time');

    return (
        <>
        <div className="options flex flex-jc-c">
            <div className="page flex flex-row">
                <span className="light-black">|</span>
                <Option id="workType" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text={workType.length === 0 || workType.length === workTypes.length ? 'All work types' : (workType.length > 1 ? `${workType.length} work types` : workType[0])} />
                <span className="light-black">|</span>
                <Option id="payBase" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="paying" value={payBase === '$0' ? '$0' : `$${payBase}`}/>
                <span className="light-black">|</span>
                <Option id="payCeiling" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="to" value={`$${payCeiling}`} />
                <span className="light-black">|</span>
                <Option id="time" selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="listed" value={time.toLowerCase()} />
                <span className="light-black">|</span>
            </div>
        </div>
        {selected === "workType" ? <ExpandedOption type='multi' values={workTypes} display={workType} setDisplay={setWorkType} /> : undefined}
        {selected === "payBase" ? <ExpandedOption values={payBases} selectedSubOption={payBase} setDisplay={setPayBase}/> : undefined}
        {selected === "payCeiling" ? <ExpandedOption values={payCeilings} selectedSubOption={payCeiling} setDisplay={setPayCeiling}/> : undefined}
        {selected === "time" ? <ExpandedOption values={times} selectedSubOption={time} setDisplay={setTime}/> : undefined}
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

    const { display, setDisplay, selectedSubOption, type, values,  } = props;

    return (
        <div className="expanded-option flex flex-jc-c">
            <nav className="page">
                <ul className="expanded-sub-options flex flex-row flex-jc-sb">
                    {type ? 
                        values.map((value,index) => { return <MultiSubOption key={index} display={display} selectedSubOption={selectedSubOption} setDisplay={setDisplay} text={value} /> })
                    : 
                        values.map((value,index) => { return <SingleSubOption key={index} setDisplay={setDisplay} selectedSubOption={selectedSubOption} text={value} /> })
                    }
                </ul>
            </nav>
        </div>
    )
}

function MultiSubOption(props) {

    const { text, display, setDisplay } = props;

    const handleClick = () => {
        display.indexOf(text) > -1 ? setDisplay(display.filter(type => type !== text)) : setDisplay([ ...display, text]);
    }

    return (
        <li className={display.includes(text) ? 'selected-sub-option' :  undefined} onClick={handleClick}>
            <span>{text}</span>
        </li>
    )
}

function SingleSubOption(props) {

    const { setDisplay, selectedSubOption, text} = props;

    const handleClick = () => {
        setDisplay(text);
    }

    return (
        <li className={selectedSubOption === text ? 'selected-sub-option' :  undefined} onClick={handleClick}>
            <span>{text}</span>
        </li>        
    )
}


export default Options;