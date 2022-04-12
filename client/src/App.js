import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './profile/user.slice';
import { getUser } from './profile/user.api';

import Header from './header/Header';
import Search from './jobSearch/search/Search';
import Recent from './jobSearch/recent/Recent';
import Dashboard from './jobSearch/dashboard/Dashboard';
import Content from './jobSearch/content/Content';
import Shortcut from './jobSearch/shortcut/Shortcut';
import Footer from './footer/Footer';
import Form from './profile/Form';
import Onboarding from './profile/Onboarding';
import Profile from './profile/Profile';
import Directory, { BrowseDirectory } from './companyReviews/directory/Directory';
import Background from './companyReviews/background/Background';
import Companies from './companyReviews/companies/Companies';
import CompanyContent from './companyReviews/content/Content';
import CompanyShortcut from './companyReviews/shortcut/Shortcut';
import { Disclaimer } from './companyReviews/content/Content';
import Jobs from './jobSearch/jobs/Jobs';

function App() {

    const dispatch = useDispatch();
    const jobs =
    <>
        <Header page="jobs"/>
        <Search expanded={true}/>
        <Jobs />
        <Footer />
    </>
    const landing = 
    <>
        <Header page="jobs"/>
        <Search />
        <Recent />
        <Dashboard />
        <Content />
        <Shortcut /> 
        <Footer />
    </>
    const profile = 
    <>
        <Header page="profile"/>
        <Outlet />
        <Footer />
    </>
    const companies = 
    <>
        <Header page="companies"/>
        <Outlet />
        <Footer />
    </>

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await getUser(token);
                if (response.data.user.email) dispatch(setUser(response.data.user));
            }
        }
        fetchUser();
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="login" element={<Form type="sign-in"/>} />
                <Route path="register" element={<Form type="register"/>} />
                <Route exact path="/" element={landing}/>
                <Route path="profile" element={profile}>
                    <Route path="" element={<Profile />} />
                    <Route path="onboarding" element={<Onboarding />}/>
                </Route>
                <Route path="companies" element={companies}>
                    <Route path="" element={<>
                        <Directory />
                        <Background />
                        <Companies />
                        <CompanyContent />
                        <CompanyShortcut />
                    </>} />
                    <Route path="browse-reviews" element={<>
                        <Directory search={true} />
                        <Background heading="Popular employers" subHeading="Learn what others are saying about the most popular companies in Australia"/>
                        <Companies reviews={true} />
                        <Disclaimer />
                    </>} />
                    <Route path="browse" element={<>
                        <Directory search={true} bold={true}/>
                        <Background heading="Company Directory Listing" />
                        <BrowseDirectory />
                    </>}/>
                </Route>
                <Route path="/*" element={jobs}/>
            </Routes>
        </Router>
    )
}

export default App;
