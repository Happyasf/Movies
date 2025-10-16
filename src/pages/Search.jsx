import React, { useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  CircularProgress,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { PageLayout } from '../components/PageLayout';
import { MyCard } from '../components/MyCard';

export const Search = () => {
  const [type, setType] = useState('movie'); // 'movie' vagy 'tv'
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTypeChange = (event, newType) => {
    if (newType !== null) setType(newType);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type}?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US&query=${query}&page=1&include_adult=false`
      );
      setResults(data.results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch search results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Search">
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          mt: 4,
          flexWrap: 'wrap',
        }}
      >
        {/* Keresőmező */}
        <TextField
          label="Search..."
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            input: { color: '#e0e1dd' },
            label: { color: '#e0e1dd' },
            fieldset: { borderColor: '#778da9' },
            width: '300px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '8px',
          }}
        />

        {/* Típusválasztó */}
        <ToggleButtonGroup
          color="primary"
          value={type}
          exclusive
          onChange={handleTypeChange}
          sx={{
            background: '#1b263b',
            borderRadius: 2,
            '& .MuiToggleButton-root': {
              color: '#e0e1dd',
              borderColor: '#415a77',
              '&.Mui-selected': {
                backgroundColor: '#415a77',
                color: '#ff4d4d',
              },
            },
          }}
        >
          <ToggleButton value="movie">Movies</ToggleButton>
          <ToggleButton value="tv">TV Series</ToggleButton>
        </ToggleButtonGroup>

        {/* Kereső gomb */}
        <IconButton
          type="submit"
          sx={{
            color: '#ff4d4d',
            backgroundColor: '#1b263b',
            border: '1px solid #415a77',
            '&:hover': { backgroundColor: '#415a77' },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Eredmények */}
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <CircularProgress size={60} sx={{ color: '#ff4d4d' }} />
        </Box>
      ) : error ? (
        <Typography variant="h6" sx={{ color: 'red', textAlign: 'center' }}>
          {error}
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            py: 4,
            px: 2,
          }}
        >
          {results.length > 0 ? (
            results.map((item) => (
              <Grid
                item
                key={item.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                display="flex"
                justifyContent="center"
              >
                <MyCard
                  backdrop_path={item.backdrop_path || item.poster_path}
                  title={item.title || item.name}
                  overview={item.overview}
                  vote_average={item.vote_average}
                />
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{
                color: '#e0e1dd',
                textAlign: 'center',
                mt: 5,
                opacity: 0.7,
              }}
            >
              No results found. Try searching for something!
            </Typography>
          )}
        </Grid>
      )}
    </PageLayout>
  );
};
