'use client';

import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import HeroSection from '@/components/HeroSection';
import FlashcardDisplay from '@/components/FlashcardDisplay';
import Footer from '@/components/Footer';
import { Container, Typography, Box, Button } from "@mui/material";
import Head from "next/head";
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '@/firebase'; // Make sure you import your Firebase app initialization file

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth(app); // Make sure you use the correct Firebase app instance
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);


    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Head>
                <title>FlashLearner</title>
                <meta name="description" content="Create FlashCards from your text" />
            </Head>
            <Navbar />``
            <Box sx={{ flexGrow: 1,
        bgcolor: '#0f172a',  }}>
                
                <HeroSection />
                {/* <Features /> */}
                {/* Conditionally render the flashcard section only if the user is logged in */}
                {user && (
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
                            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 , color: 'white'}}>
                                Your Flashcard Sets
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white', mb: 4 }}>
                                Here are the flashcard sets you have created. Click on a card to view details.
                            </Typography>
                        </Box>
                        {/* Conditionally render FlashcardDisplay if user exists */}
                        <FlashcardDisplay user={user} />
                    </Box>
                )}
                <Features />
            </Box>
            {/* <Footer /> */}
            {/* Decorative Background Elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50vw',
                    height: '50vh',
                    borderRadius: '20%',
                    background: 'linear-gradient(to top, black, rgb(190, 18, 60))',
                    boxShadow: 3,
                    zIndex: 0,
                    filter: 'blur(70px)',
                    opacity: 0.1,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '50vw', 
                    height: '50vh',
                    borderRadius: '20%',
                    background: 'linear-gradient(to top, black, rgb(190, 18, 60))',
                    boxShadow: 3,
                    zIndex: -1,
                    filter: 'blur(70px)',
                    opacity: 0.1,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '50vw', 
                    height: '50vh',
                    borderRadius: '20%',
                    background: 'linear-gradient(to top, black, rgb(190, 18, 60))',
                    boxShadow: 3,
                    zIndex: 0,
                    filter: 'blur(70px)',
                    opacity: 0.1,
                }}
            />
        </Box>
    );
}

// 'use client';

// import { Box, Container, Typography } from '@mui/material';
// import Navbar from '@/components/Navbar';
// import FlashcardDisplay from '@/components/FlashcardDisplay';
// import { useUser } from '@clerk/nextjs';

// export default function Dashboard() {
//     const { user } = useUser();

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4 }}>
//             <Navbar />
//             <Box sx={{ textAlign: 'center', mt: 4 }}>
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     Welcome, {user?.firstName || 'User'}!
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 4 }}>
//                     Start generating and reviewing your flashcards.
//                 </Typography>

//                 {/* Render Flashcard Display */}
//                 <FlashcardDisplay user={user} />
//             </Box>
//         </Container>
//     );
// }
