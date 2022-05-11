import './Directory.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from '../companies/CompanySearch';
import { getCompanies } from '../company.api';

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

    const navigate = useNavigate();
    const [letter, setLetter] = useState();
    const [companies, setCompanies] = useState();

    const handleClick = (event) => {
        setLetter(event.target.innerText);
        navigate(`/companies/browse-${event.target.innerText.toLowerCase()}`);
    }

    useEffect(() => {
        async function fetchCompanies() {
            const response = await getCompanies();
            if (response.data) setCompanies(response.data.companies);
        }
        fetchCompanies();
    })

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
                            return <span key={i} className="directory-listing" onClick={handleClick}>{l}</span>
                        })}
                    </div>
                </div>
                {letter && <div className="listings">
                    {companies && companies.map((company,index) => {
                        if (company.name.toUpperCase().startsWith(letter)) {
                            return <div key={index} className="company-listing">
                                <Link to={`/companies/${company.name.toLowerCase()}-${company.id}`} key={index}>{company.name}</Link>
                            </div>
                        } 
                    })}
                </div>}
            </div>
        </div>
    )
}

export default Directory;