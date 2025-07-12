import { Box, Grid, Typography } from "@mui/material";
import "./features.css";

export default function Features() {
  return (
    <Box className="features-container" sx={{
      bgcolor: '#0f172a',}}>
      <Typography variant="h4" component="h2" gutterBottom className="features-title">
        Features
        <img
        src="/assets/ani1.gif"
        alt="Battle Animation"
        className="feature-gif"
      />
      </Typography>
      
      <Box>
      <Grid container spacing={4} justifyContent="center" padding={6} sx={{
        bgcolor: '#0f172a',}}>
        {[
          {
            title: "Easy Text Input",
            description:
              "Simply input your text and we will generate flashcards for you. Creating flashcards has never been easier.",
          },
          {
            title: "Customizable Options",
            description:
              "Tailor your flashcards with customizable questions and answers to suit your learning needs.",
          },
          {
            title: "Accessible Anywhere",
            description:
              "Access your flashcards on any device and continue your learning wherever you are.",
          },
        ].map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
            <Box className="feature-card">
              <Box sx={{ display: "flex", alignItems: "center", mb: 2, paddingLeft: 2 }}>
                <img src="icon.png" alt="icon" className="feature-icon" />
              </Box>
              <Box sx={{ mb: 2, paddingLeft: 2 }}>
                <Typography variant="h6" gutterBottom className="feature-title">
                  {feature.title}
                </Typography>
              </Box>
              <Typography className="feature-description">{feature.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      </Box>
    </Box>
  );
}
