import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Component to display a 404 Not Found page
export default function NotFoundPage() {
  const navigate = useNavigate(); // Hook to navigate to other routes

  return (
    <Box
      sx={{
        // Center the content vertically and horizontally
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 2,
      }}
    >
      {/* Display the 404 error code */}
      <Typography variant="h1" color="error" gutterBottom sx={{ fontSize: { xs: '3rem', sm: '6rem' } }}>
        404
      </Typography>

      {/* Display the "Page Not Found" message */}
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>

      {/* Additional message about the missing page */}
      <Typography variant="body1" color="textSecondary" gutterBottom>
        The page you are looking for does not exist or has been moved.
      </Typography>

      {/* Button to navigate back to the home page */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mt: 2 }}
      >
        Go to Home
      </Button>
    </Box>
  );
}