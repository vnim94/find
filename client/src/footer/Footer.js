import { useState } from 'react';

function Footer() {
    return (
        <div className="bg-grey-1 flex justify-center">
            <div className="w-[992px] flex flex-col">
                <div className="grid grid-cols-4">
                    <div className="flex flex-col">
                        <span className="font-bold py-2">Tools</span>
                        <div className="flex flex-col text-green-4 space-y-2">
                            <a className="hover:cursor-pointer hover:underline" href="/">Job search</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Profile</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Recommended jobs</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Saved searches</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Saved jobs</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Applied jobs</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Career Advice</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Explore Careers</a> 
                            <a className="hover:cursor-pointer hover:underline" href="/">Company reviews</a>
                            <ExpandableLink text="Download apps" />
                            <ExpandableLink text="Find sites" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold py-2">Company</span>
                        <div className="flex flex-col text-green-4 space-y-2">
                            <a className="hover:cursor-pointer hover:underline" href="/">About Find</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Newsroom</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Investors</a>
                            <ExpandableLink text="International partners" />
                            <ExpandableLink text="Partner services" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold py-2">Connect</span>
                        <div className="flex flex-col text-green-4 space-y-2">
                            <a className="hover:cursor-pointer hover:underline" href="/">Help centre</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Contact us</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Work for Find</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Product &amp; Tech Blog</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Find videos</a>
                            <ExpandableLink text="Social" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold py-2">Employers</span>
                        <div className="flex flex-col text-green-4 space-y-2">
                            <a className="hover:cursor-pointer hover:underline" href="/">Register for free</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Post a job ad</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Products &amp; prices</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Customer service</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Hiring Advice</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Market Insights</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Recruitment software partners</a>
                        </div>
                    </div>
                </div>
                <div className="py-7 space-x-5">
                    <a className="hover:cursor-pointer hover:underline" href="/">Privacy</a>
                    <a className="hover:cursor-pointer hover:underline" href="/">Terms &amp; Conditions</a>
                    <a className="hover:cursor-pointer hover:underline" href="/">Protect yourself online</a>
                    <span>© Find. All rights reserved</span>
                </div>
            </div>
        </div>
    )
}

function ExpandableLink({ text }) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex items-center hover:cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <span>{text}</span> 
            <span className={`${expanded && 'rotate-180'} transition material-icons-outlined`}>expand_more</span>
        </div>
    )
}

export default Footer;