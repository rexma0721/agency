import tagStyled from 'styled-components';

export const AuthContainer = tagStyled.div`
    width : 100%;
    height : 100vh;

    box-sizing : border-box;

    display : flex;
    justify-content : center;
    align-items :center;
`

export const AuthMain = tagStyled.div`
    background-color : #3A3A3A;
    width : 80%;
    height : 70%;

    border-radius: 10px;

    display : flex;
    
    justify-content : center;
`

export const AuthForm = tagStyled.div`
    width : 50%;
    height : 100%;

    box-sizing : border-box;

    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    gap : 20px;

    & .MuiFormControlLabel-root {
        color : white;

        & .MuiCheckbox-root {
            svg {
                border : white !important;
                color : white !important;
            }
        }
    }
`