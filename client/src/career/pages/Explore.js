import { useState } from 'react'; 
import { Carousel, CarouselCard, CareerSection, IndustrySection, SectionSummary, Section, Tile  } from '../Components';

function Explore() {
    
    const [selectedCard] = useState(); 

    const cards = [
        {
            img:'frontend.jpg',
            heading: 'Front End Developer',
            salary: '$115k',
            rating: 4.5,
            description: 'A Frontend Developer is a software developer who specialises in building the user-facing elements of websites and other web-based content. They commonly work with programming languages like JavaScript, HTML and CSS. Frontend Developers use a blend of creative and technical skills to design and build user-friendly content.'
        },
        {
            img: 'software-eng.jpg',
            heading: 'Software Engineer',
            salary: '$115k',
            rating: 4,
            description: 'Software Engineers design, develop and maintain software systems. The complexity and size of these systems can range from small scale desktop applications to vast international online platforms.'
        },
        {
            img: 'software-dev.jpg',
            heading: 'Software Developer',
            salary: '$110k',
            rating: 4,
            description: "Software Developers are computer science specialists who creates computer software and applications. They are proficient in the use of computer programming languages, which they use to write the 'code' which performs the software's functions. Experienced Software Developers usually have a specialisation in one or more fields of software development, such as web development or database development."
        }
    ]

    return (
        <div className="bg-pale-grey flex flex-col flex-ai-c">
            <Carousel cards={cards} selected={selectedCard}>
                {cards.map((card,index) => 
                    <CarouselCard key={index} card={card}>

                    </CarouselCard>
                )}
            </Carousel>
            <IndustrySection />
            <SectionSummary img="/explore-section.svg"/>
            <Section heading="High job satisfaction careers" text="Roles with a 4+ rating for job satisfaction" link={true}>
                <div className="grid grid-col-3 col-gap-15 row-gap-15">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
            </Section>
            <CareerSection/>
            <Section heading="High salary careers" text="Roles with typical annual salary over $100k" link={true}>
                <div className="grid grid-col-3 col-gap-15 row-gap-15">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
            </Section>
            <Section heading="Changing careers" link={true}>
                <div className="grid grid-col-3 col-gap-15 row-gap-15">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
            </Section>
            <Section heading="Job &amp; salary trends" link={true}>
                <div className="grid grid-col-3 col-gap-15 row-gap-15">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
            </Section>
            <Section heading="Resources &amp; templates" link={true}>
                <div className="grid grid-col-3 col-gap-15 row-gap-15">
                    <Tile/>
                    <Tile/>
                    <Tile/>
                </div>
            </Section>
        </div>
    )
}

export default Explore;