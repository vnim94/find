import './Directory.css';
import { SearchBar } from '../companies/CompanySearch';

function Directory(props) {
    return (
        <div className="directory">
            <div className="page flex flex-row flex-jc-sb flex-ai-c">
                <a className="directory-link" href="/companies/browse">Company directory</a>
                {props.search && <SearchBar />}
            </div>
        </div>
    )
}

export default Directory;