import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { SearchOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import React from 'react'

const getMyVacations = () => {

}

const todayVacations = () => {

}

const underThousand = () => {

}

const filters = [
  {
    title: 'My Vacations',
    action: getMyVacations,
    disabled: false,
  },
  {
    title: 'Vacations today',
    action: todayVacations,
    disabled: true,
  },
  {
    title: 'Under 1000$',
    action: underThousand,
    disabled: true,
  }
]  

export default function VacationsSearch() {
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
        }}>
          {filters.map((f) =>(
            <Button disabled={f.disabled}>
              {f.title}
            </Button>
          ))}
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
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
                sx={{
                  bgcolor: 'white',
                }}
              />

      </Box>
    </Box>
  )
}
