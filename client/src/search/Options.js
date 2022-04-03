import './Options.css';
import { useState } from 'react';

function Options() {

    const [expanded, setExpanded] = useState(false);

    return (
        <>
        <div className="options flex flex-jc-c">
            <div className="page flex flex-row">
                <span className="light-black">|</span>
                <Option value="All work types"/>
                <span className="light-black">|</span>
                <Option text="paying" value="$0"/>
                <span className="light-black">|</span>
                <Option text="to" value="$200k+" />
                <span className="light-black">|</span>
                <Option text="listed" value="any time" />
                <span className="light-black">|</span>
            </div>
        </div>
        {expanded && <ExpandedOption />}
        </>
    )
}

function Option(props) {

    const { expand, expanded, text, value } = props;

    return (
        <div className="option flex flex-row flex-jc-c" onClick={() => expand(!expanded)}>
            <div className="flex">
                {text && <span className="grey">{text}</span>}
                <span className="white">{value}</span>
                <span className={`${expanded && 'flip'} white expand material-icons-outlined`}>expand_more</span>
            </div>
        </div>
    )
}

function ExpandedOption() {
    return (
        <div className="expanded-option flex flex-jc-c">
            <nav className="page">
                <ul className="expanded-sub-options flex flex-row flex-jc-sb">
                    <SubOption text="Full time" />
                    <SubOption text="Part time" />
                    <SubOption text="Contract/Temp" />
                    <SubOption text="Casual/Vacation" />
                </ul>
            </nav>
        </div>
    )
}

function SubOption(props) {

    const [selected, setSelected] = useState(false);

    return (
        <li className={selected && 'selected-sub-option'} onClick={() => setSelected(!selected)}>
            <span>{props.text}</span>
        </li>
    )
}


export default Options;