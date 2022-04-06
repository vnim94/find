import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './header/Header';
import Search from './jobs/search/Search';
import Recent from './jobs/recent/Recent';
import Dashboard from './jobs/dashboard/Dashboard';
import Content from './jobs/content/Content';
import Shortcut from './jobs/shortcut/Shortcut';
import Footer from './footer/Footer';
import Form from './profile/Form';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Form type="sign-in"/>} />
                <Route path="/register" element={<Form type="register"/>} />
                <Route path="/" element=
                {<>
                    <Header />
                    <Search />
                    <Recent />
                    <Dashboard />
                    <Content />
                    <Shortcut /> 
                    <Footer />
                </>}
                />
            </Routes>
        </Router>
    )
}

export default App;
