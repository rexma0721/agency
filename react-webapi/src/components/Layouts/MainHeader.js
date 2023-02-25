import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { StyledButton } from 'src/shared/styled';

import { MainHeaderDiv, NavItem, NavList } from './styled/MainHeader.styled';

const MainHeader = () => {
    const navList = [
        {
            label : 'Logo',
            link : '/'
        },
        {
            label : 'Home',
            link : "/home"
        },
        {
            label : "Blog",
            link : "/blog"
        }
    ];

    const navigate = useNavigate() ;

    return (
        <MainHeaderDiv>
            <NavList>
                {navList.map((nav, index) => (
                    <NavItem key={index}>
                        {nav.label}
                    </NavItem>
                ))}
            </NavList>
            <StyledButton onClick={() => navigate('/auth/sign')}>User Login</StyledButton>
        </MainHeaderDiv>
    )
}

export default MainHeader ;