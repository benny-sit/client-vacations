import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { SearchOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import React, { useState, useDeferredValue, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectDestinationFilter, selectVacationsLoading, setCurrentPage, setDestinationFilter, setFilterMyVacations, setNumberPages } from '../../features/vacations/vacationsSlice'
import CircularProgress from '@mui/material/CircularProgress'
import ClearIcon from '@mui/icons-material/Clear';
import useDebounce from '../../custom-hooks/UseDebounce'



export default function VacationsSearch() {
  const dispatch = useAppDispatch();
  const [searchDest, setSearchDest] = useState('');
  const isLoading = useAppSelector(selectVacationsLoading);
  const [filterSelected, setFilterSelected] = useState(false);


  useDebounce(() => {
    dispatch(setCurrentPage({currentPage: 1}))
    dispatch(setDestinationFilter({destinationFilter: searchDest}))
  }, [searchDest], 800)

  

  const getMyVacations = () => {
    dispatch(setNumberPages({numberPages: 0}))
    dispatch(setCurrentPage({currentPage: 0}))
    dispatch(setFilterMyVacations({}))
  }
  
  const todayVacations = () => {
  
  }
  
  const underThousand = () => {
  
  }

  const clearSelection = () => {
    dispatch(setCurrentPage({currentPage: 1}))
    setFilterSelected(false);
  }
  
  const filters = [
    {
      title: 'My Vacations',
      action: getMyVacations,
      disabled: false,
      isSelected: false,
    },
    {
      title: 'Vacations today',
      action: todayVacations,
      disabled: true,
      isSelected: false,
    },
    {
      title: 'Under 1000$',
      action: underThousand,
      disabled: true,
      isSelected: false,
    }
  ]  

  return (
    <Box sx={{
      bgcolor: 'white',
      boxShadow: '0px 5px 5px -2px rgba(0, 0, 0, 0.2)',
    }}>
      <Box sx={{
        mx: { xs: 1, md: 5},
        mt: 2,
        mb: 1,
        display: 'flex',
      }}>
        <Typography variant='h6' component='h6'>
          Filters:
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: 1,
          ml: 2,
          flexGrow: 1,
        }}>
          {filters.map((f) =>(
            <Button disabled={f.disabled} onClick={() => {
              // if (f.isSelected) {
              //   dispatch(setCurrentPage({currentPage: 1}))
              // } else {
              // }
              // f.isSelected = !f.isSelected
              setFilterSelected(true)
              f.action()
            }}>
              {f.title}
            </Button>
          ))}
          {
            filterSelected &&
            (
            <IconButton  sx={{ml: 'auto'}} onClick={clearSelection}>
              <ClearIcon  />
            </IconButton>
            )
          }
        </Box>
      </Box>
      <Divider variant='middle' />
      <Box sx={{
        mx: {xs: 2, md: 7},
        mt: 2,
        mb: 3
      }}>
      <TextField
                fullWidth
                id="standard-bare"
                variant="outlined"
                placeholder="Where do you want to go?"
                InputProps={{
                  endAdornment: (
                      isLoading ?
                        <CircularProgress color="inherit" size={20} sx={{mr: 1}} /> 
                      :
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                    
                  ),
                }}
                sx={{
                  bgcolor: 'white',
                }}
                type="text"
                value={searchDest}
                onChange={(e) => setSearchDest(e.target.value)}
              />

      </Box>
    </Box>
  )
}


