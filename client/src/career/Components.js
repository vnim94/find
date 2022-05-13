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
        if (selected === img && ref.current) ref.current.scrollIntoView();
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
        <div className="tile">

        </div>
    )
}

export function Card() {

}

export function Bubble() {
    return (
        <div className="bubble">

        </div>
    )
}

export function SectionSummary() {
    return (
        <div>
            
        </div>
    )
}

export function Section() {
    return (
        <div>

        </div>
    )
}