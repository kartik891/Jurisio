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
            </>);
}

export default Simplify