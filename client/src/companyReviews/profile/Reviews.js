function Reviews() {
    return (<>
        <div className="company-profile-section flex-col">
            <div>
                <span className="medium">Working at Expedia Group</span>
                <div className="flex flex-jc-sb">
                    <div>average rating</div>
                    <div>ratings overview</div>
                    <div>salary rating %</div>
                    <div>recommended %</div>
                </div>
                <div>
                    <span className="small">Your trust is our main concern so these ratings for Find are shared 'as is' from employees in line with our <a href="/">community guidelines</a></span>
                </div>
                <div>

                </div>
            </div>
            <hr></hr>
            <div className="flex flex-row flex-jc-c">
                <div className="company-ratings">
                    <Rating text="Work/Life balance" rating={3.2}/>
                    <Rating text="Career development" rating={3.2}/>
                    <Rating text="Benefits &amp; perks" rating={3.2}/>
                    <Rating text="Management" rating={3.2}/>
                    <Rating text="Working environment" rating={3.2}/>
                    <Rating text="Diversity &amp; equal opportunity" rating={3.2}/>
                </div>
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <div className="flex flex-jc-sb">
                <span>Showing <b>19</b> reviews sorted by <b>Most helpful</b></span>
                <div className="flex flex-row">
                    <span>Sort by <b>Most helpful</b></span>
                    <span className="material-icons-outlined">expand_more</span>
                </div>
            </div>
            <ReviewCard />
            <hr></hr>
            <ReviewCard />
            <hr></hr>
            <Paginator />
            <div className="disclaimer">
                <p className="small">
                    Company Reviews published on our site are the views and opinions of their authors and do not represent the views and opinions of Find.com.au or its personnel. 
                    Find.com.au does not verify the truth or accuracy of any reviews and does not adopt or endorse any of the comments posted. 
                    Find.com.au posts reviews for what they are worth and for informational purposes only to assist candidates to find employment.
                </p>
            </div>
        </div>
    </>)
}

function Rating(props) {

    const { text, rating } = props;

    return (
        <div className="company-rating flex flex-col">
            <span>{text}</span>
            <div className="flex flex-ai-c">
                <span className="bold">{rating}</span>
                {Array(5).fill().map((_, index) => { return <span key={index} className="medium material-icons-outlined">star</span> })}
            </div>
        </div>
    )
}

function ReviewCard(props) {
    return (
        <div className="review-card">
            <div className="review-card-details">
                <div className="flex flex-ai-c">
                    {Array(5).fill().map((_, index) => { return <span key={index} className="medium material-icons-outlined">star</span> })}
                    <span className="medium">5.0</span>
                    <span className="material-icons-outlined">expand_more</span>
                </div>
                <div className="flex flex-col">
                    <span>Expedia</span>
                    <span className="grey">Apr 2021</span>
                </div>
                <div className="flex flex-col">
                    <span className="small">New South Wales, Australia</span>
                    <span className="small">5 to 6 years in the role, current employee</span>
                </div>
            </div>
            <div className="review-card-content">
                <div>
                    <span className="medium">More a family than a job</span>
                </div>
                <div>
                    <b>The good things</b>
                    <p>It has been a tough year but the team is what makes the company great! The perks are awesome as well.</p>
                </div>
                <div>
                    <b>The challenges</b>
                    <p>Covid has been a massive challenge which has upended the company but we are coming out the other side now.</p>
                </div>
                <div className="flex flex-jc-sb flex-ai-c">
                    <button className="bg-pale-green green helpful-btn flex flex-ai-c">
                        <span className="small material-icons-outlined">thumb_up</span>
                        <span className="small">Helpful?</span>
                    </button>
                    <span className="flag material-icons-outlined">flag</span>
                </div>
            </div>
        </div>
    )
}

function Paginator(props) {

    const handleClick = (event) => {
    }

    const handleNext = () => {
    }

    return (
        <div className="paginator">
            {Array(5).fill().map((_,index) => {
                return <span key={index} className={`current-page paginator-item`} onClick={handleClick}>{index + 1}</span>
            })}
            <div className="paginator-next" onClick={handleNext}>
                <span>Next</span>
                <span className="material-icons-outlined">navigate_next</span>
            </div>
        </div>
    )
}

export default Reviews;