import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { getCharacters } from './queries';
import { Button, Card, CardContent, CardMedia, Container, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components'

const GridContainer = styled(Container)`
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function App() {
  const [page, setPage] = useState(1)
  const {data, loading, fetchMore} = useQuery(getCharacters, {
    variables: {
      page
    }
  })

  useEffect(() => {
    if (fetchMore !== undefined) {
      fetchMore({variables: {page}}).then(result => result)
    }
  },[page, fetchMore])

  if (loading) return <h1>Loading...</h1>

  return (
    <Container>
      <Search>
        <TextField label="Character name" variant="standard" />
        <Button>Find</Button>
      </Search>
    <GridContainer>
      {data?.characters?.results?.map(((item: any) => (
        <Card key={item.id} style={{width: 250, marginTop: 10}}>
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
      <Button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>PrevPage</Button>
      <Button onClick={() => setPage(prev => prev + 1)}>NextPage</Button>
    </Container>
  );
}

export default App;
