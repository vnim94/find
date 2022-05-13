import './Components.css';
import { useEffect, useState, useRef } from 'react';

export function Carousel() {

    const [selected, setSelected] = useState('start-again');
    const cards = [
        {
            img: 'start-again', 
            heading: '6 tips for starting a new career from scratch', 
            text:"Dreaming of a whole new career? Here's how to start making the move.",
            time: 3.5
        },
        {
            img: 'hybrid',
            heading: 'The best way to ask about hybrid working in an interview',
            text: "Not sure how to ask about hybrid working in your next interview? Here's how to go about it.",
            time: 3.5
        },
        {
            img: 'cover-letter',
            heading: '7 cover letter openers to land you an interview',
            text: "Struggling with writing a cover letter? Here's how to start strong to score that interview",
            time: 3.5
        },
        {
            img: 'resume-template',
            heading: 'Free resume template',
            text: "Craft a winning resume with Find's free resume template"
        }
    ]

    return (
        <div className="carousel">
            <div className="slides flex flex-row">
                {cards.map((card, index) => <CarouselCard key={index} card={card} selected={selected}/>)}
            </div>
            <div className="flex flex-jc-fe">
                {cards.map((card,index) => {
                    return <div key={index} className={`${selected === card.img && 'selected'} bg-grey circle`} onClick={() => setSelected(card.img)}></div>
                })}
            </div>
        </div>
    )
}

function CarouselCard({ card, selected }) {

    const ref = useRef();
    const { img, heading, text, time } = card;

    useEffect(() => {
        if (selected === img && ref.current) ref.current.scrollIntoView({ block: "nearest" });
    },[selected])

    return (
        <div ref={ref} className="carousel-card">
            <img className="carousel-card-img" src={`/${img}.png`}></img>
            <div className="carousel-card-content">
                <div className="carousel-card-heading">
                    <span className="bold large">{heading}</span>
                </div>
                <div className="carousel-card-text flex flex-col flex-jc-sb">
                    <span className="medium">{text}</span>
                    <span>{time && `${time} min read`}</span>
                </div>
            </div>
        </div>
    )
}

export function Tile() {
    return (
        <div className="section-tile">
            <img src="/talk.jpg"></img>
            <div className="bg-white flex flex-col flex-jc-sb">
                <span className="bold">How to talk to your boss about hybrid working</span>
                <div className="flex flex-col">
                    <span className="small grey">3.5 min read</span>
                    <span className="small">Workplace tips &amp; wellbeing</span>
                </div>
            </div>
        </div>
    )
}

export function Card() {

}

export function Bubble({ text, link }) {
    return (
        <div className="bubble">
            <a className="green" href={link}>{text}</a>
        </div>
    )
}

export function SectionSummary() {
    return (
        <div>
            
        </div>
    )
}

export function Section({ children, heading, link, text }) {
    return (
        <div className="section flex flex-col">
            <div className="section-heading flex flex-row flex-ai-c flex-jc-sb">
                <span className="bold font-size-xl">{heading}</span>
                {link && <a className="bold medium" href="/">See all</a>}
            </div>
            <span className="medium">{text}</span>
            {children}
        </div>
    )
}

export function Banner({ children, heading }) {
    return (
        <div classname="grid grid-col-2">
            <div className="border grid grid-col-2 col-gap-15 row-gap-15">
                <div>
                    <span>TOOLS</span>
                </div>
                <div>
                    <span>{heading}</span>
                </div>
                <div className="flex-wrap">
                    {children}
                </div>
            </div>
            {/* <img className="test" src="/career.svg"></img> */}
        </div>
    )
}

export function BannerBubble({ text, icon }) {
    return (
        <div className="banner-bubble flex flex-row flex-ai-c">
            <span className="material-icons-outlined">{icon}</span>
            <span className="bold medium">{text}</span>
        </div>
    )
}
