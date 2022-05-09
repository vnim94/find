import './Review.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCompanyReviews } from '../company.api';

function Reviews() {

    const company = useSelector(state => state.company.details);
    const reviewsSummary = useSelector(state => state.company.reviewsSummary);
    const { benefits, career, balance, environment, management, diversity } = reviewsSummary.ratings
    const [reviews, setReviews] = useState();

    useEffect(() => {
        async function fetchCompanyReviews(id) {
            const response = await getCompanyReviews(id);
            if (response.data.reviews) setReviews(response.data.reviews);
        }
        fetchCompanyReviews(company.id)
    },[company])

    return (<>
        <div className="company-profile-section flex-col">
            <div>
                <span className="medium">Working at {company.name}</span>
                <RatingsDashboard summary={reviewsSummary}/>
                <div className="flex flex-jc-c">
                    <span className="small">Your trust is our main concern so these ratings for Find are shared 'as is' from employees in line with our <a className="green" href="/">community guidelines</a></span>
                </div>
                <div>
                </div>
            </div>
            <hr></hr>
            <div className="flex flex-row flex-jc-c">
                <div className="company-ratings">
                    <Rating text="Work/Life balance" rating={balance}/>
                    <Rating text="Career development" rating={career}/>
                    <Rating text="Benefits &amp; perks" rating={benefits}/>
                    <Rating text="Management" rating={management}/>
                    <Rating text="Working environment" rating={environment}/>
                    <Rating text="Diversity &amp; equal opportunity" rating={diversity}/>
                </div>
            </div>
        </div>
        <div className="company-profile-section flex-col">
            <div className="flex flex-jc-sb">
                <span>Showing <b>{reviewsSummary.totalCount}</b> reviews sorted by <b>Most helpful</b></span>
                <div className="flex flex-row">
                    <span>Sort by <b>Most helpful</b></span>
                    <span className="material-icons-outlined">expand_more</span>
                </div>
            </div>
            {reviews && reviews.map((review, index) => <>
                <ReviewCard key={index} review={review} />
                <hr></hr>
            </>)}
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

function Rating({ text, rating }) {
    return (
        <div className="company-rating flex flex-col">
            <span>{text}</span>
            <div className="flex flex-ai-c">
                <span className="bold">{rating}</span>
                <RatingStars rating={rating} />
            </div>
        </div>
    )
}

function ReviewCard({ review }) {

    const { date, title, ratings, good, bad, role, helpful, flagged } = review;
    const reviewDate = new Date(date).toDateString().split(' ')

    return (
        <div className="review-card">
            <div className="review-card-details">
                <div className="flex flex-ai-c">
                    <RatingStars rating={ratings.average} />
                    <span className="medium">{ratings.average}</span>
                    <span className="material-icons-outlined">expand_more</span>
                </div>
                <div className="flex flex-col">
                    <span>{role}</span>
                    <span className="grey">{`${reviewDate[1]} ${reviewDate[3]}`}</span>
                </div>
                <div className="flex flex-col">
                    <span className="small">New South Wales, Australia</span>
                    <span className="small">5 to 6 years in the role, current employee</span>
                </div>
            </div>
            <div className="review-card-content">
                <div>
                    <span className="medium">{title}</span>
                </div>
                <div>
                    <b>The good things</b>
                    <p>{good}</p>
                </div>
                <div>
                    <b>The challenges</b>
                    <p>{bad}</p>
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

export function RatingsDashboard({ summary }) {
    
    const { ratings, totalCount, ratingsCount, salary, recommend } = summary;
    const { one, two, three, four, five } = ratingsCount;
    const mostFrequentRating = Math.max(...Object.values(ratingsCount));

    return (
        <div className="flex flex-jc-sa">
            <div className="rating-card">
                <span className="large">{ratings.average}</span>
                <RatingStars rating={ratings.average}/>
                <span><b>{totalCount}</b> ratings in total</span>
            </div>
            <div className="rating-card">
                <RatingBar type="5" count={five} percent={five/mostFrequentRating}/>
                <RatingBar type="4" count={four} percent={four/mostFrequentRating}/>
                <RatingBar type="3" count={three} percent={three/mostFrequentRating}/>
                <RatingBar type="2" count={two} percent={two/mostFrequentRating}/>
                <RatingBar type="1" count={one} percent={one/mostFrequentRating}/>
            </div>
            <div className="rating-card">
                <RatingCircle percent={salary}>
                    <div className="dollar-overlay">
                        <span className="material-icons-outlined">attach_money</span>
                    </div>
                </RatingCircle>
                <div>
                    <span className="small"><b>{salary}%</b> rate salary as high or average</span>
                </div>
            </div>
            <div className="rating-card">
                <RatingCircle percent={recommend}/>
                <div>
                    <span className="small"><b>{recommend}%</b> employees recommend this employer to friends</span>
                </div>
            </div>
        </div>
    )
}

function RatingBar({ type, percent, count }) {
    
    return (
        <div className="rating-bar flex flex-row flex-ai-c flex-jc-sb">
            <span>{type}</span>
            <div className="rating-bar-container">
                <div className="rating-bar-fill" style={{width: `${percent * 100}%`}}></div>
            </div>
            <span className="small">{count}</span>
        </div>
    )
}

function RatingCircle({ percent, children }) {
    return (<div className="relative">
        <div className="rating-circle" style={{background: `conic-gradient(var(--dark-green) ${percent * 360}deg, var(--light-grey) 0deg)`}}>
            <div className="rating-circle-overlay">
                <span className="large">{Math.round(percent * 100 * 100) / 100}%</span>
            </div>
            {children}
        </div>
    </div>)
}

export function RatingStars({ rating }) {
    return (
        <div>
            {Array(Math.floor(rating)).fill().map((_, index) => { return <span key={index} className="light-green medium material-icons-outlined">star</span> })}
            {Array(Math.ceil(rating - Math.floor(rating))).fill().map((_, index) => { return <span key={index} className="light-green medium material-icons-outlined">star_half</span> })}
            {Array(5 - Math.ceil(rating)).fill().map((_, index) => { return <span key={index} className="light-green medium material-icons-outlined">star_outline</span> })}
        </div>
    )
}

export default Reviews;