import { Box, Typography, Container, Grid, Link } from '@mui/material';
import Image from 'next/image';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'black',
        color: 'white',
        py: { xs: 4, md: 6 }, 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Image src="/logo.svg" alt="FlashCard Saas Logo" width={150} height={45} />
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                maxWidth: '300px', 
                fontSize: { xs: '0.875rem', md: '1rem' } 
              }}
            >
              Your go-to platform for creating, managing, and studying flashcards. Learn faster, smarter, and better.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2, 
                fontSize: { xs: '1rem', md: '1.25rem' } 
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/generate" color="inherit" underline="hover" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                Generate Flashcards
              </Link>
              <Link href="/" color="inherit" underline="hover" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                About Us
              </Link>
              <Link href="/" color="inherit" underline="hover" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 2, 
                fontSize: { xs: '1rem', md: '1.25rem' } 
              }}
            >
              Contact Us
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: { xs: '0.875rem', md: '1rem' } 
              }}
            >
              Email: mitali.dixit04@gmail.com
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: { xs: '0.875rem', md: '1rem' } 
              }}
            >
              Phone: +1 (123) 456-7890
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: { xs: '0.75rem', md: '0.875rem' } 
            }}
          >
            &copy; {new Date().getFullYear()} FlashLearner. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
