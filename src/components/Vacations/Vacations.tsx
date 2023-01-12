import React, {useEffect} from 'react'
import { Box} from '@mui/material';
import VacationsSearch from './VacationsSearch';
import VacationsGrid from './VacationsGrid';
import { AuthAxios, BASE_URL } from '../../services/api';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentPage, selectDestinationFilter, selectPerPage, selectVacationsLoading, setMyVacations, setNumberPages, setVacationLoading, setVacations } from '../../features/vacations/vacationsSlice';
import VacationsModal from './VacationsModal';
import { Vacation } from '../../types';

function combineURLs(baseURL: string, relativeURL: string): string {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

//  , startDate: new Date(vac.startDate), endDate: new Date(vac.endDate)

export default function Vacations() {
  const perPage = useAppSelector(selectPerPage);
  const currentPage = useAppSelector(selectCurrentPage);
  const destinationFilter = useAppSelector(selectDestinationFilter);
  const isLoading = useAppSelector(selectVacationsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!isLoading && currentPage > 0) {
      dispatch(setVacationLoading({isLoading: true}))
      axios.all([
        AuthAxios.get('/vacations', {
          params: {
            perPage: perPage,
            page: currentPage,
            destination: destinationFilter
          },
        }),
        AuthAxios.get('/vacations/my')
      ])
      .then(axios.spread((resVac, resMyVac) => {
        const myVacations: Vacation[] = resMyVac.data.map((vac: any) => {return  {...vac, imageUrl: combineURLs(BASE_URL, vac.imageUrl), isFollowing: true};})
        const myVacId = myVacations.map((vac: any) => vac.id)
        const vacations: Vacation[] = resVac.data.result.map((vac: any) => { return {...vac, imageUrl: combineURLs(BASE_URL, vac.imageUrl) ,isFollowing: myVacId.includes(vac.id)}})
        const newNumberPages = Math.ceil(resVac.data.count / perPage)

        // console.log(resVac)
        // console.log(myVacations)

        dispatch(setNumberPages({numberPages: newNumberPages}))
        dispatch(setVacations({vacations: vacations}))
        dispatch(setMyVacations({myVacations}))
      }))
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(setVacationLoading({isLoading: false}))
      })
    }
  
    return
  }, [perPage, currentPage, destinationFilter])
  


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
