import './Dropdown.css';
import Item from './Item';

function Dropdown() {

    const data = [
        { classification: 'Accounting', jobCount: '8,875' },
    ]

    return (
        <div className="dropdown">
            <ul className="dropdown-list">
                {data.map(item => { 
                    return <Item classification={item.classification} jobCount={item.jobCount}/>
                })}
            </ul>
        </div>
    )
}

export default Dropdown;