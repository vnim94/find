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
                <Option selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text={workType.length === 0 || workType.length === workTypes.length ? 'All work types' : (workType.length > 1 ? `${workType.length} work types` : workType[0])} />
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="paying" value={payBase === '$0' ? '$0' : `$${payBase}`}/>
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="to" value={`$${payCeiling}`} />
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="listed" value={time.toLowerCase()} />
                <span className="light-black">|</span>
            </div>
        </div>
        {!['paying','to','listed'].includes(selected) ? <ExpandedOption type='multi' values={workTypes} display={workType} setDisplay={setWorkType}/> : undefined}
        {selected === 'paying' ? <ExpandedOption values={payBases} setDisplay={setPayBase}/> : undefined}
        {selected === 'to' ? <ExpandedOption values={payCeilings} setDisplay={setPayCeiling}/> : undefined}
        {selected === 'listed' ? <ExpandedOption values={times} setDisplay={setTime}/> : undefined}
        </>
    )
}

function Option(props) {

    const { expanded, setExpanded, selected, setSelected, text, value } = props;

    const handleClick = () => {
        expanded === text ? setExpanded(undefined) : setExpanded(text);
        selected === text ? setSelected(undefined) : setSelected(text);
    }

    return (
        <div className="option flex flex-row flex-jc-c" onClick={handleClick}>
            <div className="flex">
                {!value ? 
                <>
                    <span className={selected !== undefined && selected !== text ? 'black' : 'white'}>{text}</span>
                    <span className={`${expanded !== undefined ? 'flip' : undefined} ${selected !== undefined && selected !== text ? 'black' : 'white'} material-icons-outlined`}>expand_more</span>
                </>
                :
                <>
                    <span className={selected !== undefined && selected !== text ? 'black' : 'grey'}>{text}</span>
                    <span className={selected !== undefined && selected !== text ? 'black' : 'white'}>{value}</span>
                    <span className={`${expanded !== undefined && expanded === text ? 'flip' : undefined} ${selected !== undefined && selected !== text ? 'black' : 'white'} material-icons-outlined`}>expand_more</span>
                </>
                }
            </div>
        </div>
    )
}

function ExpandedOption(props) {

    const { type, values, display, setDisplay } = props;
    const [selectedSubOption, setSubOption] = useState();

    return (
        <div className="expanded-option flex flex-jc-c">
            <nav className="page">
                <ul className="expanded-sub-options flex flex-row flex-jc-sb">
                    {type ? 
                        values.map((value,index) => { return <MultiSubOption key={index} display={display} setDisplay={setDisplay} text={value} /> })
                    : 
                        values.map((value,index) => { return <SingleSubOption key={index} setDisplay={setDisplay} selectedSubOption={selectedSubOption} setSelectedSubOption={setSubOption} text={value} /> })
                    }
                </ul>
            </nav>
        </div>
    )
}

function MultiSubOption(props) {

    const { text, display, setDisplay } = props;
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        console.log(text);
        setSelected(!selected);
        display.indexOf(text) > -1 ? setDisplay(display.filter(type => type !== text)) : setDisplay([ ...display, text]);
    }

    return (
        <li className={selected ? 'selected-sub-option' :  undefined} onClick={handleClick}>
            <span>{text}</span>
        </li>
    )
}

function SingleSubOption(props) {

    const { setDisplay, selectedSubOption, setSelectedSubOption, text} = props;

    const handleClick = () => {
        setSelectedSubOption(text);
        setDisplay(text);
    }

    return (
        <li className={selectedSubOption === text ? 'selected-sub-option' :  undefined} onClick={handleClick}>
            <span>{text}</span>
        </li>        
    )
}


export default Options;