import styled from "styled-components"
import logo from "../../assets/images/logoDark.png"
import Button from "../buttons/Button"
import ImageLogo from "../image/ImageLogo"

const StyledNavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    padding: 1rem;
    background-color: var(--background-color);
    z-index: 1;
    box-shadow: rgba(4, 4, 6, 0.1) 0px 1px 0px;
`

export function Navbar(){
    return (
        <div>
            <StyledNavBar>
                <ImageLogo
                    src={logo}
                    alt="SenseiHub"
                    width="8rem"
                    height="3.5rem"
                    radius="8px"
                />
                <Button icon="box-arrow-right" label="Login professor" fontSize={"0.8rem"}/>
            </StyledNavBar>
        </div>
    )
}
