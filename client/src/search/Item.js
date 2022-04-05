import { useState } from 'react';

function Item(props) {

    const { classification, classifications, setClassifications, jobCount } = props;
    const [checked, setChecked] = useState(classifications.indexOf(classification) > -1);

    const handleClick = () => {
        setChecked(!checked);
        classifications.indexOf(classification) > -1 ? setClassifications(classifications.filter(c => c !== classification)) : setClassifications([ ...classifications, classification]);
    }

    return (
        <li key={classification.toLowerCase()} className="flex flex-row flex-jc-sb flex-ai-c" onClick={handleClick}>
            <div className="flex flex-ai-c">
                <span className={`${checked && 'checked'} checkbox`}></span>
                <span>{classification}</span>
            </div>
            <span>{jobCount}</span>
        </li>
    )
}

export default Item;