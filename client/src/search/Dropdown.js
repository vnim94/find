import './Dropdown.css';

function Dropdown() {

    return (
        <div className="dropdown">
            <ul className="dropdown-list">
                <li className="flex flex-row flex-jc-sb flex-ai-c">
                    <div className="flex flex-ai-c">
                        <span className="checkbox"></span>
                        <span>Accounting</span>
                    </div>
                    <span>1,000</span>
                </li>
                <li className="flex flex-row flex-jc-sb flex-ai-c">
                    <div className="flex flex-ai-c">
                        <span className="checkbox"></span>
                        <span>Administration &amp; Office Support</span>
                    </div>
                    <span>1,000</span>
                </li>
            </ul>
        </div>
    )
}

export default Dropdown;