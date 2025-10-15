import Redirect from "../component/redirect_button";
import Benefits from "../component/benefits";
import Risks from "../component/potential_risk";
import Assessment from "../component/risk_assessment";
import Footer from "../component/footer";
import Summarized from "../component/summary";

function Summary(){
    return (<>
                <Redirect path="/simplify" symbol="<-View Full Document"/>
                <br></br>
                <Summarized />
                <br />
                <Risks />
                <br />
                <Benefits />
                <br />
                <Assessment />
                <Footer />
            </>);
}

export default Summary