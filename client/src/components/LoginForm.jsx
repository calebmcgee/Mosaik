import './LoginForm.css'

function LoginForm() {
    
    return (
        <form>
            <h2>Login</h2>

            <label for="email">Email
                <input type="email" name="email" id="email"/>
            </label>


            <label for="password">Password
                <input type="password" name="password" id="password"/>
            </label>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;