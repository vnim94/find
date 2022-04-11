import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './profile/user.slice';
import { getUser } from './profile/user.api';

import Header from './header/Header';
import Search from './jobs/search/Search';
import Recent from './jobs/recent/Recent';
import Dashboard from './jobs/dashboard/Dashboard';
import Content from './jobs/content/Content';
import Shortcut from './jobs/shortcut/Shortcut';
import Footer from './footer/Footer';
import Form from './profile/Form';
import Onboarding from './profile/Onboarding';
import Profile from './profile/Profile';
import Directory from './company/directory/Directory';
import Background from './company/background/Background';
import CompanySearch from './company/search/CompanySearch';
import Companies from './company/companies/Companies';

function App() {

    const dispatch = useDispatch();
    const jobs = 
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
                <Route exact path="/" element={jobs}/>
                <Route path="profile" element={profile}>
                    <Route path="" element={<Profile />} />
                    <Route path="onboarding" element={<Onboarding />}/>
                </Route>
                <Route path="companies" element={companies}>
                    <Route path="" element={<>
                        <Directory />
                        <Background />
                        <Companies />
                    </>} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;
