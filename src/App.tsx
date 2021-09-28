import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components'
import { Button, Card, CardContent, CardMedia, CircularProgress, Container, TextField, Typography } from '@material-ui/core';
import { getCharacters } from './queries';
import { Result } from './types';

const GridContainer = styled(Container)`
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SearchButton = styled(Button)`
  align-self: flex-end;
  padding: 4px 20px;
`

const Loader = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
`

function App() {
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const {data, loading, fetchMore} = useQuery(getCharacters, {
    variables: {
      page,
      name
    }
  })

  useEffect(() => {
    if (fetchMore !== undefined) {
      fetchMore({variables: {page}}).then(result => result)
    }
  },[page, name, fetchMore])

  if (loading) return (
    <Loader>
      <CircularProgress/>
    </Loader>
  )

  return (
    <Container>
      <Search>
        <TextField label="Character name" variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>
        <SearchButton onClick={() => fetchMore({variables: {name}}).then(result => result)}>Find</SearchButton>
      </Search>
    <GridContainer>
      {data?.characters?.results?.map(((item: Result) => (
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
