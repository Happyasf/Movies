import React from 'react'
import { PageLayout } from '../components/PageLayout'
import { CircularProgress, Grid } from '@mui/material'
import { getData } from '../utils'
import { useQuery } from 'react-query'
import { MyCard } from '../components/MyCard'

export const Movies = () => {
  const {data,isLoading,isError,error}=useQuery({queryKey: ['moviesdata', 'movie'],queryFn:getData})

  return (
    <PageLayout title="Movies">
      <Grid container spacing={2}>
        {isLoading && <CircularProgress sx={{color:'white'}}/>}
        {data && data.results.map(obj=> 
        <MyCard key={obj.id} {...obj} type='movie'/>)}
      </Grid>
    </PageLayout>
  )
}

