import './Form.css';
import { useState } from 'react';

function Form(props) {

    const { type } = props;
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState({ value: '', updated: false });
    const [password, setPassword] = useState({ value: '', updated: false });

    return (
        <div className="container">
            <header className="form-header">
                <a className="logo flex flex-ai-c" href="/">
                    <img src="/magnifying-glass.png" alt="logo"></img>
                    <span className="logo-heading">find</span>
                </a>
            </header>
            <div className="form-container">
                <div className="form">
                    <div className="bg-light-grey flex flex-jc-fe">
                        <a className="green" href="/">Are you an employer?</a>
                    </div>
                    <form>
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
                                    onChange={(e) => setEmail({ value: e.currentTarget.value, updated: true })} 
                                    required
                                />
                                <Error field={email}/>
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
                        {type === 'register' && <div>
                            <span>By registering you agree to Find's <a className="green" href="/">Privacy Statement</a></span>
                        </div>}
                        <div className="form-btn">
                            <button className="bg-black white btn">Sign in</button>
                        </div>
                        <div>
                            {type === 'sign-in' ? 
                                <span>Don't have an account? <a className="green" href="/">Register</a></span>
                            :
                                <span>Already have an account? <a className="green" href="/">Sign in</a></span>
                            }
                        </div>
                    </form>
                </div>
            </div>
            <footer className="form-footer">
                <div className="footer-links">
                    <a className="footer-link" href="/">Privacy</a>
                    <a className="footer-link" href="/">Terms &amp; Conditions</a>
                    <a className="footer-link" href="/">Protect yourself online</a>
                    <a className="footer-link" href="/">Contact</a>
                </div>
                <div>
                    <span>© Find. All rights reserved</span>
                </div>
            </footer>
        </div>
    )    
}

function Error(props) {
    return (
        props.field.updated && props.field.value.length === 0 &&
        <div className="error flex flex-row flex-ai-c">
            <span className="dark-green small material-icons-outlined">error_outline</span> 
            <span className="dark-green small">Required field</span>
        </div>
    )
}

export default Form;