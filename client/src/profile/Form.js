import './Form.css';
import { useState } from 'react';
import { login, register, checkEmail } from './user.api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './user.slice';

function Form(props) {

    const { type } = props;
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState({ value: '', updated: false });
    const [password, setPassword] = useState({ value: '', updated: false });
    const [error, setError] = useState();
    const [emailTaken, setEmailTaken] = useState(false);
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (type === 'sign-in') {
            const response = await login(email.value, password.value);
            if (response.data.login.message) {
                setError(response.data.login.message);
            } else {
                dispatch(setUser(response.data.login.user));
                localStorage.setItem('token', response.data.login.token);
                navigate('/', { replace: true });
            }
        }

        if (type === 'register') {
            const response = await register(email.value, password.value);
            if (response.data.register.message) {
                setError(response.data.register.message);
            } else {
                dispatch(setUser(response.data.register.user));
                localStorage.setItem('token', response.data.register.token);
                navigate('/profile/onboarding');
            }
        }
    }

    const handleChange = async (event) => {
        setEmail({ value: event.currentTarget.value, updated: true });
        if (event.currentTarget.value.match(emailPattern)) {
            const response = await checkEmail(event.currentTarget.value);
            response.data.user.id ? setEmailTaken(true) : setEmailTaken(false);
        } else {
            setEmailTaken(false);
        }
    }

    return (
        <div className="container">
            <Header />
            <div className="form-container">
                <div className="form">
                    <div className="bg-light-black flex flex-jc-fe">
                        <a className="light-green" href="/">Are you an employer?</a>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h1>{type === 'sign-in' ? 'Sign in' : 'Register'}</h1>
                            <div className="form-group flex flex-col">
                                <label>Email address</label>
                                {type === 'register' && <span className="light-black">Please check your email address is correct. Employers will use it to contact you.</span>}
                                <input 
                                    className={`${email.updated && email.value.length === 0 && 'invalid'} form-control`} 
                                    type="text" value={email.value} 
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    title="Must be a valid email address"
                                    onChange={type === 'register' ? handleChange : (e) => setEmail({ value: e.currentTarget.value, updated: true})} 
                                    required
                                />
                                <Error field={email}/>
                                {type === 'register' && email.value.match(emailPattern) ? 
                                    emailTaken ?
                                        <div className="error flex flex-row flex-ai-c">
                                            <span className="red medium material-icons-outlined">highlight_off</span>
                                            <span className="red small">Email address already taken. Please use a different email address.</span>
                                        </div>
                                    :
                                        <div className="error flex flex-row flex-ai-c">
                                            <span className="green medium material-icons-outlined">check_circle</span>
                                            <span className="green small">Email address available.</span>
                                        </div>
                                : undefined
                                }
                            </div>
                            <div className="form-group">
                                <div className="flex flex-jc-sb">
                                    <label>Password</label>
                                    <a className="green" href="/">Forgot password?</a>
                                </div>
                                <input 
                                    className={`${password.updated && password.value.length === 0 && 'invalid'} form-control`} 
                                    type={visible ? 'text' : 'password'} 
                                    value={password.value}
                                    onChange={(e) => setPassword({ value: e.currentTarget.value, updated: true })} 
                                    required/>
                                <span className="toggle-visibility material-icons-outlined" onClick={() => setVisible(!visible)}>{visible ? 'visibility_off' : 'visibility'}</span> 
                                <Error field={password}/>
                            </div>
                        </div>
                        {error && <div>
                            <span className="red small">{error}. Please try again</span>
                        </div>}
                        {type === 'register' && <div>
                            <span>By registering you agree to Find's <a className="green" href="/">Privacy Statement</a></span>
                        </div>}
                        <div className="form-btn">
                            <button className="bg-black white btn" type="submit">{type === 'sign-in' ? 'Sign in' : 'Register'}</button>
                        </div>
                        <div>
                            {type === 'sign-in' ? 
                                <span>Don't have an account? <a className="green" href="/register">Register</a></span>
                            :
                                <span>Already have an account? <a className="green" href="/login">Sign in</a></span>
                            }
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )    
}

function Header() {
    return (
        <header className="form-header">
            <a className="logo flex flex-ai-c" href="/">
                <img src="/magnifying-glass.png" alt="logo"></img>
                <span className="logo-heading">find</span>
            </a>
        </header>
    )
}

function Footer() {
    return (
        <footer className="form-footer">
            <div className="footer-links">
                <a className="footer-link" href="/">Privacy</a>
                <a className="footer-link" href="/">Terms &amp; Conditions</a>
                <a className="footer-link" href="/">Protect yourself online</a>
                <a className="footer-link" href="/">Contact</a>
            </div>
            <div>
                <span>?? Find. All rights reserved</span>
            </div>
        </footer>
    )
}

export function Error(props) {
    return (
        props.field.updated && props.field.value.length === 0 &&
        <div className="error flex flex-row flex-ai-c">
            <span className="dark-green small material-icons-outlined">error_outline</span> 
            <span className="dark-green small">Required field</span>
        </div>
    )
}

export default Form;