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

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await getUser(token);
                if (response.data.user.email) dispatch(setUser(response.data.user.user));
            }
        }
        fetchUser();
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="login" element={<Form type="sign-in"/>} />
                <Route path="register" element={<Form type="register"/>} />
                <Route exact path="/" element=
                {<>
                    <Header page="jobs"/>
                    <Search />
                    <Recent />
                    <Dashboard />
                    <Content />
                    <Shortcut /> 
                    <Footer />
                </>}
                />
                <Route path="profile" element=
                {<>
                    <Header page="profile"/>
                    <Outlet />
                    <Footer />
                </>}>
                    <Route path="" element={<Profile />} />
                    <Route path="onboarding" element={<Onboarding />}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App;
