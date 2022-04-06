import './Dropdown.css';
import Item from './Item';

function Dropdown(props) {

    const { classifications, setClassifications, data } = props;

    return (
        <div className="dropdown">
            <ul className="dropdown-list">
                {data.map((item,index) => { 
                    return <Item key={index} classification={item.classification} classifications={classifications} setClassifications={setClassifications} jobCount={item.jobCount}/>
                })}
            </ul>
        </div>
    )
}

export default Dropdown;