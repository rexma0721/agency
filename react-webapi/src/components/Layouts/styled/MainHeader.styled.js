import tagStyled from 'styled-components';

import { styled } from '@mui/material';

import { Link } from 'react-router-dom';

export const MainHeaderDiv = tagStyled.div`
    padding-left : 30px;
    padding-right : 30px;
    display : flex;
    justify-content : space-between;
    align-items : center;

    height : 70px;

    box-sizing: border-box;
    width : 100vw;
`

export const NavList = tagStyled.div`
    display : flex;
    gap : 30px;
`

export const NavItem = styled(Link)`
    color : white;
    text-decoration : none;
    cursor : pointer;
`