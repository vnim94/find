import { useState } from 'react';

function Footer() {
    return (
        <div className="py-10 bg-grey-1 flex justify-center">
            <div className="w-[992px] flex flex-col">
                <div className="grid grid-cols-4 pb-10">
                    <div className="flex flex-col">
                        <span className="font-bold py-2">Job seekers</span>
                        <div className="flex flex-col text-sm space-y-2">
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
                        <span className="font-bold py-2">Employers</span>
                        <div className="flex flex-col text-sm space-y-2">
                            <a className="hover:cursor-pointer hover:underline" href="/">Register for free</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Post a job ad</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Products &amp; prices</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Customer service</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Hiring Advice</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Market Insights</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Recruitment software partners</a>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold py-2">About Find</span>
                        <div className="flex flex-col text-sm space-y-2">
                            <a className="hover:cursor-pointer hover:underline" href="/">About Find</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Newsroom</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Investors</a>
                            <ExpandableLink text="International partners" />
                            <ExpandableLink text="Partner services" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold py-2">Connect</span>
                        <div className="flex flex-col text-sm space-y-2">
                            <a className="hover:cursor-pointer hover:underline" href="/">Help centre</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Contact us</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Work for Find</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Product &amp; Tech Blog</a>
                            <a className="hover:cursor-pointer hover:underline" href="/">Find videos</a>
                            <ExpandableLink text="Social" />
                        </div>
                    </div>
                </div>
                <div className="py-7 space-x-5 border-t border-t-grey-3 text-sm flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <span className="text-base material-icons-outlined">location_on</span>
                        <span>Australia</span>
                        <span className="material-icons-outlined rotate-180">expand_more</span>
                    </div>
                    <div className="space-x-5">
                        <a className="hover:cursor-pointer hover:underline" href="/">Privacy</a>
                        <a className="hover:cursor-pointer hover:underline" href="/">Terms &amp; Conditions</a>
                        <a className="hover:cursor-pointer hover:underline" href="/">Protect yourself online</a>
                        <span>© Find. All rights reserved</span>
                    </div>
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