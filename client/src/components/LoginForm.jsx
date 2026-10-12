import './LoginForm.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = response.json();

            if (!response.ok) {
                setError(data.msg || 'Login failed') ;
                return;
            }
            navigate('/home');

        } catch(err) {
            setError('Error, try again.')
        }



    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <label htmlFor="email">Email
                <input onChange={(event) => setEmail((event.target.value))} type="email" name="email" id="email"/>
            </label>

            <label htmlFor="password">Password
                <input onChange={(event) => setPassword((event.target.value))} type="password" name="password" id="password"/>
            </label>
            
            {error && <p className="login-error-message">{error}</p>}

            <button type="submit">Login</button>
        </form>


    )
}

export default LoginForm;