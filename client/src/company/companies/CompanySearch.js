import './CompanySearch.css';

function CompanySearch() {
    return (
        <div className="company-search">
            <div className="flex flex-col flex-ai-c">
                <div className="company-search-bar">
                    <h2>Discover the right workplace for you</h2>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}

export function SearchBar() {
    return (
        <div className="form-group">
            <label>Search for a company</label>
            <input className="search-bar form-control" type="search" placeholder="Search companies" />
            <span className="search-icon material-icons-outlined">search</span>
        </div>
    )
}

export default CompanySearch;