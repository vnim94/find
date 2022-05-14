import { Banner, BannerBubble, Bubble, Carousel, CarouselCard, Section, CareerSection, IndustrySection, Tile } from '../Components';
import { useState } from 'react';

function Home() {

    const [selectedCard, setSelectedCard] = useState();
    const [expandStudy, setExpandStudy] = useState();

    const cards = [
        {
            img: 'start-again.png', 
            heading: '6 tips for starting a new career from scratch', 
            text:"Dreaming of a whole new career? Here's how to start making the move.",
            time: 3.5
        },
        {
            img: 'hybrid.png',
            heading: 'The best way to ask about hybrid working in an interview',
            text: "Not sure how to ask about hybrid working in your next interview? Here's how to go about it.",
            time: 3.5
        },
        {
            img: 'cover-letter.png',
            heading: '7 cover letter openers to land you an interview',
            text: "Struggling with writing a cover letter? Here's how to start strong to score that interview",
            time: 3.5
        },
        {
            img: 'resume-template.png',
            heading: 'Free resume template',
            text: "Craft a winning resume with Find's free resume template"
        }
    ]
    const fields = [
        'Accounting', 'Administration & Office Support', 'Building & Construction',
        'Business', 'Child Care', 'Community Services', 'Conservation & Land Management',
        'Education & Teaching', 'Education Support', 'Fitness', 'Food and Hospitality',
        'Human Resources', 'Information Technology', 'Marketing', 'Nursing', 'Nutrition',
        'Project Management', 'Psychology', 'Retail', 'Work Health & Safety'
    ]    

    return (
        <div className="bg-pale-grey flex flex-col flex-ai-c">
            <Carousel cards={cards} selected={selectedCard} setSelected={setSelectedCard}>
                {cards && cards.map((card, index) => 
                <CarouselCard key={index} card={card} selected={selectedCard}>
                    <div className="carousel-card-text flex flex-col flex-jc-sb">
                        <span className="medium">{card.text}</span>
                        <span>{`${card.time} min read`}</span>
                    </div>
                </CarouselCard>)}
            </Carousel>
            <Section heading="Recently published by Find" link={true}>
                <div className="grid grid-col-3 col-gap-15 row-gap-15">
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                </div>
            </Section>
            <Section heading="Browse courses by field of study" text="Find the right course for your career with Find Learning">
                <div className="bubbles grid grid-col-4 col-gap-15 row-gap-15">
                    {fields.map((field, index) => {
                        if (!expandStudy) {
                            if (index < 8) return <Bubble key={index} text={field} />
                        } else {
                            return <Bubble key={index} text={field} />
                        }
                        return null;
                    })}
                </div>
                <div className="flex flex-row flex-jc-c">
                    <div className="cursor flex flex-ai-c" onClick={() => setExpandStudy(!expandStudy)}>
                        <span className="bold medium">See {expandStudy ? 'less' : 'all'} fields of study</span>
                        <span className={`${expandStudy && 'expand'} material-icons-outlined`}>expand_more</span>
                    </div>
                </div>
                <div className="logo flex flex-jc-c flex-ai-c">
                    <span className="medium">Powered by</span>
                    <img src="/magnifying-glass.png" alt="logo"></img>
                    <span className="bold medium">find</span>
                    <span className="bold green medium">Learning</span>
                </div>
            </Section>
            <Banner heading="Handy tools to make your next move">
                <BannerBubble icon="description" text="Resume template"/>
                <BannerBubble icon="description" text="Cover letter template"/>
                <BannerBubble icon="description" text="Transferable skills checklist"/>
                <BannerBubble icon="description" text="Job trends explorer"/>
            </Banner>
            <CareerSection />
            <Section heading="Changing careers" link={true}>
                <div className="grid grid-col-3 col-gap-15 row-gap-15">
                    <Tile />
                    <Tile />
                    <Tile />
                </div>
            </Section>
            <Banner>
                <BannerBubble icon="chat_bubble_outline" text="Practice Interview Builder"/>
                <BannerBubble icon="description" text="Pay Calculator"/>
            </Banner>
            <IndustrySection />
            <Section heading="Job &amp; salary trends" link={true}>
                <div className="grid grid-col-3 col-gap-15 row-gap-15">
                    <Tile />
                    <Tile />
                    <Tile />
                </div>
            </Section>
        </div>
    )
}

export default Home;