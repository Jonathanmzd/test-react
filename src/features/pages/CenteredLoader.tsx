import { Box, CircularProgress } from '@mui/material';

// Component to display a centered loading spinner
export default function CenteredLoader() {
   return (
      <Box
         // Center the loader both vertically and horizontally
         display="flex"
         justifyContent="center"
         alignItems="center"
         position="fixed"
         top={0}
         left={0}
         width="100vw"
         height="100vh"
         zIndex={9999}
         bgcolor="rgba(255,255,255,0.6)" 
      >
         {/* Material-UI CircularProgress component for the spinner */}
         <CircularProgress />
      </Box>
   );
}
