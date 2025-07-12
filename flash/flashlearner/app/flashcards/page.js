'use client';

import { useState, useEffect } from 'react';
import { auth } from '../../firebase'; // Ensure this path is correct
import { onAuthStateChanged } from 'firebase/auth';
import { Container, Typography, Box } from '@mui/material';
import FlashcardDisplay from '../../components/FlashcardDisplay';

export default function Flashcards() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    if (loading) {
        return <></>; // You can replace this with a loading spinner
    }

    if (!user) {
        return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
            Please sign in to view your flashcards.
        </Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                    These Are Your Created Flashcard Sets
                </Typography>
            </Box>
            <FlashcardDisplay user={user} />
        </Container>
    );
}

// 'use client';

// import { useUser } from '@clerk/nextjs';
// import { Container, Typography, Box } from '@mui/material';
// import FlashcardDisplay from '../../components/FlashcardDisplay';

// export default function Flashcards() {
//     const { isLoaded, isSignedIn, user } = useUser();

//     if (!isLoaded || !isSignedIn) {
//         return <></>;
//     }

//     return (
//         <Container maxWidth="md" sx={{ mt: 4 }}>
//             <Box sx={{ textAlign: 'center', mb: 4 }}>
//                 <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
//                     These Are Your Created Flashcard Sets
//                 </Typography>
//             </Box>
//             <FlashcardDisplay user={user} />
//         </Container>
//     );
// }
