import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="header-container">
        <h1 className='website-logo'><Link to ="/" className='nav-link'>Weather DashBoard</Link></h1> 
        <ul className='link-container'>
            <li><Link to = "/" className = "nav-link">Home</Link></li>
            <li><Link to = "/map" className = "nav-link">Map</Link></li>
        </ul>
    </nav>
  )
}

export default Header

