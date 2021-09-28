import React from 'react';
import { useQuery } from '@apollo/client';
import { getCharacters } from './queries';
import { Card, CardContent, CardMedia, Container, Typography } from '@material-ui/core';
import styled from 'styled-components'

const GridContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

function App() {
  const {data, loading, error} = useQuery(getCharacters)

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>{error.message}</h1>

  return (
    <GridContainer>
      {data?.characters?.results?.map(((item: any) => (
        <Card style={{width: 250, marginTop: 10}}>
          <CardMedia component="img" height="200" image={item.image}/>
          <CardContent>
            <Typography color="textPrimary">
              {item.name}
            </Typography>
            <Typography color="textSecondary">
              Status: {item.status}
            </Typography>
            <Typography color="textSecondary">
              Last location: 
            </Typography>
            {item.location.name}
          </CardContent>
        </Card>
      )))}
    </GridContainer>
  );
}

export default App;
