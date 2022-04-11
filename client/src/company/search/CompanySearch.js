import './CompanySearch.css';

function CompanySearch() {
    return (
        <div className="company-search">
            <div className="flex flex-col">
                <h1>Discover the right workplace for you</h1>
                <span>Search for a company</span>
                <SearchBar />
            </div>
        </div>
    )
}

function SearchBar() {
    return (
        <div className="form-group">
            <input className="search-bar form-control" type="search" />
            <span className="material-icons-outlined">search</span>
        </div>
    )
}

export default CompanySearch;