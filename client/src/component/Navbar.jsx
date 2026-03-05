import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import './ui/navbar.css';

function Navbar() {
    const [theme, setTheme] = useState('Dark');
    const [icon, setIcon] = useState(<Moon size={16}/>);

    function handleChange() {
        const current = theme;
        current === 'Dark' ? setTheme('Light')  : setTheme('Dark');
        current === 'Dark' ? setIcon(<Sun size={16}/>)  : setIcon(<Moon size={16}/>);
    }

    return (<>
        <div id="navbar-div">
            <img src="/copy.png" alt="logo" height="3px" width="40px" id="navbar-img"></img>
            <h4 id="heading4">Jurisio</h4>
            <button onClick={handleChange} id="theme-button">{icon}</button>
        </div></>);
}

export default Navbar