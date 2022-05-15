import './Components.css';
import { useEffect, useState, useRef } from 'react';
import { getAllIndustries } from '../jobSearch/job.api';

export function Carousel({ cards, children, selected, setSelected }) {
    return (
        <div className="carousel page">
            <div className="slides flex flex-row">{children}</div>
            <div className="flex flex-jc-fe">
                {cards && cards.map((card,index) => {
                    return <div key={index} className={`${selected === card.img ? 'selected' : !selected ? index === 0 && 'selected': undefined} bg-grey circle`} onClick={() => setSelected(card.img)}></div>
                })}
            </div>
        </div>
    )
}

export function CarouselCard({ card, children, selected }) {
    const ref = useRef();
    const { img, heading } = card;

    useEffect(() => {
        if (selected === img && ref.current) ref.current.scrollIntoView({ block: "nearest" });
    },[selected,img])

    return (
        <div ref={ref} className="carousel-card">
            <img className="carousel-card-img" src={`/${img}`} alt={img}></img>
            <div className="carousel-card-content">
                <div className="carousel-card-heading">
                    <span className="bold large">{heading}</span>
                </div>
                {children}
            </div>
        </div>
    )
}

export function Tile() {
    return (
        <div className="section-tile">
            <img src="/talk.jpg" alt="talk"></img>
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

export function CardSection() {
    return (
        <div>

        </div>
    )
}

export function Bubble({ text, link }) {
    return (
        <div className="bubble">
            <a className="green" href={link}>{text}</a>
        </div>
    )
}

export function SectionSummary({ children, img }) {
    return (
        <div className="section page flex flex-col">
            <span className="bold font-size-xl">In this section</span>
            <div className="section-summary flex flex-ai-c flex-jc-c">
                <img className="section-summary-img" src={img}></img>
                <div className="grid grid-col-3 col-gap-15 row-gap-15">
                    <span>High job satisfaction careers</span>
                    <span>High salary careers</span>
                    <span>Changing careers</span>
                    <span>Job &amp; salary trends</span>
                    <span>Resources &amp; templates</span>
                </div>
            </div>
        </div>
    )
}

export function Section({ children, heading, link, text }) {
    return (
        <div className="section page flex flex-col">
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
        <div className="bg-light-black career-banner flex flex-row flex-ai-c">
            <div className="page flex flex-row flex-ai-c">
                <div className="banner-content">
                    <div>
                        <span className="bold bg-dark-green white banner-btn">TOOLS</span>
                    </div>
                    <span className="bold white large">{heading}</span>
                    <div className="grid grid-col-2 col-gap-15 row-gap-15">
                        {children}
                    </div>
                </div>
                <img className="banner-img" src="/career.svg" alt="career"></img>
            </div>
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

export function IndustrySection() {

    const [expandIndustry, setExpandIndustry] = useState();
    const [industries, setIndustries] = useState();

    useEffect(() => {
        async function fetchIndustries() {
            const response = await getAllIndustries();
            if (response.data.allIndustries) setIndustries(response.data.allIndustries);
        }
        fetchIndustries();
    },[])

    return (
        <Section heading="Browse careers by industry" text="Salaries, job satisfaction, jobs on Find, courses and in-demand skills">
            <div className="bubbles grid grid-col-4 col-gap-15 row-gap-15">
                {industries && industries.map((industry, index) => {
                    if (!expandIndustry) {
                        if (index < 8) return <Bubble key={index} text={industry.name} />
                    } else {
                        return <Bubble key={index} text={industry.name} />
                    }
                    return null;
                })}
            </div>
            <div className="flex flex-row flex-jc-c">
                <div className="cursor flex flex-ai-c" onClick={() => setExpandIndustry(!expandIndustry)}>
                    <span className="bold medium">See {expandIndustry ? 'less' : 'all'} industries</span>
                    <span className={`${expandIndustry && 'expand'} material-icons-outlined`}>expand_more</span>
                </div>
            </div>
        </Section>
    )
}

export function CareerSection() {
    
    const interests = [
        'Being creative', 'Working with children', 'Helping people',
        'Working with numbers', 'Working with computers', 'Using my hands',
        'Being outdoors', 'Interacting with customers', 'Less work with tools', 'Working with animals'
    ]
    
    return (
        <Section heading="Explore careers by interest" text="Select your area of interest to browse related careers">
            <div className="bubbles grid grid-col-5 col-gap-15 row-gap-15">
                {interests.map((interest, index) => {
                    return <Bubble key={index} text={interest} />
                })}
            </div>
        </Section>
    )
}