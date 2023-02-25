import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';
import useStyles from 'src/shared/hooks/useStyles';

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input' ;
import validator from 'validator';

import { PhoneForm } from 'src/shared/ui';
import { Select, MenuItem, InputAdornment } from '@mui/material';
import { Title } from './styled/Common.styled';
import { StyledButton, StyledFormControl, StyledTextField } from 'src/shared/styled';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Loading from 'react-loading-components';
import { alertErrorMessage } from 'src/shared/components';

import axios from 'axios' ;
import { backend_endpoint } from 'src/utils/static';

const SignUp = () => {
    const classes = useStyles() ;

    const navigate =  useNavigate() ;

    const [step, onChangeStep] = React.useState(0);

    const [gender, onChangeGender] = React.useState('male') ;
    const [phoneNumber, onChangePhoneNumber] = React.useState(null);
    const [firstName, onChangeFirstName] = React.useState(null);
    const [lastName, onChangeLastName] = React.useState(null) ;
    const [businessName, onChangeBusinessName] = React.useState(null) ;
    const [email, onChangeEmail] = React.useState(null);
    const [emailVerifyCode, onChangeEmailVerifyCode] = React.useState('') ;
    const [password, onChangePassword] = React.useState(null);
    const [confirm_password, onChangeConfirmPwd] = React.useState(null);
    const [pwdVisible, onChangePwdVisible] = React.useState(false);
    const [confirmPwdVisible, onChangeConfirmPwdVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false) ;

    const helperText = (step) => {
        switch(step) {
            case 0 :
                if(firstName === '') return "First name is required";
                break ;
            case 1 :
                if(lastName === '') return "Last name is required";
                break ;
            case 3 :
                if(businessName === '') return 'Business name is required';
                break;
            case 5 :
                if(email === '') return 'Email is required' ;
                if(email !== null && !validator.isEmail(email)) return "Invalid Email" ;
                break ;
            case 81:
                if(password === '') return "Password is required";
                if(password !== null && password.length < 8) return "Password is too short (minimum is 8 characters)" ;
                break;
            case 82 :
                if(confirm_password === '') return "Confirm password is required";
                if(confirm_password !== null && confirm_password.length < 8) return "Confirm password is too short (minimum is 8 characters)" ;
                break;
            default:
                return "" ;
        }

        return "";
    }

    const checkByApi = async (endpoint_name, request_body) => {
        setLoading(true);
        try {
            let res = await axios.post(`${backend_endpoint}auth/${endpoint_name}`, request_body) ;

            console.log(res.data) ;
            setLoading(false) ;
            return true ;
        } catch(err) {
            setLoading(false) ;

            console.log(err) ;

            alertErrorMessage(err.response.status, err.response.data.message) ;
            return false;
        }
    }

    const goToNextStep = async () => {
        switch(step) {
            case 3 :
                if(!await checkByApi('checkusername', { username : businessName })) return ;
                break;
            case 4 :
                if(!await checkByApi('checkphone', { phonenumber : phoneNumber })) return ;
                break;
            case 5 :
                if(!await checkByApi('checkemail', { email })) return ;
                break;
            case 8:
                // if(await checkByApi('signup' , { 
                //     username : businessName,
                //     password,
                //     firstname : firstName,
                //     lastname : lastName,
                //     gender,
                //     phonenumber : phoneNumber,
                //     email
                // })) navigate('/auth/signin') ;
                navigate('/auth/signin') ;
                return ;
            default:
                break;
        }
        onChangeStep(step + 1);
    }

    const formValidate = () => {
        switch(step) {
            case 0 :
                return !firstName ? false : true;
            case 1 :
                return !lastName ? false : true ;
            case 2 :
                return true;
            case 3 :
                return !businessName ? false : true;
            case 4 :
                return phoneNumber ? (isValidPhoneNumber(phoneNumber) ? true : false) : false ;
            case 5 :
                return email ? ( validator.isEmail(email) ? true : false ) : false;
            case 8 :
                return ( confirm_password && password && confirm_password.length >= 8 && password.length >= 8 && confirm_password === password) ? true : false;
            default :
                return true ;
        }
    }

    const FirstName = <>
        <Title>Tell us your first name</Title>
        <StyledTextField 
            placeholder='Your first name'
            fullWidth
            value={firstName || ''}
            onChange={(e) => onChangeFirstName(e.target.value)}
            helperText={helperText(step)}
        />
    </>

    const LastName = <>
        <Title>Tell us your last name</Title>
        <StyledTextField 
            placeholder='Your last name'
            fullWidth
            value={lastName || ''}
            onChange={(e) => onChangeLastName(e.target.value)}
            helperText={helperText(step)}
        />
    </>

    const Gender = <>
        <Title>Choose your gender</Title>
        <StyledFormControl fullWidth>
            <Select
                value={gender}
                onChange={(e) => onChangeGender(e.target.value)}
                MenuProps={{
                    className : classes.selectPaper
                }}
            >
                
                <MenuItem value="male">
                    Male
                </MenuItem>
                <MenuItem value="female">
                    Female
                </MenuItem>
            </Select>
        </StyledFormControl>
    </>

    const BusinessName = <>
        <Title>Tell us your business name</Title>
        <StyledTextField 
            placeholder='Your business name'
            fullWidth
            value={businessName || ''}
            onChange={(e) => onChangeBusinessName(e.target.value)}
            helperText={helperText(step)}
        />
    </>

    const PhoneNumber = <>
        <Title>What is your phone number</Title>
        <PhoneForm
            phoneNumber={phoneNumber}
        >
            <PhoneInput
                placeholder="Your phone number"
                value={phoneNumber}
                onChange={onChangePhoneNumber}
            />
        </PhoneForm>
    </>

    const EmailAddress = <>
        <Title>What is your e-mail address?</Title>
        <StyledTextField 
            placeholder='Your email address'
            fullWidth
            value={email || ''}
            onChange={(e) => onChangeEmail(e.target.value.toLowerCase())}
            helperText={helperText(step)}
        />
    </>

    const VerifyEmail = <>
        <Title>Please verify your email address</Title>
        <StyledTextField 
            value={emailVerifyCode}
            onChange={(e) => onChangeEmailVerifyCode(e.target.value)}
            fullWidth
            placeholder='Email Verify Code'
        />
    </>

    const EmailVerified =<>
        <Title>Your email is verified, you can login now!</Title>
    </>

    const Password = <>
        <Title>Set up your password</Title>
        <StyledTextField
            type={pwdVisible ? 'text' : 'password'}
            value={password || ''}
            onChange={(e) => onChangePassword(e.target.value)}
            placeholder='Your password'
            fullWidth
            InputProps={{
                    endAdornment: <InputAdornment position="end" sx={{cursor : 'pointer'}} onClick={() => onChangePwdVisible(!pwdVisible)}>
                    {
                        !pwdVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>
                    }
                </InputAdornment>,
            }}
            helperText={helperText(81)}
        />
        <StyledTextField
            type={confirmPwdVisible ? 'text' : 'password'}
            value={confirm_password || ''}
            onChange={(e) => onChangeConfirmPwd(e.target.value)}
            placeholder='Retype you password'
            fullWidth
            helperText={helperText(82)}
            InputProps={{
                endAdornment: <InputAdornment position="end" sx={{cursor : 'pointer'}} onClick={() => onChangeConfirmPwdVisible(!confirmPwdVisible)}>
                {
                    !confirmPwdVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>
                }
            </InputAdornment>,
        }}
        />
    </>
    return (
        <>
            { step === 0 && FirstName }
            { step === 1 && LastName }
            { step === 2 && Gender }
            { step === 3 && BusinessName }
            { step === 4 && PhoneNumber }
            { step === 5 && EmailAddress}
            { step === 6 && VerifyEmail }
            { step === 7 && EmailVerified}
            { step === 8 && Password }

            <StyledButton 
                onClick={goToNextStep}
                disabled={!formValidate() || loading}
                startIcon={loading && <Loading width={20} height={20} fill='white'/>}
            >
                { step === 6 ? "Verify Email" : ( step === 8 ? "Login" : "Continue")}
            </StyledButton>
        </>
    )
}

export default SignUp ;