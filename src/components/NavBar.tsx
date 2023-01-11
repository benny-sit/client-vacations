import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logOut, selectCurrentUser, selectIsAdmin } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { openVacationModal } from '../features/modals/modalsSlice';

const pages = [
  {
    name: 'Dashboard',
    AdminOnly: false,
  },
  {
    name: 'Reports',
    AdminOnly: true,
  },
  {
    name: 'New Vacation',
    AdminOnly: true,
  }
] 
const settings = ['Profile', 'Account', 'Logout'];

const Search = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    display: 'block',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



function ResponsiveAppBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const user = useAppSelector(selectCurrentUser)
  const isAdmin = useAppSelector(selectIsAdmin)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e: any) => {
    setAnchorElNav(null);
    const pathName = e.target.textContent.toLowerCase()
    if (pathName === 'reports') {
      navigate('/dash/reports');
    } else if (pathName === 'dashboard') {
      navigate('/dash');
    } else if (pathName === 'new vacation' ) {
      dispatch(openVacationModal({}))
    }
  };

  const handleCloseUserMenu = (e: any) => {
    setAnchorElUser(null);
    if(e.target.textContent == "Logout") {
      handleLogout()
    }
  };

  const handleLogout = () => {
    dispatch(logOut({}));
    localStorage.removeItem('auth');
    navigate('/', {replace: true});
  }

  return (
    <AppBar position="static" sx={{
        backgroundColor: '#bee59f',
        color: '#09040E',
        zIndex: (theme) => theme.zIndex.drawer + 1
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1,
          }}>
            <Link to='/dash'>
          <img src='/vacationsLogo.png' width={48}/>
            </Link>
            <Link to='/dash'>
          <img src='/vacationsTitle.png' height={32}/>
            </Link>
          </Box>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => 
                {
                  if(page.AdminOnly && !isAdmin) return
                  
                  return (<MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>)
                }
              )}
            </Menu>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            gap: 1,
            flexGrow: 1,
          }}>
          <img src='vacationsLogo.png' width={35}/>
          <img src='/vacationsTitle.png' height={26}/>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end' }}>
            {pages.map((page) => {
              if (page.AdminOnly && !isAdmin) return 

              return (<Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{mx: 1, color: '#09040E', display: 'block' }}
              >
                {page.name}
              </Button>)
            }
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  { user ? user.username[0].toUpperCase() : 'A'}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

