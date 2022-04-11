import './Background.css';

function Background(props) {

    const { heading, subHeading } = props;

    return (
        <div className={`${heading && 'smaller'} bg-light-black background`}>
            {/* <img className="bg-img"></img> */}
            <div className="text-overlay flex flex-jc-c flex-ai-c">
                <div className="flex flex-col flex-jc-c flex-ai-c">
                    {heading && <h1>{heading}</h1>}
                    {subHeading && <h3>{subHeading}</h3>}
                </div>
            </div>
        </div>
    )
}
export default Background;