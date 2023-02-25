import * as React from 'react' ;

import tagStyled from 'styled-components';

import { StyledButton } from 'src/shared/styled';

const States = () => {
    const stateList = [
        {
            label : "Total",
            value : "631"
        },
        {
            label : "Homepage",
            value : "64"
        },
        {
            label : "Blog",
            value : "564"
        },
        {
            label : "Registration",
            value : "1"
        },
        {
            label : "Dashboard",
            value : "2"
        },
        {
            label : "Employees",
            value : "1"
        }
    ];

    return (
        <>
            <ButtonDiv>
                <StyledButton>Today</StyledButton>
            </ButtonDiv>
            <StatesMain>
                {
                    stateList.map((state, index) => (
                        <StateCard key={index}>
                            <Title>{state.label}</Title>
                            <Value>{state.value}</Value>
                        </StateCard>
                    ))
                }
            </StatesMain>
        </>
    )
}

export default States ;

const StatesMain = tagStyled.div`
    display : flex;
    gap : 20px;
`

const StateCard = tagStyled.div`
    width : 200px;
    height : 180px;

    padding : 20px;
    border-radius : 10px;

    background : #3A3A3A ;
`

const Title = tagStyled.p`
    margin : 0px;
    font-size : 20px;
    color : white;
    text-align : center;
`

const Value = tagStyled.p`
    color : white;
    margin : 0px;
    padding-top : 20px;
    text-align : center;
`

const ButtonDiv = tagStyled.div`
    display : flex;
    justify-content : flex-end;

    padding-bottom : 20px;
`