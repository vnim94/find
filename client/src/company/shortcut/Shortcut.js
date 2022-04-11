import './Shortcut.css';
import { SearchBar } from '../companies/CompanySearch';

function CompanyShortcut() {
    return (
        <div className="bg-light-grey shortcuts">
            <div className="page flex flex-row">
                <div className="shortcuts-search-bar">
                    <SearchBar />
                </div>
                <div className="company-shortcut-links flex flex-col flex-jc-c">
                    <a href="/">See all companies</a>
                    <a href="/">Community guidelines</a>
                    <a href="/">Information for employers</a>
                </div>
            </div>
        </div>
    )
}

export default CompanyShortcut;