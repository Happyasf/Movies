import { Box, Container, Typography } from '@mui/material';
import React from 'react';

export const PageLayout = ({ title, children }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        background: 'linear-gradient(to right, #0d1b2a, #415a77)',
        color: 'black',
        minHeight: '100vh',
        p: 4,
        animation: 'fadeIn 1s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          letterSpacing: 2,
          textAlign: 'center',
          mb: 4,
          background: 'linear-gradient(to right, #e0e1dd, #778da9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
          pb: 10,
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
