import React, { useState } from 'react'
import { Box, Grid, Pagination} from '@mui/material'
import { Vacation } from '../../types'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentPage, selectNumberPages, selectVacations, setCurrentPage } from '../../features/vacations/vacationsSlice';
import VacationCard from './VacationCard';




export default function VacationsGrid() {
  const page = useAppSelector(selectCurrentPage)
  const numberOfPages = useAppSelector(selectNumberPages);
  const vacations = useAppSelector(selectVacations);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage({ currentPage: value}))
  }


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
      flexGrow: 1,
      mt: 3,
      mx: { xs: 1, md: 7},
    }}>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center' alignItems='flex-start'>
        {vacations.map((vac) => (
          <Grid item xs={4} display='flex' justifyContent='center'>
            <VacationCard details={vac}/>
          </Grid>
        ))}
      </Grid>

      {numberOfPages > 0 && <Box sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'flex-end' ,
        mb: 2,
        mt: 2,
      }}>
      <Pagination count={numberOfPages} page={page} onChange={handleChange} />
      </Box>}
    </Box>
  )
}
