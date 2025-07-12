import { useState } from 'react';
import { extractTextFromPDF, generateFlashcardsFromTextGorq } from '../utils/upload';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

export default function UploadFlashcard({ user }) {
    const [loading, setLoading] = useState(false);
    const [flashcards, setFlashcards] = useState([]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            let extractedText = '';

            // Check if file is PDF
            if (file.type === 'application/pdf') {
                extractedText = await extractTextFromPDF(file);
            } else {
                console.error('Invalid file type. Please upload a PDF.');
                setLoading(false);
                return;
            }

            // Generate flashcards using Gorq API
            const generatedFlashcards = await generateFlashcardsFromTextGorq(extractedText);

            if (generatedFlashcards.length > 0) {
                await saveFlashcardsToFirestore(generatedFlashcards);
                setFlashcards(generatedFlashcards);
            }
        } catch (error) {
            console.error('Error uploading or generating flashcards:', error);
        }
        setLoading(false);
    };

    const saveFlashcardsToFirestore = async (cards) => {
        if (!user) return;

        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, {
            flashcards: cards,
        });
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
            />
            <label htmlFor="file-upload">
                <Button variant="contained" component="span" sx={{ mb: 3 }}>
                    Upload PDF to Generate Flashcards
                </Button>
            </label>

            {loading && <CircularProgress sx={{ mt: 2 }} />}
            {!loading && flashcards.length > 0 && (
                <Typography variant="h6" sx={{ mt: 2, color: '#28a745' }}>
                    Flashcards generated successfully! 🎉
                </Typography>
            )}
        </Box>
    );
}
