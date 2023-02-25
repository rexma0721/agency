import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import tagStyled from 'styled-components';
import { StyledButton } from 'src/shared/styled';

const TopSection = () => {
    const navigate = useNavigate() ;

    return (
        <Grid container>
            <Grid item xs={6}>
                <TopSectionBody>
                    <div>
                        <TopDescription>
                            This is the homepage
                        </TopDescription>
                        <TopSmallDescription>
                            Lorem ipsum text, this is the hero
                        </TopSmallDescription>
                    </div>
                    <StyledButton onClick={() => navigate('/auth/signup')}>Get Started</StyledButton>
                </TopSectionBody>
            </Grid>
            <Grid item xs={6}>
                <PictureBody>

                </PictureBody>
            </Grid>
        </Grid>
    )
}

export default TopSection ;

const TopDescription = tagStyled.p`
    font-size : 35px;
    color : white;
    font-weight : bold;
    margin : 0px;
`

const TopSmallDescription = tagStyled.p`
    font-size : 25px;
    color : white;
    margin : 0px;
`
const TopSectionBody = tagStyled.div`
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : space-between;

    gap : 150px;
`

const PictureBody = tagStyled.div`
    width : 100%;
    height : 100%;

    background : #3A3A3A;
`
