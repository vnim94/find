import './CompanySearch.css';

function CompanySearch() {
    return (
        <div className="company-search">
            <div className="flex flex-col">
                <h2>Discover the right workplace for you</h2>
                <div>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}

function SearchBar() {
    return (
        <div className="company-search-bar form-group">
            <label>Search for a company</label>
            <input className="search-bar form-control" type="search" placeholder="Search companies" />
            <span className="search-icon material-icons-outlined">search</span>
        </div>
    )
}

export default CompanySearch;