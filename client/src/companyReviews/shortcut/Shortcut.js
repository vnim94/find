import './Shortcut.css';
import { Search } from '../companies/CompanySearch';

function CompanyShortcut() {
    return (
        <div className="bg-light-grey shortcuts">
            <div className="page flex flex-row">
                <div className="shortcuts-search-bar">
                    <Search />
                </div>
                <div className="company-shortcut-links flex flex-col flex-jc-c">
                    <a className="green" href="/">See all companies</a>
                    <a className="green" href="/">Community guidelines</a>
                    <a className="green" href="/">Information for employers</a>
                </div>
            </div>
        </div>
    )
}

export default CompanyShortcut;