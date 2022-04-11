import './Companies.css';
import CompanySearch from './CompanySearch';

function Companies() {
    return (
        <div className="bg-light-grey companies">
            <div className="page">
                <CompanySearch />
                <div className="review-heading flex flex-row flex-jc-sb">
                    <span className="large">Popular employers</span>
                    <button className="bg-dark-green white btn">Write a Review</button>
                </div>
                <div className="tiles">
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                    <Tile />
                </div>
                <div className="flex flex-jc-c">
                    <a className="bg-dark-green btn white" href="/companies/browse-reviews">See all companies</a>
                </div>
            </div>
        </div>
    )
}

function Tile() {
    return (
        <div className="tile">
            <div className="tag-div flex flex-ai-c flex-jc-fe">
                <span className="tag">hiring</span>
            </div>
            <div>
                <img className="company-logo" src="/mcdonalds.jpg"></img>
            </div>
            <div className="company-details">
                <span><b>McDonald's</b></span>
                <div className="rating">
                    {Array(5).fill().map(_ => { return <span className="medium material-icons-outlined">star</span> })}
                </div>
                <span className="small">3,471 ratings</span>
            </div>
        </div>
    )
}

export default Companies;