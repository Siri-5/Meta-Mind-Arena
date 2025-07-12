'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/components/styles.css';

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
  Paper
} from '@mui/material';
import { collection, doc, writeBatch, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function FlashcardsManual() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true); 
  const [flashcards, setFlashcards] = useState([{ front: '', back: '' }]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFlashcardChange = (index, field, value) => {
    const newFlashcards = [...flashcards];
    newFlashcards[index][field] = value;
    setFlashcards(newFlashcards);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { front: '', back: '' }]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveFlashcards = async () => {
    if (!user) {
      alert('You need to be logged in to save flashcards.');
      return;
    }
    if (!name) {
      alert('Please enter a name for your flashcard set.');
      return;
    }

    // if (loading) {
    //   return (
    //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //       <CircularProgress color="primary" />
    //     </Box>
    //   );
    // }
    const batch = writeBatch(db);
    const userDocRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert('You already have a collection with this name. Please choose a different name.');
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push('/flashcards');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'transparent',
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
            Manual Flashcards
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey', mb: 4, mt: 4 }}>
            Create your own flashcards by entering the front and back text for each card.
          </Typography>

          {flashcards.map((flashcard, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <TextField
                value={flashcard.front}
                onChange={(e) => handleFlashcardChange(index, 'front', e.target.value)}
                label={`Front ${index + 1}`}
                fullWidth
                variant="outlined"
                sx={{
                  mb: 1,
                  backgroundColor: '#fff',
                  borderRadius: 2,
                }}
              />
              <TextField
                value={flashcard.back}
                onChange={(e) => handleFlashcardChange(index, 'back', e.target.value)}
                label={`Back ${index + 1}`}
                fullWidth
                variant="outlined"
                sx={{
                  mb: 2,
                  backgroundColor: '#fff',
                  borderRadius: 2,
                }}
              />
            </Box>
          ))}

          <Button
            variant="contained"
            sx={{
              backgroundColor: 'rgb(37, 121, 211)',
              color: '#fff',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgb(11, 62, 117)',
                color: 'white',
              },
              mt: 2,
              mb: 2,
            }}
            onClick={addFlashcard}
            fullWidth
          >
            Add Flashcard
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'grey',
              },
            }}
            onClick={handleOpen}
            fullWidth
          >
            Save Flashcards
          </Button>
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter a name for your flashcard set.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Collection Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}


// 'use client';

// // import { useUser } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import '@/components/styles.css';

// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Grid,
//   Paper
// } from '@mui/material';
// import { collection, doc, writeBatch, getDoc } from 'firebase/firestore';
// import { db } from '../../../firebase';

// export default function FlashcardsManual() {
//   const router = useRouter();
//   const { user } = useUser();
//   const [name, setName] = useState('');
//   const [flashcards, setFlashcards] = useState([{ front: '', back: '' }]);
//   const [open, setOpen] = useState(false);

//   const handleFlashcardChange = (index, field, value) => {
//     const newFlashcards = [...flashcards];
//     newFlashcards[index][field] = value;
//     setFlashcards(newFlashcards);
//   };

//   const addFlashcard = () => {
//     setFlashcards([...flashcards, { front: '', back: '' }]);
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const saveFlashcards = async () => {
//     if (!name) {
//       alert('Please enter a name for your flashcard set.');
//       return;
//     }
//     const batch = writeBatch(db);
//     const userDocRef = doc(collection(db, 'users'), user.id);
//     const docSnap = await getDoc(userDocRef);
//     if (docSnap.exists()) {
//       const collections = docSnap.data().flashcards || [];
//       if (collections.find((f) => f.name === name)) {
//         alert('You already have a collection with this name. Please choose a different name.');
//         return;
//       } else {
//         collections.push({ name });
//         batch.set(userDocRef, { flashcards: collections }, { merge: true });
//       }
//     } else {
//       batch.set(userDocRef, { flashcards: [{ name }] });
//     }

//     const colRef = collection(userDocRef, name);
//     flashcards.forEach((flashcard) => {
//       const cardDocRef = doc(colRef);
//       batch.set(cardDocRef, flashcard);
//     });

//     await batch.commit();
//     handleClose();
//     router.push('/flashcards');
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           backgroundColor: 'transparent',
//           padding: 4,
//           borderRadius: 3,
//         }}
//       >
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 4,
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             borderRadius: 2,
//             width: '100%',
//             maxWidth: '400px',
//             textAlign: 'center',
//           }}
//         >
//           <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
//             Manual Flashcards
//           </Typography>
//           <Typography variant="body1" sx={{ color: 'grey', mb: 4, mt: 4 }}>
//             Create your own flashcards by entering the front and back text for each card.
//           </Typography>

//           {flashcards.map((flashcard, index) => (
//             <Box key={index} sx={{ mb: 2 }}>
//               <TextField
//                 value={flashcard.front}
//                 onChange={(e) => handleFlashcardChange(index, 'front', e.target.value)}
//                 label={`Front ${index + 1}`}
//                 fullWidth
//                 variant="outlined"
//                 sx={{
//                   mb: 1,
//                   backgroundColor: '#fff',
//                   borderRadius: 2,
//                 }}
//               />
//               <TextField
//                 value={flashcard.back}
//                 onChange={(e) => handleFlashcardChange(index, 'back', e.target.value)}
//                 label={`Back ${index + 1}`}
//                 fullWidth
//                 variant="outlined"
//                 sx={{
//                   mb: 2,
//                   backgroundColor: '#fff',
//                   borderRadius: 2,
//                 }}
//               />
//             </Box>
//           ))}

//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: 'rgb(37, 121, 211)',
//               color: '#fff',
//               fontWeight: 600,
//               '&:hover': {
//                 backgroundColor: 'rgb(11, 62, 117)',
//                 color: 'white',
//                 cursor: 'url(/assets/cc2.png), auto',
//               },
//               mt: 2,
//               mb: 2,
//             }}
//             onClick={addFlashcard}
//             fullWidth
//           >
//             Add Flashcard
//           </Button>

//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: 'white',
//               color: 'black',
//               fontWeight: 600,
//               '&:hover': {
//                 backgroundColor: 'grey',
//               },
//             }}
//             onClick={handleOpen}
//             fullWidth
//           >
//             Save Flashcards
//           </Button>
//         </Paper>
//       </Box>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Save Flashcard Set</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Please enter a name for your flashcard set.</DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Collection Name"
//             type="text"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             variant="outlined"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={saveFlashcards} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }
