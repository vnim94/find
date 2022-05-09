import { useSelector } from 'react-redux';

function Culture() {

    const company = useSelector(state => state.company.details);
    const { keyMessage, values, perks, diversity } = company.culture;

    return (<>
        <div className="company-profile-section flex-col">
            <span className="large">Culture and values</span>
            <div>
                <img alt="company-culture-values"></img>
                <div className="key-message">
                    <span className="medium">{keyMessage.heading}</span>
                    <p>{keyMessage.text}</p>
                </div>
            </div>
            <div className="values flex flex-row">
                {company.culture && values.map((value,index) => <ValuesCard key={index} number={index+1}heading={value.heading} text={value.text}/>)}
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Perks and benefits</span>
            <div className="perks">
                {company.culture && perks.map((perk,index) => <PerkCard key={index} heading={perk.heading} text={perk.text}/>)}
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Our approach to diversity, equity and inclusion</span>
            <p>{diversity}</p>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Gallery</span>
            <div className="gallery flex flex-jc-sb flex-wrap">
                <img alt="company-gallery"></img>
            </div>
        </div>
    </>)
}

function ValuesCard({ number, heading, text }) {
    return (
        <div className="values-card">
            <span className="medium">{number}. {heading}</span>
            <p>{text}</p>
        </div>
    )
}

function PerkCard(props) {

    const { heading, text } = props;

    return (
        <div className="section-card">
            <div>
                <span className="material-icons-outlined">auto_awesome</span>
            </div>
            <div className="flex flex-col">
                <span className="medium">{heading}</span>
                <span className="grey">{text}</span>
            </div>
        </div>
    )
}

export default Culture;