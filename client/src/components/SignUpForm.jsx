import './SignUpForm.css'

function SignUpForm() {
    return (
        <form>
            <h2>Sign Up</h2>

            <label for="name">Name
            <input type="text" name="name" id="name"/>
            </label>

            <label for="email">Email
            <input type="email" name="email" id="email"/>
            </label>

            <label for="password">Password
            <input type="password" name="password" id="password"/>
            </label>
            
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignUpForm;