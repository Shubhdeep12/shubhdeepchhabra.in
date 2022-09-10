import { FC } from "../../../src/types/FC";

import { styled } from "../../../stiches.config";
import Icon from "../Icon";

const Navbar: FC = () => {
    return (
        <NavbarContainer>
            <Nav>
            <Name>Shubhdeep Chhabra</Name>
            <ul>
                <li>Home</li>
                <li>Blogs</li>
            </ul>
            <Icon name="themeToggle"/>
            </Nav>
        </NavbarContainer>
    );   
}

export default Navbar;

const NavbarContainer = styled('div', {
    display: 'fixed',
    paddingTop: '15px',
    height: '72px',
})

const Nav = styled('nav', {
    display: 'flex',
    height: '$$navbarHeight',
})

const Name = styled('span', {
})
