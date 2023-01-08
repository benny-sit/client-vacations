import React, {useEffect} from 'react'
import { Box} from '@mui/material';
import VacationsSearch from './VacationsSearch';
import VacationsGrid from './VacationsGrid';
import { AuthAxios } from '../../services/api';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentPage, selectPerPage } from '../../features/vacations/vacationsSlice';
import VacationsModal from './VacationsModal';

export default function Vacations() {
  const perPage = useAppSelector(selectPerPage);
  const currentPage = useAppSelector(selectCurrentPage)

  useEffect(() => {
    axios.all([
      AuthAxios.get('/vacations', {
        params: {
          perPage: perPage,
          page: currentPage
        },
      }),
      AuthAxios.get('/vacations/my')
    ])
    .then(axios.spread((resVac, resMyVac) => {
      const myVacations = resMyVac.data
      const Vacations = resVac.data.result

      console.log(resVac)
      console.log(resMyVac)
    }))
  
    return
  }, [])
  


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    }}>
      <VacationsSearch />
      <VacationsGrid />
      <VacationsModal />
    </Box>
  )
}
