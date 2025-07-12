'use client'

// import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs  } from 'firebase/firestore';
import { db } from '../../firebase';

// import { useState, useEffect } from "react";
import { auth } from "../../firebase"; // Ensure this path is correct
import { onAuthStateChanged } from "firebase/auth";
import { useSearchParams } from 'next/navigation';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Paper,
  } from '@mui/material';

export default function Flashcard() {
    // const { isLoaded, isSignedIn, user } = useUser();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});

    const searchParams = useSearchParams();
    const search =searchParams.get('id');
    
        // Listen to authentication state
        useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
              setUser(currentUser);
              setLoading(false);
          });
  
          return () => unsubscribe(); // Cleanup on unmount
      }, []);
  
      // Fetch flashcards
      useEffect(() => {
          async function getFlashCard() {
              if (!user || !search) return;
              
              try {
                  const colRef = collection(db, 'users', user.uid, search);
                  const docsSnap = await getDocs(colRef);
                  const flashcards = [];
  
                  docsSnap.forEach((doc) => {
                      flashcards.push({ id: doc.id, ...doc.data() });
                  });
  
                  setFlashcards(flashcards);
                  console.log(flashcards);
              } catch (error) {
                  console.error('Error fetching flashcards:', error);
              }
          }
  
          getFlashCard();
      }, [user, search]);
  
      // Flip card handler
      const handleCardClick = (id) => {
          setFlipped((prev) => ({
              ...prev,
              [id]: !prev[id],
          }));
      };
  
      if (loading) {
          return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Loading...</Typography>;
      }
  
      if (!user) {
          return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Please sign in to view this flashcard.</Typography>;
      }
    // useEffect(() => {
    //     async function getFlashCard() {
    //         if (!user || !search) return;
    //         const colRef = collection(doc(collection(db, 'users'), user.id),search);
    //         const docs = await getDocs(colRef);
    //         const flashcards = [];

    //         docs.forEach((doc) => {
    //             flashcards.push({id: doc.id, ...doc.data()});
    //         });
    //         setFlashcards(flashcards);
    //         console.log(flashcards);
    //     }
    //     getFlashCard();
    // }, [user,search]);

    // const handleCardClick = (id) => {
    //     setFlipped((prev) => ({
    //       ...prev,
    //       [id]: !prev[id],
    //     }));
    //   };

    // if (!isLoaded || !isSignedIn) {
    //     return <></>;
    // }

    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Your Flashcard Sets
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardActionArea onClick={() => handleCardClick(index)}>
                  <CardContent>
                    <Box
                      sx={{
                        perspective: '1000px',
                        '& > div': {
                          transition: 'transform 0.6s',
                          transformStyle: 'preserve-3d',
                          position: 'relative',
                          width: '100%',
                          height: '200px',
                          borderRadius: 2,
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                          transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        },
                        '& > div > div': {
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 3,
                          boxSizing: 'border-box',
                          borderRadius: 2,
                        },
                        '& > div > div:nth-of-type(2)': {
                          transform: 'rotateY(180deg)',
                        },
                      }}
                    >
                      <div>
                        <div
                          style={{
                            backgroundColor: 'rgb(37, 121, 211)',
                            color: 'white',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="h6" component="div"  sx={{ fontSize: '18px' }} >
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div
                          style={{
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '12px',
                            display: 'flex',
                            fontSize: '2px',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="h6" component="div"  sx={{ fontSize: '18px', padding: '10px' }}>
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
    



}