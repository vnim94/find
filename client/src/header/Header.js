import './Header.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../profile/user.slice';

function Header(props) {

    const navigate = useNavigate();
    const [selectedSite, setSelectedSite] = useState('jobs');
    const [selectedPage, setSelectedPage] = useState(props.page); 
    const [selectedRegion, setSelectedRegion] = useState('AU');

    const user = useSelector(state => state.user.details);
    const [visible, setVisible] = useState(false);

    return (
        <header>
            <div className="sites flex flex-jc-c">
                <div className="page flex flex-row flex-jc-c">
                    <nav className="site">
                        <ul className="site-links flex flex-row flex-ai-c flex-jc-se">
                            <ListItem id="jobs" type="site-link" text="Jobs" selected={selectedSite} setSelected={setSelectedSite}/>
                            <ListItem id="courses" type="site-link" text="Courses" selected={selectedSite} setSelected={setSelectedSite}/>
                            <ListItem id="businesses" type="site-link" text="Businesses for sale" selected={selectedSite} setSelected={setSelectedSite}/>
                            <ListItem id="volunteering" type="site-link" text="Volunteering" selected={selectedSite} setSelected={setSelectedSite}/>
                        </ul>
                    </nav>
                    <nav className="region">
                        <ul className="site-links flex flex-row">
                            <ListItem id="AU" type="site-link" text="AU" selected={selectedRegion} setSelected={setSelectedRegion}/>
                            <ListItem id="NZ" type="site-link" text="NZ" selected={selectedRegion} setSelected={setSelectedRegion}/>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="banner flex flex-jc-c">
                <div className="page flex flex-jc-sb flex-ai-c">
                    <div className="cursor logo flex flex-ai-c" onClick={() => navigate('/')}>
                        <img src="/magnifying-glass.png" alt="logo"></img>
                        <span className="logo-heading">find</span>
                    </div>
                    <nav className="flex flex-row">
                        <div className="banner-link">
                            {user ?
                                <div className="user flex flex-ai-c" onClick={() => setVisible(!visible)}>
                                    <span>{user.firstName ? user.firstName : user.email.split('@')[0] }</span>
                                    <span className={`${visible && 'expand'} material-icons-outlined`}>expand_more</span>
                                    {visible && <Profile />}
                                </div>
                            :
                                <>
                                    <a href="/login">Sign in</a>
                                    <span>or</span>
                                    <a href="/register">Register</a>
                                </>
                            }   
                        </div>
                        <div className="divider">|</div>
                        <div className="banner-link">
                            <a href="/">Employer site</a>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="pages flex flex-jc-c">
                <nav className="page">
                    <ul className="tabs flex flex-row flex-jc-sb">
                        <ListItem id="jobs" type="tab" text="Job Search" selected={selectedPage} setSelected={setSelectedPage}/>
                        <ListItem id="profile" type="tab" text="Profile" selected={selectedPage} setSelected={setSelectedPage}/>
                        <ListItem id="career-advice" type="tab" text="Career Advice" selected={selectedPage} setSelected={setSelectedPage}/>
                        <ListItem id="companies" type="tab" text="Company Reviews" selected={selectedPage} setSelected={setSelectedPage}/>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export function ListItem(props) {

    const navigate = useNavigate();
    const { id, type, text, selected, setSelected } = props;
    
    const handleClick = () => {
        setSelected(id);
        navigate(id === 'jobs' ? '/' : `/${id}`);
    }

    return (
        <li id={id} className={`${type} ${selected === id && 'selected'}`} onClick={handleClick}>
            {id === 'career-advice' && <img className="panda" src="/panda.png" alt="panda"></img>}
            <span>{text}</span>
        </li>
    )
}

function Profile() {

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setUser(null));
        localStorage.removeItem('token');
    }

    return  (
        <div className="profile-dropdown">
            <ul>
                <li>
                    <a href="/profile">
                        <span>Profile</span>
                        <span className="green material-icons-outlined">person_outline</span>
                    </a>
                </li>
                <li>
                    <span>Saved Searches</span>
                    <span className="green material-icons-outlined">favorite_border</span>
                </li>
                <li>
                    <span>Saved Jobs</span>
                    <span className="green material-icons-outlined">star_border</span>
                </li>
                <li>
                    <span>Applied Jobs</span>
                    <span className="green material-icons-outlined">check_circle</span>
                </li>
                <li>
                    <span>Recommended Jobs</span>
                    <span className="green material-icons-outlined">thumb_up</span>
                </li>
            </ul>
            <hr></hr>
            <ul>
                <li>
                    <span>Settings</span>
                </li>
                <li onClick={logout}>
                    <span>Sign out</span>
                </li>
            </ul>
        </div>
    )
}

export default Header;