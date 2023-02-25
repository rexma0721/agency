import * as React from 'react';

import tagStyled from 'styled-components';

import { isValidPhoneNumber } from 'react-phone-number-input' ;

const PhoneForm = ({children, phoneNumber}) => (
    <PhoneFormMain>
        {children}
        <ErrorDiv>
            {
                phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number') : ( phoneNumber === null ? "" : 'Phone number required' )
            }
        </ErrorDiv>
    </PhoneFormMain>
)


export default PhoneForm ;

const PhoneFormMain = tagStyled.div`
    width : 100%;
    & input {
        &:focus  {
            border: none !important ;
        }

        &:hover: {
            border: none !important ;
        }

        width : 80%;
        outline : none !important ;
        padding : 10px !important ;
        display : flex !important ;
        align-items : center !important ;
        padding-left : 10px !important ;
        color : white !important ;
        background : #4D4D4D;
        border: 1px solid !important ;
        height : 48px ;
        border-radius : 5px ;
    }

    & .PhoneInputCountry {
        select {
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            appearance: none !important;
       }
        & .PhoneInputCountryIcon {
            width : 50px;
            height: 50px;
    
            box-shadow : none !important;
        }

        svg {
            color: white;
        }
    }
    
`

const ErrorDiv = tagStyled.div`
    color : red;
    font-size : 13px;
`