import { useNavigate } from "react-router-dom";

function Redirect({path = '/', symbol = '<- Back'}){

    const navigate = useNavigate();

    function revertBack(){
        navigate(path);
    }

    return (<>
                <button onClick={revertBack}>{symbol}</button>
            </>);
}

export default Redirect