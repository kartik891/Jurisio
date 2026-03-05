import { useNavigate } from "react-router-dom";
import './ui/redirect.css';

function Redirect({path = '/', symbol = '<- Back', text = 'Back'}){

    const navigate = useNavigate();

    function revertBack(){
        navigate(path);
    }

    return (<>
                <button onClick={revertBack} id="universal-button">{text}&nbsp;{symbol}</button>
            </>);
}

export default Redirect