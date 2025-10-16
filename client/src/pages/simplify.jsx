<<<<<<< HEAD
function Simplify(){

    return (<>
            <h2>This is Simplification Page</h2>
=======
import Redirect from "../component/redirect_button";
import OgDocument from "../component/original_document";
import SimplifiedDocument from "../component/simplified_document";
import Button from "../component/button";
import Footer from "../component/footer";

function Simplify(){

    return (<>
            <Redirect path="/" symbol="<- Back"/>
            <Button name="Copy"/>
            <Button name="Download"/>
            <Redirect path="/summary" symbol="-> Summary"/>
            <br></br>
            <OgDocument />
            <br></br>
            <SimplifiedDocument/>
            <Footer/>
>>>>>>> 574a468b6829ea08bc1280dc904ef7240e344ec0
            </>);
}

export default Simplify