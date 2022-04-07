import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './header/Header';
import Search from './jobs/search/Search';
import Recent from './jobs/recent/Recent';
import Dashboard from './jobs/dashboard/Dashboard';
import Content from './jobs/content/Content';
import Shortcut from './jobs/shortcut/Shortcut';
import Footer from './footer/Footer';
import Form from './profile/Form';
import Onboarding from './profile/Onboarding';

function App() {

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
                </>}>
                    <Route path="onboarding" element={<Onboarding />}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App;
