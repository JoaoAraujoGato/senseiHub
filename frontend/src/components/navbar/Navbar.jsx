import styled from "styled-components"
import { BiLogOut } from 'react-icons/bi'
import logo from "@/assets/images/logoDark.png"
import { Button } from "@/components/ui/Button"
import ImageLogo from "@/components/image/ImageLogo"

const StyledNavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    padding: 1rem;
    background-color: var(--background-color);
    z-index: 1;
    background-color: #000;
    border-bottom: 1px solid #252525;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 0px;
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
                <Button icon={<BiLogOut />} size="sm">Login professor</Button>
            </StyledNavBar>
        </div>
    )
}
