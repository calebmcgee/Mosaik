import './Navbar.css'
import { useState } from 'react';
function Navbar() {
    const [active, setActive] = useState(1);

    return (
        <nav className="navbar">
            <ul>
                <li><a href="#" onClick={()=> setActive(1)} className={active == 1 ? 'active-navbar-link' : null}>Home</a></li>
                <li><a href="#" onClick={()=> setActive(2)} className={active == 2 ? 'active-navbar-link' : null}>Users</a></li>
                <li><a href="#" onClick={()=> setActive(3)} className={active == 3 ? 'active-navbar-link' : null}>Profile</a></li>
                <li><a href="#" onClick={()=> setActive(4)} className={active == 4 ? 'active-navbar-link' : null}>Create</a></li>
                <li><a href="#" onClick={()=> setActive(5)} className={active == 5 ? 'active-navbar-link' : null}>Settings</a></li>
            </ul> 
        </nav>
    )
}

export default Navbar;
