import './Review.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCompanyReviews } from '../company.api';
import { formatNumber, formatPercent } from '../../helpers'; 
import { Loading } from '../../jobSearch/jobs/Jobs';

function Reviews() {

    const company = useSelector(state => state.company.details);
    const reviewsSummary = useSelector(state => state.company.reviewsSummary);
    const { benefits, career, balance, environment, management, diversity } = reviewsSummary.ratings
    const [reviews, setReviews] = useState();
    const [totalReviews, setTotalReviews] = useState();
    const [page, setPage] = useState(1);
    const [displaySortOptions, setDisplaySortOptions] = useState(false);

    useEffect(() => {
        async function fetchCompanyReviews(id, page) {
            const response = await getCompanyReviews(id, page);
            if (response.data) {
                setReviews(response.data.companyReviews.reviews);
                setTotalReviews(response.data.companyReviews.totalReviews);
            }
        }
        fetchCompanyReviews(company.id, page)
    },[company, page])

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
                <div className="cursor relative flex flex-row" onClick={() => setDisplaySortOptions(!displaySortOptions)}>
                    <span>Sort by <b>Most helpful</b></span>
                    <span className={`${displaySortOptions && 'expand'} material-icons-outlined`}>expand_more</span>
                    {displaySortOptions && <div className="sort-options">
                    <ul>
                        <li>Most helpful</li>
                        <li>Most recent</li>
                    </ul>    
                </div>}
                </div>
            </div>
            {reviews ? reviews.map((review, index) => <>
                <ReviewCard key={index} review={review} />
                <hr></hr>
            </>) : <Loading />}
            {totalReviews && <Paginator page={page} totalPages={Math.ceil(totalReviews / 10)} setPage={setPage}/>}
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

function Rating({ text, hide, rating }) {
    return (
        <div className="company-rating flex flex-col">
            <span className={hide && 'small'}>{text}</span>
            <div className="flex">
                {!hide && <span className="bold">{formatNumber(rating)}</span>}
                <RatingStars rating={rating} />
            </div>
        </div>
    )
}

function ReviewCard({ review }) {

    const { date, title, ratings, good, bad, role, helpful } = review;
    const reviewDate = new Date(date).toDateString().split(' ')
    const [showRatingDropdown, setShowRatingDropdown] = useState(false);

    return (
        <div className="review-card">
            <div className="review-card-details">
                <div className="cursor relative flex flex-ai-c" onMouseOver={() => setShowRatingDropdown(true)} onMouseLeave={() => setShowRatingDropdown(false)}>
                    <RatingStars rating={ratings.average} />
                    <span className="medium">{formatNumber(ratings.average)}</span>
                    <span className="material-icons-outlined">expand_more</span>
                    {showRatingDropdown && <RatingDropdown ratings={ratings}/>}
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
                    <div className="flex flex-ai-c">
                        <button className="bg-pale-green green helpful-btn flex flex-ai-c">
                            <span className="small material-icons-outlined">thumb_up</span>
                            <span className="small">Helpful?</span>
                        </button>
                        {helpful > 0 && <span className="small">{helpful} people found this helpful</span>}
                    </div>
                    <span className="flag material-icons-outlined">flag</span>
                </div>
            </div>
        </div>
    )
}

function RatingDropdown({ ratings }) {

    const { benefits, career, balance, environment, management, diversity } = ratings

    return (
        <div className="rating-dropdown">
            <Rating text="Benefits &amp; perks" hide={true} rating={benefits}/>
            <Rating text="Career development" hide={true} rating={career}/>
            <Rating text="Work/Life balance" hide={true} rating={balance}/>
            <Rating text="Working environment" hide={true} rating={environment}/>
            <Rating text="Management" hide={true} rating={management}/>
            <Rating text="Diversity &amp; equal opportunity" hide={true} rating={diversity}/>
        </div>
    )
}

function Paginator({ page, setPage, totalPages }) {
    return (
        <div className="paginator">
            {Array(totalPages).fill().map((_,index) => {
                return <span key={index} className={`${page === index + 1 && 'current-page'} paginator-item`} onClick={() => setPage(index + 1)}>{index + 1}</span>
            })}
            <div className="paginator-next" onClick={() => { page < totalPages && setPage(page + 1) }}>
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
                <span className="large">{formatNumber(ratings.average)}</span>
                <RatingStars rating={ratings.average}/>
                <span><b>{totalCount}</b> ratings in total</span>
            </div>
            <div className="rating-card">
                <RatingBar type="5" count={five} percent={formatPercent(five/mostFrequentRating)}/>
                <RatingBar type="4" count={four} percent={formatPercent(four/mostFrequentRating)}/>
                <RatingBar type="3" count={three} percent={formatPercent(three/mostFrequentRating)}/>
                <RatingBar type="2" count={two} percent={formatPercent(two/mostFrequentRating)}/>
                <RatingBar type="1" count={one} percent={formatPercent(one/mostFrequentRating)}/>
            </div>
            <div className="rating-card">
                <RatingCircle percent={formatPercent(salary)}>
                    <div className="dollar-overlay">
                        <span className="material-icons-outlined">attach_money</span>
                    </div>
                </RatingCircle>
                <div>
                    <span className="small"><b>{formatPercent(salary)}%</b> rate salary as high or average</span>
                </div>
            </div>
            <div className="rating-card">
                <RatingCircle percent={formatPercent(recommend)}/>
                <div>
                    <span className="small"><b>{formatPercent(recommend)}%</b> employees recommend this employer to friends</span>
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
                <div className="rating-bar-fill" style={{width: `${percent}%`}}></div>
            </div>
            <span className="small">{count}</span>
        </div>
    )
}

function RatingCircle({ percent, children }) {
    return (<div className="relative">
        <div className="rating-circle" style={{background: `conic-gradient(var(--dark-green) ${percent / 100 * 360}deg, var(--light-grey) 0deg)`}}>
            <div className="rating-circle-overlay">
                <span className="large">{percent}%</span>
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