import React from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'

const Login = () => {
  const handleSubmit =(e)=>{
    e.preventDefault();
  }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder='Enter username' />
                <input type="password" name="password" placeholder='Enter password' />
                <button className='button button-primary'>Login</button>
            </form>
            <p>Don't have an account ? <Link to={"/register"}>Create One</Link></p>
        </div>
    </main>
  )
}

export default Login