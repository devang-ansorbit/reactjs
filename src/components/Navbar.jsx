import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-evenly',alignItems:'center', height:'5vh', border: '1px solid '}}>
        <Link to=''><div>HomePage</div></Link>
        <Link to='/users'>Users</Link>
    </div>
    )
}

export default Navbar
