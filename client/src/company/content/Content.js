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

export function Disclaimer() {
    return (
        <div className="disclaimer bg-light-grey">
            <div className="page">
                <span className="grey">Company Reviews published on our site are the views and opinions of their authors and do not represent the views and opinions of Seek.com.au or its personnel. Seek.com.au does not verify the truth or accuracy of any reviews and does not adopt or endorse any of the comments posted. Seek.com.au posts reviews for what they are worth and for information purposes only to assist candidates to find employment.</span>
            </div>
        </div>
    )
}


export default CompanyContent;