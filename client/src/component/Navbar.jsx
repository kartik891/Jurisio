import { useState } from "react";

function Navbar() {
    const [theme, setTheme] = useState('Dark');

    function handleChange() {
        const current = theme;
        current === 'Dark' ? setTheme('Light') : setTheme('Dark');
    }

    return (<>
            <img src="/legal-system.png" alt="logo" height="25px" width="25px"></img>
            <h4>Jurisio</h4>
            <button onClick={handleChange}>{theme}</button>
            </>);
}

export default Navbar