import * as React from 'react' ;

import { Avatar } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { HeaderDiv } from './styled/Common.styled';

import UserHeaderOpt from './UserHeaderOpt';

import UserAvatar from 'src/assets/avatar/2.jpg';

import { extractToken } from 'src/utils/helper/tokenHelper';
import { eraseCookie } from 'src/utils/helper/cookieHelper';

const UserHeader = () => {
    const navigate = useNavigate() ;

    const anchorRef = React.useRef(null) ;
    const [ isOpenOpt , setOpenOpt ] = React.useState(false) ;

    const handlePopOver = () => { setOpenOpt(!isOpenOpt) ; }
   
    const handleSignOut = () => {
        eraseCookie('access_token') ;
        navigate('/') ;
    }

    return (
        <>
            <HeaderDiv>
                <Avatar alt="Cindy Baker" src={UserAvatar} ref={anchorRef} onClick={handlePopOver}/>
                { extractToken().preferred_username }
            </HeaderDiv>
            <UserHeaderOpt
                open={isOpenOpt}
                handlePopOver={handlePopOver}
                handleSignOut={handleSignOut}
                anchorEl={anchorRef ? anchorRef.current : null}
            />
        </>
    )
}

export default UserHeader ;