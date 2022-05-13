import { Banner, BannerBubble, Bubble, Carousel, Section, Tile } from '../Components';
import { useState } from 'react';

function Home() {

    const [expandStudy, setExpandStudy] = useState();
    const [expandIndustry, setExpandIndustry] = useState();
    const fields = [
        'Accounting', 'Administration & Office Support', 'Building & Construction',
        'Business', 'Child Care', 'Community Services', 'Conservation & Land Management',
        'Education & Teaching', 'Education Support', 'Fitness', 'Food and Hospitality',
        'Human Resources', 'Information Technology', 'Marketing', 'Nursing', 'Nutrition',
        'Project Management', 'Psychology', 'Retail', 'Work Health & Safety'
    ]    
    const interests = [
        'Being creative', 'Working with children', 'Helping people',
        'Working with numbers', 'Working with computers', 'Using my hands',
        'Being outdoors', 'Interacting with customers', 'Less work with tools', 'Working with animals'
    ]
    const industries = [

    ]

    return (
        <div className="bg-pale-grey flex flex-jc-c">
            <div className="page">
                <Carousel />
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
                <Banner>
                    <BannerBubble icon="description" text="Resume template"/>
                    <BannerBubble icon="description" text="Cover letter template"/>
                    <BannerBubble icon="description" text="Transferable skills checklist"/>
                    <BannerBubble icon="description" text="Job trends explorer"/>
                </Banner>
                <Section heading="Explore careers by interest" text="Select your area of interest to browse related careers">
                    <div className="bubbles grid grid-col-5 col-gap-15 row-gap-15">
                        {interests.map((interest, index) => {
                            return <Bubble key={index} text={interest} />
                        })}
                    </div>
                </Section>
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
                <Section heading="Browse careers by industry" text="Salaries, job satisfaction, jobs on Find, courses and in-demand skills">
                    <div className="bubbles grid grid-col-4 col-gap-15 row-gap-15">
                        {fields.map((field, index) => {
                            if (!expandStudy) {
                                if (index < 8) return <Bubble key={index} text={field} />
                            } else {
                                return <Bubble key={index} text={field} />
                            }
                        })}
                    </div>
                    <div className="flex flex-row flex-jc-c">
                        <div className="cursor flex flex-ai-c" onClick={() => setExpandStudy(!expandStudy)}>
                            <span className="bold medium">See {expandStudy ? 'less' : 'all'} fields of study</span>
                            <span className={`${expandStudy && 'expand'} material-icons-outlined`}>expand_more</span>
                        </div>
                    </div>
                </Section>
                <Section heading="Job &amp; salary trends" link={true}>
                    <div className="grid grid-col-3 col-gap-15 row-gap-15">
                        <Tile />
                        <Tile />
                        <Tile />
                    </div>
                </Section>
            </div>
        </div>
    )
}

export default Home;