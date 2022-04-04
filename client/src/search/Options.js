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
    const payBase = [
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
    const payRange = [
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
    const time = [
        'Any time',
        'Today',
        'Last 3 days', 
        'Last 7 days',
        'Last 14 days',
        'Last 30 days'
    ]

    return (
        <>
        <div className="options flex flex-jc-c">
            <div className="page flex flex-row">
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="work types" value="All" />
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="paying" value="$0"/>
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="to" value="$200k+" />
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded} text="listed" value="any time" />
                <span className="light-black">|</span>
            </div>
        </div>
        {selected === 'work types' ? <ExpandedOption type='multi' values={workTypes}/> : undefined}
        {selected === 'paying' ? <ExpandedOption values={payBase}/> : undefined}
        {selected === 'to' ? <ExpandedOption values={payRange}/> : undefined}
        {selected === 'listed' ? <ExpandedOption values={time}/> : undefined}
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
                {text === 'work types' ? 
                <>
                    <span className={selected !== undefined && selected !== text ? 'black' : 'white'}>{value}</span>
                    <span className={selected !== undefined && selected !== text ? 'black' : 'white'}>{text}</span>
                </>
                :
                <>
                    <span className={selected !== undefined && selected !== text ? 'black' : 'grey'}>{text}</span>
                    <span className={selected !== undefined && selected !== text ? 'black' : 'white'}>{value}</span>
                </>
                }
                <span className={`${expanded !== undefined && expanded === text ? 'flip' : undefined} ${selected !== undefined && selected !== text ? 'black' : 'white'} material-icons-outlined`}>expand_more</span>
            </div>
        </div>
    )
}

function ExpandedOption(props) {

    const [selectedSubOption, setSubOption] = useState();

    return (
        <div className="expanded-option flex flex-jc-c">
            <nav className="page">
                <ul className="expanded-sub-options flex flex-row flex-jc-sb">
                    {props.type ? 
                        props.values.map((value,index) => { return <MultiSubOption key={index} text={value} /> })
                    : 
                        props.values.map((value,index) => { return <SingleSubOption key={index} selected={selectedSubOption} setSelected={setSubOption} text={value} /> })
                    }
                </ul>
            </nav>
        </div>
    )
}

function MultiSubOption(props) {

    const [selected, setSelected] = useState(false);

    return (
        <li className={selected ? 'selected-sub-option' :  undefined} onClick={() => setSelected(!selected)}>
            <span>{props.text}</span>
        </li>
    )
}

function SingleSubOption(props) {

    const { selected, setSelected, text} = props;

    return (
        <li className={selected === text ? 'selected-sub-option' :  undefined} onClick={() => setSelected(text)}>
            <span>{text}</span>
        </li>        
    )
}


export default Options;