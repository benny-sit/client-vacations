import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

export default function Loading() {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: 2,
        position: 'relative',
        backgroundColor: '#F6FBF1',
    }} >
        <img src='/vacationsLogo.png' width={64} />
        <CircularProgress />
    </Box>
  )
}
