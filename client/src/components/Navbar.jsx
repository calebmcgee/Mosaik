import './Navbar.css'
import { useState } from 'react';
function Navbar() {
    const [isActive, setIsActive] = useState(1);

    return (
        <nav className="navbar">
            <ul>
                <li><a href="#" onClick={()=> setIsActive(1)} className={isActive == 1 ? 'active-navbar-link' : null}>Home</a></li>
                <li><a href="#" onClick={()=> setIsActive(2)} className={isActive == 2 ? 'active-navbar-link' : null}>Users</a></li>
                <li><a href="#" onClick={()=> setIsActive(3)} className={isActive == 3 ? 'active-navbar-link' : null}>Profile</a></li>
                <li><a href="#" onClick={()=> setIsActive(4)} className={isActive == 4 ? 'active-navbar-link' : null}>Create</a></li>
                <li><a href="#" onClick={()=> setIsActive(5)} className={isActive == 5 ? 'active-navbar-link' : null}>Settings</a></li>
            </ul> 
        </nav>
    )
}

export default Navbar;
