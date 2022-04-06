function Link(props) {

    const { id, type, text, selected, setSelected } = props;

    const handleClick = (event) => {
        event.preventDefault();
        setSelected(id)
    }

    return (
        <li id={id} className={`${type} ${selected === id && 'selected'}`} onClick={handleClick}>
            {id === 'career' && <img className="panda" src="/panda.png" alt="panda"></img>}
            <a href="/">{text}</a>
        </li>
    )
}

export default Link;