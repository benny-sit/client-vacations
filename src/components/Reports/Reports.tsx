import Box from '@mui/material/Box'
import React from 'react'
import ReportsChart from './ReportsChart'

export default function Reports() {
  return (
    <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        m: 5,
    }}>
        <ReportsChart />
    </Box>
  )
}
