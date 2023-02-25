import * as React from 'react' ;

import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

import { HeaderDiv } from './styled/Common.styled';

import AdminHeaderOpt from './AdminHeaderOpt';

import UserAvatar from 'src/assets/avatar/2.jpg';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { extractToken } from 'src/utils/helper/tokenHelper';
import { eraseCookie } from 'src/utils/helper/cookieHelper';

const AdminHeader = () => {
    const navigate = useNavigate() ;
    const anchorRef = React.useRef(null) ;
    const [ isOpenOpt , setOpenOpt ] = React.useState(false) ;

    const handlePopOver = () => { setOpenOpt(!isOpenOpt) ; }
   
    const handleSignOut = () => {
        eraseCookie('access_token');
        navigate('/');
    }

    return (
        <>
            <HeaderDiv>
                <NotificationsActiveIcon />
                <Avatar alt="Cindy Baker" src={UserAvatar} ref={anchorRef} onClick={handlePopOver}/>
                { extractToken().preferred_username }
            </HeaderDiv>
            <AdminHeaderOpt
                open={isOpenOpt}
                handlePopOver={handlePopOver}
                handleSignOut={handleSignOut}
                anchorEl={anchorRef ? anchorRef.current : null}
            />
        </>
    )
}

export default AdminHeader ;