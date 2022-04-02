function Link(props) {

    const { id, type, text, selected, setSelected } = props;

    const handleClick = (event) => {
        event.preventDefault();
        setSelected(id)
    }

    return (
        <li id={id} className={`${type} ${selected === id && 'selected'}`} onClick={handleClick}>
            <a href="/">{text}</a>
        </li>
    )
}

export default Link;