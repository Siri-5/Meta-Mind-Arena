'use client';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Typography, Paper } from '@mui/material';

const GeneratedFlashcardsPage = () => {
  const searchParams = useSearchParams();
  const flashcards = searchParams.get('data');

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        🎉 Flashcards Generated Successfully!
      </Typography>

      {flashcards ? (
        <Box sx={{ textAlign: 'left', mt: 4 }}>
          {flashcards
            .split('\n')
            .filter((card) => card.trim() !== '')
            .map((card, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  my: 1,
                  borderRadius: 2,
                  boxShadow: 2,
                  bgcolor: '#f5f5f5',
                }}
              >
                <Typography>{card}</Typography>
              </Paper>
            ))}
        </Box>
      ) : (
        <Typography>No flashcards generated. Please try again.</Typography>
      )}
    </Container>
  );
};

export default GeneratedFlashcardsPage;
