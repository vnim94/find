import './Discovery.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Discovery() {

    const user = useSelector(state => state.user.details);
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="bg-pale-grey discovery">
            <div className="page">
                <div className={`cursor discovery-header ${expanded && 'expanded'}`} onClick={() => setExpanded(!expanded)}>
                    <span className="medium"><b>Hi {user ? user.firstName : 'there'},</b> ready to explore advice and career options tailored to you?</span>
                    <span className="material-icons-outlined">{expanded ? 'remove' : 'add'}</span>
                </div>
                {expanded && <div className="discovery-dropdown">
                    <div className="flex flex-col">
                        <div className="border-left flex flex-col">
                            <span className="medium">Let's get started...</span>
                            <span className="bold font-size-xl">What's your goal today?</span>
                        </div>
                        <img src="/career.svg"></img>
                    </div>
                    <div className="grid row-gap-15">
                        <Card icon="explore" text="Explore how I can put my skills to work" />
                        <div className="grid grid-col-2 col-gap-15 row-gap-15">
                            <Card icon="find" text="Find the right job for me"/>
                            <Card icon="pathway" text="Find the pathway into a role"/>
                            <Card icon="change" text="See career change ideas"/>
                            <Card icon="progress" text="Progress my career"/>
                            <Card icon="growth" text="See job growth trends"/>
                            <Card icon="resume" text="Improve my resume"/>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

function Card({ icon, text }) {
    return (
        <div className="discovery-card">
            <img className="card-icon" src={`/${icon}.svg`}></img>
            <span>{text}</span>
        </div>
    )
}

export default Discovery;