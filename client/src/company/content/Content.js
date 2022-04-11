import './Content.css';

function CompanyContent() {
    return (
        <div className="bg-white content">
            <div className="page flex flex-col">
                <div className="flex flex-jc-c">
                    <h2>Make better career decisions</h2>
                </div>
                <div className="flex flex-row flex-jc-c">
                    <Card img="" heading="Latest reviews" text="Get the low-down on companies with 1,000 new reviews daily" />
                    <Card img="" heading="Comprehensive ratings" text="Companies get rated thoroughly from every angle imaginable" />
                    <Card img="" heading="By real employees" text="Read about companies through their employees' words" />
                </div>
            </div>
        </div>
    )
}

function Card(props) {

    const { img, heading, text } = props;

    return (
        <div className="content-card">
            <img src={img}></img>
            <span><b>{heading}</b></span>
            <span className="center-text">{text}</span>
        </div>
    )

}

export default CompanyContent;