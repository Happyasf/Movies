import React, { useEffect, useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Grid, CircularProgress, Box, Typography } from '@mui/material';
import { MyCard } from '../components/MyCard';
import axios from 'axios';
import { getData, img_500 } from '../utils';
import { useQuery } from 'react-query';

export const TVSeries = () => {

const {data,isLoading,isError,error}=useQuery({queryKey: ['tvdata', 'tv'],queryFn:getData})

  return (
    <PageLayout title="Series">
          <Grid container spacing={2}>
            {isLoading && <CircularProgress sx={{color:'white'}}/>}
            {data && data.results.map(obj=> 
            <MyCard key={obj.id} {...obj}/>)}
          </Grid>
        </PageLayout>
  );
};
