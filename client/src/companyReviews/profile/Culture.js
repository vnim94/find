function Culture() {
    return (<>
        <div className="company-profile-section flex-col">
            <span className="large">Culture and values</span>
            <div>
                <img></img>
                <div className="key-message">

                </div>
            </div>
            <div className="flex flex-row">
                <div className="values-card">
                    <span className="medium">1. We always...Seek better</span>
                    <p></p>
                </div>
                <div>
                    <span className="medium">2. We always... Bite the bullet</span>
                    <p></p>
                </div>
                <div>
                    <span className="medium">3. We always... Think for tomorrow</span>
                    <p></p>
                </div>
                <div>
                    <span className="medium">4. We always... Share the good stuff</span>
                    <p></p>
                </div>
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Perks and benefits</span>
            <div className="flex flex-row flex-wrap">
                <Card heading="Family focus" text="14 weeks paid primary carer leave with Parental coaching program Flexible working" />
                <Card heading="Family focus" text="14 weeks paid primary carer leave with Parental coaching program Flexible working" />
                <Card heading="Family focus" text="14 weeks paid primary carer leave with Parental coaching program Flexible working" />
                <Card heading="Family focus" text="14 weeks paid primary carer leave with Parental coaching program Flexible working" />
                <Card heading="Family focus" text="14 weeks paid primary carer leave with Parental coaching program Flexible working" />
                <Card heading="Family focus" text="14 weeks paid primary carer leave with Parental coaching program Flexible working" />
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Our approach to diversity, equity and inclusion</span>
            <p>
                We recognise and respect qualities which are unique to individuals such as gender, language, enthnicity, age, religion, disability and sexual orientation. 
                We are recognised as having an approach to diversity and inclusion which is genuine and embedded within our culture.
            </p>
        </div>
        <div className="company-profile-section flex-col">
            <span className="large">Gallery</span>
            <div className="flex flex-jc-sb flex-wrap">
                <img></img>
                <img></img>
                <img></img>
                <img></img>
                <img></img>
            </div>
        </div>
    </>)
}

function Card(props) {

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