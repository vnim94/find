import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../profile/user.slice';

function Header({ page }) {

    const navigate = useNavigate();
    const [selectedSite, setSelectedSite] = useState('jobs');
    const [selectedPage, setSelectedPage] = useState(page); 
    
    const user = useSelector(state => state.user.details);
    const [visible, setVisible] = useState(false);

    return (
        <header>
            <div className="flex flex-row justify-center bg-grey-1">
                <div className="py-1.5 w-940 flex flex-row justify-center">
                    <nav>
                        <ul className="flex flex-row space-x-10 text-sm">
                            <li className={`${selectedSite === 'jobs' && 'font-semibold'} hover:cursor-pointer`} onClick={() => { setSelectedSite('jobs'); navigate('/') }}>
                                <span>Jobs</span>
                            </li>
                            <li className={`${selectedSite === 'courses' && 'font-semibold'} hover:cursor-pointer`} onClick={() => { setSelectedSite('courses'); navigate('/courses') }}>
                                <span>Courses</span>
                            </li>
                            <li className={`${selectedSite === 'businesses' && 'font-semibold'} hover:cursor-pointer`} onClick={() => { setSelectedSite('businesses'); navigate('/businesses') }}>
                                <span>Businesses</span>
                            </li>
                            <li className={`${selectedSite === 'volunteering' && 'font-semibold'} hover:cursor-pointer`} onClick={() => { setSelectedSite('volunteering'); navigate('/volunteering') }}>
                                <span>Volunteering</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="min-w-[992px] flex flex-row justify-center items-center">
                <div className="px-5 flex flex-row items-center" onClick={() => navigate('/')}>
                    <img className="w-20 h-20" src="/magnifying-glass.png" alt="logo"></img>
                    <span className="font-bold text-3xl">find</span>
                </div>
                <div className="max-w-[992px] px-5 border-r-2 border-r-grey-2 flex flex-row flex-grow justify-between items-center">
                    <div>
                        <nav>
                            <ul className="flex flex-row items-center space-x-10 ">
                                <li className={`${selectedPage === 'jobs' ? 'font-semibold border-b-green-6' : 'border-b-transparent'} py-7 border-b-4  hover:cursor-pointer`} onClick={() => { setSelectedPage('jobs'); navigate('/') }}>
                                    <span>Job Search</span>
                                </li>
                                <li className={`${selectedPage === 'profile' ? 'font-semibold border-b-green-6' : 'border-b-transparent'} py-7 border-b-4 hover:cursor-pointer`} onClick={() => { setSelectedPage('profile'); navigate('/profile') }}>
                                    <span>Profile</span>
                                </li>
                                <li className={`${selectedPage === 'career' ? 'font-semibold border-b-green-6' : 'border-b-transparent'} py-7 border-b-4 hover:cursor-pointer`} onClick={() => { setSelectedPage('career'); navigate('/career-advice') }}>
                                    <span>Career Advice</span>
                                </li>
                                <li className={`${selectedPage === 'company' ? 'font-semibold border-b-green-6' : 'border-b-transparent'} py-7 border-b-4 hover:cursor-pointer`} onClick={() => { setSelectedPage('company'); navigate('/companies') }}>
                                    <span>Company Reviews</span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <nav>
                            {user ?
                                <div className="" onClick={() => setVisible(!visible)}>
                                    <span>{user.firstName ? user.firstName : user.email.split('@')[0] }</span>
                                    <span className={`${visible && 'expand'} material-icons-outlined`}>expand_more</span>
                                    {visible && <Profile />}
                                </div>
                            :
                                <div className="px-4 py-2 flex flex-row border-2 border-green-6 rounded-md hover:bg-green-1 hover:cursor-pointer">
                                    <a href="/login">Sign in</a>
                                </div>
                            }   
                        </nav>
                    </div>
                </div>
                <div className="px-5">
                    <a href="/">Employer site</a>
                </div>
            </div>
        </header>
    )
}

function Profile() {

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setUser(null));
        localStorage.removeItem('token');
    }

    return  (
        <div className="">
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