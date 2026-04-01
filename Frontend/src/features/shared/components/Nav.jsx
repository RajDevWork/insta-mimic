import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router'
const Nav = ({setIsDarkTheme,isDarkTheme}) => {
    const navigate = useNavigate()
  return (
    <nav className='navbar'>
        <div>

        <h3>InstaMimic</h3>
        </div>
        <div className='right-side'>
            <div className="theme-toggle-container">
            <button 
                className={`theme-toggle ${isDarkTheme ? 'dark' : 'light'}`}
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                title={isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
                {isDarkTheme ? '☀️' : '🌙'}
            </button>
            </div>
            <button className='button button-primary' onClick={()=>navigate("/create-post")}>Create Post</button>
        </div>
    </nav>
  )
}

export default Nav