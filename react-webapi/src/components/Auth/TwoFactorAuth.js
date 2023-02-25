import * as React from 'react' ;
import { StyledButton, StyledTextField } from 'src/shared/styled';

import { 
    Title
} from './styled/Common.styled';

import {
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';

const TwoFactorAuth = () => {
    return (
        <>
            <Title>2 Factor Authentication</Title>
            <StyledTextField
                fullWidth 
                placeholder='Enter your code'
            />
            <FormGroup row sx={{marginTop : "15px"}}>
                <FormControlLabel
                    control={
                    <Checkbox
                        color="primary"
                    />
                    }
                    label={<span >remember this device for 30 days</span>}
                />
            </FormGroup>
            <StyledButton >
                Verify
            </StyledButton>
        </>
    )
}

export default TwoFactorAuth;