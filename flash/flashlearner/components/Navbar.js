"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Button, Box, Typography, Avatar } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase"; // Ensure this is correctly imported

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null); // Store user data from Firebase

  // Fetch user details from Firebase when signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data()); // Store user details from Firestore
        } else {
          setUser({ email: currentUser.email }); // Fallback if Firestore doc is missing
        }
      } else {
        setUser(null); // No user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <AppBar position="static" sx={{ bgcolor: "#0f172a", color: "white", px: 4 }}>
      <Toolbar sx={{ display: "flex", alignItems: "center", height: 64 }}>
        {/* Logo */}
        <Box onClick={() => router.push("/")} sx={{ cursor: "pointer" }}>
          {/* <Image src="/logo.svg" alt="Logo" width={200} height={100} priority /> */}
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        {/* Show buttons when user is not logged in */}
        {!user ? (
          <>
            <Button
              variant="outlined"
              sx={{
                borderColor: "grey",
                color: "white",
                mx: 2,
                "&:hover": { backgroundColor: "rgb(160, 16, 50)", borderColor: "grey" },
              }}
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(190, 18, 60)",
                color: "white",
                "&:hover": { backgroundColor: "rgb(160, 16, 50)" },
              }}
              onClick={() => router.push("/sign-in")}
            >
              Log In
            </Button>
          </>
        ) : (
          // Show user details when logged in
          <Box display="flex" alignItems="center">
            <Typography sx={{ mr: 2 }}>Hello, {user.name || user.email}</Typography>
            <Avatar src={user.photoURL || ""} alt={user.name || "User"} />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(190, 18, 60)",
                color: "white",
                ml: 2,
                "&:hover": { backgroundColor: "rgb(160, 16, 50)" },
              }}
              onClick={() => {
                signOut(auth);
                router.push("/");
              }}
            >
              Log Out
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

// 'use client';
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { AppBar, Toolbar, Button, Box } from "@mui/material";
// import Image from "next/image";

// export default function Navbar() {
//   const router = useRouter();

//   return (
//     <AppBar position="static" sx={{ bgcolor: '#0f172a', color: 'white', px: 4 }}>
//       <Toolbar sx={{ display: 'flex', alignItems: 'center', height: 64, bgcolor: '#0f172a',}}>
//         {/* Logo */}
//         <Box onClick={() => router.push('/')} sx={{ cursor: 'pointer', bgcolor: '#0f172a',}}>
//           {/* <Image
//             src="/logo.svg"
//             alt="Logo"
//             width={200}
//             height={100}
//             priority
//           /> */}
//         </Box>
//         <Box sx={{ flexGrow: 1 }} />

//         {/* Sign Up and Log In Buttons */}
//         <SignedOut>
//           <Button
//             variant="outlined"
//             sx={{
//               borderColor: 'grey',
//               color: 'white',
//               mx: 2,
//               '&:hover': {
//                 backgroundColor: 'rgb(160, 16, 50)',
//                 borderColor: 'grey',
//               },
//             }}
//             onClick={() => router.push('/sign-up')}
//           >
//             Sign Up
//           </Button>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: 'rgb(190, 18, 60)',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: 'rgb(160, 16, 50)',
//               },
//             }}
//             onClick={() => router.push('/sign-in')}
//           >
//             Log In
//           </Button>
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//       </Toolbar>
//     </AppBar>
//   );
// }
