'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";
// import { useUser } from '@clerk/nextjs';
// import { useRef } from 'react';

const HeroSection = () => {
  const router = useRouter();
  // const { user } = useUser();
  const [user, setUser] = useState(null); // Track authenticated user
  // const fileInputRef = useRef(null);



  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user if authenticated, otherwise null
    });

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, []);

  const handleButtonClick = (path) => {
    if (!user) {
      router.push('/sign-in'); // Redirect to sign-up page if user is not authenticated
    } else {
      router.push(path); // Otherwise, proceed with the original path
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#0f172a',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}
    >
      <Container maxWidth="lg">
        {/* Main Header Text */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '4.5rem' }, // Adjust font size for responsiveness
              textAlign: 'center'
            }}
          >
            Create {' '}
            <Typography
              variant="h3"
              component="span"
              sx={{
                fontWeight: 'bold',
                color: 'rgb(37, 121, 211)',
                fontSize: { xs: '2rem', md: '4.5rem' }
              }}
            >
              Flashcards
            </Typography> {' '}
            <br />
            in seconds 
          </Typography>
        </Box>

        {/* Subheader Text */}
        <Box sx={{ maxWidth: '600px', mx: 'auto' }}> {/* Control the width of the subheader */}
          <Typography
            variant="h7"
            sx={{
              textAlign: 'center',
              fontSize: { xs: 'sm', md: 'md' },
              fontStyle: 'italic',
              lineHeight: { xs: '1rem', md: '2rem' } // Smaller size for the subheader
            }}
          >
            Try it out!
          </Typography>
        </Box>

        {/* Buttons Container */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            gap: 2 // Add space between the buttons
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: 'rgb(37, 121, 211)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgb(37, 121, 211)',
              },
            }}
            onClick={() => handleButtonClick('/generate')}
          >
            Try AI Generate 🪄
          </Button>
          
           {/* ✅ Redirect to PDF Upload Page */}
          {/* <Button
            variant="contained"
            sx={{
              bgcolor: 'rgb(18, 90, 190)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgb(16, 70, 160)',
              },
            }}
            onClick={() => handleButtonClick('/pdf-upload')} // Redirect to new page
          >
      
          </Button> */}
          {/* <Button
            variant="contained"
            sx={{
              bgcolor: 'rgb(18, 90, 190)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgb(16, 70, 160)',
              },
            }}
            onClick={() => handleButtonClick('/flashcards/generate')} // Redirect to PDF Upload Page
          >
            Generate Flashcards from PDF 📚
          </Button> */}
          
          <Button
            variant="outlined"
            sx={{
              color: 'rgb(37, 121, 211)',
              borderColor: 'rrgb(37, 121, 211)',
              '&:hover': {
                bgcolor: 'rgb(13, 18, 24)',
                borderColor: 'rgb(37, 121, 211)',
              },
            }}
            onClick={() => handleButtonClick('/manual/flashcards')}
          >
            Create Flashcards Manually
          </Button>
        </Box>
      </Container>

    </Box>
  );
};

export default HeroSection;
