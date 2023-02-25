import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import {
    AuthContainer,
    AuthMain,
    AuthForm
} from './styled/Auth.styled';

import SignIn from 'src/components/Auth/SignIn';
import TwoFactorAuth from 'src/components/Auth/TwoFactorAuth';
import SignUp from 'src/components/Auth/SignUp';

const Auth = () => {
    return (
        <AuthContainer>
            <AuthMain>
                <AuthForm>
                    <Routes>
                        <Route path='/*' element={<SignIn />} />
                        <Route path='/two-factor' element={<TwoFactorAuth />} />
                        <Route path='/signup' element={<SignUp />} />
                    </Routes>
                </AuthForm>
            </AuthMain>
        </AuthContainer>
    )
}

export default Auth;