/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Button } from '@mui/material'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import colortheme from '../theme/theme'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useUserLogout } from '../hooks/user/userLogout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../actions';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.authReducer.userEmail)

  const mtheme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 


  const sizetheme = useTheme();
    const sm = useMediaQuery(sizetheme.breakpoints.down('sm'));
    const md = useMediaQuery(sizetheme.breakpoints.between('md', 'lg'));
    const lg = useMediaQuery(sizetheme.breakpoints.up('xl'));

  const handleLogout = async () => {
    try {
      const response = await useUserLogout('/logout')
      console.log('R:', response)
      if (response.status === 200) {
        dispatch(LOGOUT())
        navigate('/')
        alert('SUCCESFULLY LOGGED OUT!')
      }
      
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }
  
  return (
    <>
     {!sm ? <> <div className={`tw-min-h-[60px] tw-flex ${sm ? "tw-justify-end" : 'tw-justify-between'}`}>
          
          <div className="logo tw-pl-8">
          <Link href="/"><img src="imgs/cover.png" alt="RecipeMatch" className='tw-h-[60px]'/></Link>
        </div>
        <div className="right tw-flex">
          <div className="s2 tw-flex tw-items-center tw-gap-4">
          <Link to={userInfo !== "" ? "/saved" : "/login"} underline="none" color="grey[900]"><button className=''>Saved Recipes</button></Link>
          {/*<Link to="/myFridge" underline="none" color="grey[900]"><button>fridge</button></Link>*/}
          </div>
          <div className="logsign tw-flex tw-items-center tw-gap-2 tw-ml-8 tw-mr-16">
          <ThemeProvider theme={colortheme}>
            {userInfo === "" ? <Link to="/login"><Button variant="outlined" color='black' className='josefin'>Log In</Button></Link> : <Button variant="outlined" color='black' onClick={handleLogout}>Log Out</Button>}
            <Link to="/signUp"><Button variant="contained" color='black'><LoginIcon/> <p className='tw-ml-2'>Sign Up</p></Button></Link>
          </ThemeProvider>
          </div>
        </div>   
        </div>
        </> :   <> 
        <ThemeProvider theme={colortheme}>
          <CssBaseline />
          <AppBar position="fixed" open={open} sx={{ boxShadow: 0 }}>
            <Toolbar sx={{ backgroundColor: 'white !important'}}>
              <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div" color='white'>
                <Link href="/"><img src="imgs/cover.png" alt="RecipeMatch" className='tw-h-[60px]'/></Link>
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
              >
                <MenuIcon sx={{ color: 'black !important' }}/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
          sx={{
            width: '100%',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '100%',
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {mtheme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          </Drawer>
        </ThemeProvider></>}
        <Outlet />
        
    </>
      
         
     

  )
}

