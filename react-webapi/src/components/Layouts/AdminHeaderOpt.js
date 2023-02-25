import * as React from 'react' ;

import { Link } from 'react-router-dom';

import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

import {
   Popover,
   List,
   ListItem,
   Divider,
   Box
} from '@mui/material' ;

import useStyles from 'src/shared/hooks/useStyles';

const AdminHeaderOpt = (props) => {
    const classes = useStyles() ;

    const {
        open , anchorEl , handlePopOver , handleSignOut
    } = props ;

    const optList = [
        {
            name : 'Edit Profile' ,
            link : "#"
        },
        {
            name : 'Change Password',
            link : '#'
        }
    ];

    return (
        <Popover
            id="user-header-popover"
            anchorEl={anchorEl}
            open={open}
            onClose={handlePopOver}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            classes={{
                paper : classes.optPopover
            }}
        >
            <List>
            {
                optList.map((item, index) => (
                    <Box key={index}>
                        <Link to={item.link}>
                            <ListItem button onClick={handlePopOver}>
                                {item.name}
                            </ListItem>
                        </Link>
                        <Divider />
                    </Box>
                ))
            }
                <ListItem onClick={handleSignOut} button >
                    { `Sign Out` } <ExitToAppRoundedIcon sx={{pl:1}}/>
                </ListItem>
            </List>
        </Popover>
    )
}

export default AdminHeaderOpt ;