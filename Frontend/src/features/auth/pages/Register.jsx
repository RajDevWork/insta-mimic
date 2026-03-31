import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () => {

  const {loading,handleRegister} = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState();
  const [password,setPassword] = useState()
  const navigate = useNavigate()


  const handleSubmit = async (e)=>{
    e.preventDefault();
    await handleRegister(username,email,password)
    console.log("Registed")
    navigate("/");

  }
  if(loading){
    return <main><h1>Loading...</h1></main>
  }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" id="username" placeholder='Enter username'
                onChange={(e)=>{setUsername(e.target.value)}}
                />
                <input type="email" name="email" id="email" placeholder='Enter email' 
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <input type="password" name="password" id="password" placeholder='Enter password'
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button className='button button-primary'>Register</button>
            </form>
            <p>Already have an account ? <Link to={"/login"}>Login to account</Link></p>
        </div>
    </main>
  )
}

export default Register