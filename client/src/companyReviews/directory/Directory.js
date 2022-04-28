import './Directory.css';
import { useState } from 'react';
import { SearchBar } from '../companies/CompanySearch';

function Directory(props) {
    return (
        <div className="directory">
            <div className="page flex flex-row flex-jc-sb flex-ai-c">
                <a className="directory-link" href="/companies/browse">
                    {props.bold ? <b>Company directory</b> : 'Company directory'}
                </a>
                {props.search && <SearchBar />}
            </div>
        </div>
    )
}

export function BrowseDirectory() {

    const [letter, setLetter] = useState();

    const companies = ['CompanyA','CompanyB','CompanyC','CompanyD']

    return (
        <div className="directory-browse">
            <div className="page flex flex-col">
                <div className="company-letter">
                    <b>Company Directory</b>
                    {letter && 
                    <>
                        <span className="grey material-icons-outlined">navigate_next</span>
                        <span>{letter}</span>
                    </>}
                </div>
                <div className="browse">
                    <span><b>Browse by name</b></span>
                    <div className="directory-listings">
                        {'#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l, i) => {
                            return <span key={i} className="directory-listing" onClick={() => setLetter(l)}>{l}</span>
                        })}
                    </div>
                </div>
                {letter && <div className="listings">
                    {companies.map((c,i) => {
                        return <div key={i} className="company-listing">
                            <span>{c}</span>
                        </div>
                    })}
                </div>}
            </div>
        </div>
    )
}

export default Directory;