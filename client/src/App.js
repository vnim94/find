import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Search from './search/Search';
import Recent from './recent/Recent';
import Dashboard from './dashboard/Dashboard';
import Content from './content/Content';
import Shortcut from './shortcut/Shortcut';
import Footer from './footer/Footer';
import Form from './profile/Form';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Form type="sign-in"/>} />
                <Route path="/register" element={<Form type="register"/>} />
                <Route path="/" element=
                {
                    <>
                    <Header />
                    <Search />
                    <Recent />
                    <Dashboard />
                    <Content />
                    <Shortcut /> 
                    <Footer />
                    </>
                }
                />
            </Routes>
        </Router>
    )
}

export default App;
