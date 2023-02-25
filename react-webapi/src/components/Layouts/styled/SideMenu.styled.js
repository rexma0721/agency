import tagStyled from 'styled-components' ;

import { List, styled } from '@mui/material';

export const ExpandLogoDiv = tagStyled.div`
    margin-top : 30px;
    margin-bottom : 40px;
    display : flex;
    align-items : center;
`
export const ExpandLogo = tagStyled.div`
    border-radius : 50% ;
    width : 60px;
    height : 60px;
    display: flex ; 
    align-items : center;
    justify-content : center;
    cursor : pointer ;
`
export const Logo = tagStyled.img`
    width : 60px;
    height : 60px;
    border-radius : 5px;
`

export const LogoLabel = tagStyled.p`
    padding-left : 10px;
    font-size : 25px;
    color : white ;
`
export const LessLogoDiv = tagStyled.div`
    margin-top : 30px;
    margin-bottom : 40px;
    display : flex;
    align-items : center;
`

export const LessLogo = tagStyled.div`
    "& img" : {
    }

    border-radius : 10px ;
    width : 40px;
    height : 40px;
    display: flex ; 
    align-items : center;
    justify-content : center;
    cursor : pointer ;
`

export const MenuList = styled(List)`
    & .MuiListItemButton-root {
        margin : 5px;
        border-radius : 10px !important;
        &:hover {
            background-color : #313131;
        }
    }
`