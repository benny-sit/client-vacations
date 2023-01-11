import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectIsAdmin } from '../features/auth/authSlice'
import AddIcon from '@mui/icons-material/Add';
import { openVacationModal } from '../features/modals/modalsSlice'
import { setEditVacation } from '../features/vacations/vacationsSlice'
import { Link, useNavigate } from 'react-router-dom'

const drawerWidth = 210;
const drawerMaxWidth = 240;

export default function SideNav() {
  const isAdmin = useAppSelector(selectIsAdmin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box
        sx={{
          width: drawerWidth,
          maxWidth: drawerMaxWidth,
          position: 'relative',
          bgcolor: '#F6FBF1',
          boxShadow: '5px 0px 7px 2px rgba(0, 0, 0, 0.1)',
          display: { xs: 'none', md: 'block'},
          flexShrink: 0
        }}
      >
        <Toolbar disableGutters/>
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Profile'} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TrendingUpIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Trending'} />
                </ListItemButton>
              </ListItem>

            <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={'Inbox'} />
                </ListItemButton>
              </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Starred'} />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          { isAdmin && 
          <Box sx={{mx:1, mt: 1, bgcolor: '#FAFDF7', borderRadius: '10px'}}>
            <Typography variant='overline' sx={{mt: 1, ml: 1,}}>
              Admin
            </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
              <ListItemText primary='Admin Panel' />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
                
              <ListItemButton onClick={() => {
                navigate('/dash/reports')
              }}>
                <ListItemIcon>
                  <PlagiarismIcon />
                </ListItemIcon>
              <ListItemText primary='Reports' />
              </ListItemButton>
                
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => {
                dispatch(setEditVacation({editVacation: undefined}))
                dispatch(openVacationModal({}))
                
                }}>
                <ListItemIcon>
                  <AddIcon />      
                </ListItemIcon>
              <ListItemText primary='New Vacation' />
              </ListItemButton>
            </ListItem>
          </List>
          </Box>
          }
        </Box>
      </Box>
  )
}
