/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react' ;

import { useLocation, useNavigate } from 'react-router-dom';

import useStyles from 'src/shared/hooks/useStyles';

import {
    List,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    ListItem,
    Divider,
    Drawer as MuiDrawer,
    useMediaQuery
} from '@mui/material' ;

import UnionImage from 'src/assets/menu/Logo.png' ;
import LogOutImage from 'src/assets/menu/Logout.svg' ;

import { styled } from '@mui/material/styles' ;
import { ExpandLogo, ExpandLogoDiv, LessLogo, LessLogoDiv, Logo, LogoLabel, MenuList } from './styled/SideMenu.styled';

import { eraseCookie } from 'src/utils/helper/cookieHelper';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideBar = (props) => {
    const {
      open,
      setOpen,
      menuList
    } = props ;

    const classes = useStyles() ;
    const navigate = useNavigate() ;
    const location = useLocation() ;

    const match520 = useMediaQuery('(min-width : 545px)') ;

    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false) ;
    const [selectedTab, setSelectedTab] = React.useState(1) ;

    
    const handleOpenMobileMenu = () => {
        setMobileMenuOpen(true);
    }
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleGotoTab = (link, index) => {
        setSelectedTab(index) ;
        navigate(link) ;
    }

    const handleLogOut = () => {
      eraseCookie('access_token') ;
      navigate('/') ;
      navigate('/auth') ;
    }

    React.useEffect(() => {
      // eslint-disable-next-line array-callback-return
      menuList.map((menu, index) => {
        if(location.pathname.search(menu.link) >= 0) {
          setSelectedTab(index) ;
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]) ;

    return (
        <>
        {/* match520 ?  */}
        {
            <Drawer variant="permanent" open={open} classes={{paper : classes.sideMenuPaper}}>
                <div>
                  <List>
                      <ListItem
                          sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                          }}
                      >
                          <ListItemIcon
                              sx={{
                                  minWidth: 0,
                                  justifyContent: 'center',
                              }}
                          >
                              {open ? <ExpandLogoDiv className={classes.expandUnionDiv}>
                                          <ExpandLogo  onClick={handleDrawerClose}>
                                              <Logo src={UnionImage} /> 
                                          </ExpandLogo>
                                          <LogoLabel>
                                            Agency
                                          </LogoLabel>
                                  </ExpandLogoDiv>
                              :<LessLogoDiv>
                                      <LessLogo  onClick={handleDrawerOpen}>
                                          <img src={UnionImage} width={60} height={60} style={{borderRadius : '50%'}}/>
                                      </LessLogo>
                              </LessLogoDiv>}
                          </ListItemIcon>
                      </ListItem>
                  </List>
                  <Divider />
                  <MenuList>
                    {
                        menuList.map((menu, index) => (
                            <ListItemButton
                                key={index}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    background : selectedTab === index && "#313131"
                                }}
                                onClick={()=>handleGotoTab(menu.link, index)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img src={menu.icon} width={35} height={30} style={{color : 'white !important'}}/>
                                </ListItemIcon>
                                <ListItemText primary={menu.label} sx={{ opacity: open ? 1 : 0, color : '#EFF2F4', fontSize : '10px !important'}} />
                            </ListItemButton>
                        ))
                    }
                    
                  </MenuList> 
                </div>
                <List>
                  <ListItemButton
                      sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                      }}

                      onClick={handleLogOut}
                  >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={LogOutImage} width={26} height={26}/>
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0, color : '#EFF2F4' }} />
                  </ListItemButton>
                </List>
            </Drawer>
            // : 
            // (
            //     !mobileMenuOpen ? <Box className={classes.popButtonCss} onClick={handleOpenMobileMenu}>
            //         <img src={UnionImage}  width={60} height={60} style={{borderRadius : '50%'}}/>
            //     </Box>
            //     : <></>
            // )
            
        }
        {/* <MobileSideMenu 
            open={mobileMenuOpen}
            handleClose={handleCloseMobileMenu}
            menuList={menuList}
            handleLogOut={handleLogOut}
        /> */}
        </>
    );
}

export default SideBar ;