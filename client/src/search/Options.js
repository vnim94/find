import './Options.css';
import { useState } from 'react';

function Options() {

    const [selected, setSelected] = useState();

    return (
        <>
        <div className="options flex flex-jc-c">
            <div className="page flex flex-row">
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} text="work types" value="All" />
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} text="paying" value="$0"/>
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} text="to" value="$200k+" />
                <span className="light-black">|</span>
                <Option selected={selected} setSelected={setSelected} text="listed" value="any time" />
                <span className="light-black">|</span>
            </div>
        </div>
        {/* {selected === "work types" && <ExpandedOption />} */}
        </>
    )
}

function Option(props) {

    const { selected, setSelected, text, value } = props;
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
        selected === undefined ? setSelected(text) : setSelected(undefined); 
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
                <span className={`${expanded && 'flip'} ${selected !== undefined && selected !== text ? 'black' : 'white'} material-icons-outlined`}>expand_more</span>
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