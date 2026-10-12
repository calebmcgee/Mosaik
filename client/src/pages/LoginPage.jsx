import './LoginPage.css'
import LoginForm from '../components/LoginForm'
import SignUpForm  from '../components/SignUpForm';
import { useState } from 'react';

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    function toggleForm(){
        setIsLogin(!isLogin);
    }
    return (
        <div className='page-container'>
            <div className='form-container'>
                {isLogin ? <LoginForm /> : <SignUpForm />}

                <span>
                    {isLogin ? "Dont have an account?" : "Already have an account?"}
                    <button onClick={toggleForm}>{isLogin ? "Sign Up" : "Login"}</button>
                </span>
            </div>
            <div>
                <h1>Mosaik</h1>
            </div>
        </div>
    )
}

export default LoginPage;