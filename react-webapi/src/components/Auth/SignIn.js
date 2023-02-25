import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';

import { StyledButton, StyledTextField } from 'src/shared/styled';

import { 
    Title
} from './styled/Common.styled';

import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    InputAdornment
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { alertErrorMessage } from 'src/shared/components';

import axios from 'axios';
import { ADMIN_ROLE, backend_endpoint } from 'src/utils/static';

import { setCookie } from 'src/utils/helper/cookieHelper';
import { visitorRole } from 'src/utils/helper/tokenHelper';

const SignIn = () => {
    const navigate = useNavigate() ;

    const [userName, onChangeUserName] = React.useState(null) ;
    const [userPwd, onChangeUserPwd] = React.useState(null) ;
    const [rememberMe, onChangeRememberMe] = React.useState(false) ;
    const [pwdVisible, onChangePwdVisible] = React.useState(false) ;

    const helperText = (field_name) => {
        switch(field_name) {
            case "username" :
                if(userName === '') return "User name is required";
                break;
            case "userpwd" :
                if(userPwd === '') return "Password is required";
                if(userPwd !== null && userPwd.length < 8) return "Password is too short (minimum is 8 characters)" ;
                break ;
            default :
                break;
        }

        return "" ;
    }

    const formValidate = () => {
        return (userName &&  userPwd && userPwd.length >= 8) ? true : false;
    }

    const userLogin = async () => {
        try {
            let res = await axios.post(`${backend_endpoint}auth/signin`, {
                username : userName,
                password: userPwd,
                remember_me: rememberMe
            }) ;

            setCookie('access_token', res.data.accessToken) ;

            if(visitorRole() === ADMIN_ROLE) navigate('/dashboard/admin') ;
            else navigate('/dashboard') ;
        } catch(err) {
            console.log(err) ;

            alertErrorMessage(err.response.status, 'Login Failed') ;
        }
    }

    return (
        <>
            <Title>Welcome back</Title>
            <StyledTextField
                fullWidth 
                placeholder='Your username'
                value={userName || ''}
                onChange={(e) => onChangeUserName(e.target.value)}
                helperText={helperText('username')}
            />
            <StyledTextField 
                type={pwdVisible ? 'text' : 'password'}
                fullWidth
                placeholder='Your password'
                value={userPwd || ''}
                onChange={(e) => onChangeUserPwd(e.target.value)}
                helperText={helperText('userpwd')}
                InputProps={{
                    endAdornment: <InputAdornment position="end" sx={{cursor : 'pointer'}} onClick={() => onChangePwdVisible(!pwdVisible)}>
                    {
                        !pwdVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>
                    }
                </InputAdornment>,
            }}
            />
            <FormGroup row sx={{marginTop : "15px"}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            checked={rememberMe}
                            onChange={(e) => onChangeRememberMe(!rememberMe)}
                        />
                    }
                    label={<span >Remember me</span>}
                />
            </FormGroup>
            <StyledButton 
                disabled={!formValidate()}
                onClick={userLogin}
            >
                Login
            </StyledButton>
        </>
    )
}

export default SignIn;