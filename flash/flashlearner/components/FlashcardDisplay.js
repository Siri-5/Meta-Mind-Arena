import { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/navigation';
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';

export default function FlashcardDisplay({ user }) {
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashCards() {
            if (!user) return;
            const docRef = doc(collection(db, 'users'), user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }
        }
        getFlashCards();
    }, [user]);

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    };

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 5, mb: 5 }}>
            <Grid container spacing={3} justifyContent="center">
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                borderRadius: 4, // Increased border radius
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', // Enhanced shadow
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)', // Move up on hover
                                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
                                },
                                maxWidth: 320,
                                mx: 'auto',
                                backgroundColor: '#1e293b',
                                border: '2px solid #00a2ff',
                            }}
                        >
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                {/* GIF/MP4 Animation */}
                                {/* <Box
                                    component="img"
                                    src="/assets/ani1.gif" // Path to GIF/MP4
                                    alt="Flashcard Animation"
                                    sx={{
                                        width: '100%',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                    }}
                                /> */}
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '120px',
                                        backgroundColor: '#f8fafc',
                                        p: 2,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: '#00a2ff',
                                            fontWeight: 'bold',
                                            fontFamily: 'Arial, sans-serif',
                                            mb: 1,
                                        }}
                                    >
                                        {flashcard.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#4b5563',
                                            textAlign: 'center',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Click to explore this flashcard
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}