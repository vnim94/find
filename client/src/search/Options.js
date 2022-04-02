import './Options.css';
import { useState } from 'react';

function Options() {
    return (
        <div className="options flex flex-jc-c">
            <div className="page flex flex-row">
                <span className="light-black">|</span>
                <Option value="All work types"/>
                <span className="light-black">|</span>
                <Option text="paying" value="$0" />
                <span className="light-black">|</span>
                <Option text="to" value="$200k+" />
                <span className="light-black">|</span>
                <Option text="listed" value="any time" />
                <span className="light-black">|</span>
            </div>
        </div>
    )
}

function Option(props) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="option flex flex-row flex-jc-c" onClick={() => setExpanded(!expanded)}>
            <div className="flex">
                {props.text && <span className="grey">{props.text}</span>}
                <span className="white">{props.value}</span>
                <span className={`${expanded && 'flip'} white expand material-icons-outlined`}>expand_more</span>
            </div>
        </div>
    )
}

export default Options;