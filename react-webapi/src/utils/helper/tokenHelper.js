import jwt_decode from 'jwt-decode';

import { ADMIN_ROLE, USER_ROLE } from '../static';

import { getCookie } from './cookieHelper';

export const extractToken = () => {
    const decoded = jwt_decode(getCookie('access_token')) ;

    return decoded;
}

export const visitorRole = () => {
    const decoded = extractToken() ;

    return decoded.rol[0] === 'ADMIN' ? ADMIN_ROLE : USER_ROLE;
}