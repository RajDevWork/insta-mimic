import React, { useState } from 'react'
import '../styles/form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const {user,loading,handleLogin} = useAuth()
    const [usename, setUsename] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


  const handleSubmit = async(e)=>{
    e.preventDefault();
    await handleLogin(usename,password)
    console.log("User loggedin")
    navigate("/")
  }

  return (
    <main>
        <div className="form-container">
            {
                loading ? <h1>Loading...</h1>:''
            }


            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                 name="username"
                 placeholder='Enter username'
                 value={usename}
                 onChange={(e)=>setUsename(e.target.value)}
                 />
                <input type="password" 
                name="password" 
                placeholder='Enter password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className='button button-primary'>Login</button>
            </form>
            <p>Don't have an account ? <Link to={"/register"}>Create One</Link></p>
        </div>
    </main>
  )
}

export default Login