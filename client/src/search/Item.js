import { useState } from 'react';

function Item(props) {

    const { classification, jobCount } = props;
    const [checked, setChecked] = useState(false);

    return (
        <li key={classification.toLowerCase()} className="flex flex-row flex-jc-sb flex-ai-c" onClick={() => setChecked(!checked)}>
            <div className="flex flex-ai-c">
                <span className={`${checked && 'checked'} checkbox`}></span>
                <span>{classification}</span>
            </div>
            <span>{jobCount}</span>
        </li>
    )
}

export default Item;