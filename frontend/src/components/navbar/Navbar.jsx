import logo from "../../public/images/logoDark.png"
import Button from "../buttons/Button"

export function Navbar(){
    return (
        <div className="d-flex justify-content-between flex-row">
            <img src={logo} alt="SenseiHub" className="w-25"/>
            <Button icon="box-arrow-right" label="Login professor" outline={true}/>
        </div>
    )
}