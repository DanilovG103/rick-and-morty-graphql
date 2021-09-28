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

const Search = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
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
      fetchMore({variables: {page,name}}).then(result => result)
    }
  },[page, name, fetchMore])

  return (
    <Container>
      <Search>
        <TextField label="Character name" variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>
        <div>
          <Button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>PrevPage</Button>
          <Button onClick={() => setPage(prev => prev + 1)}>NextPage</Button>
        </div>
      </Search>
    <GridContainer>
      {(loading) ? (
        <Loader>
          <CircularProgress/>
        </Loader>
      ) : (
        data?.characters?.results?.map((item: Result) => (
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
        ) 
      ))}
      </GridContainer>
    </Container>
  );
}

export default App;
