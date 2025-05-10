   import { Box, CircularProgress } from '@mui/material';

   export default function CenteredLoader() {
   return (
      <Box
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
         <CircularProgress />
      </Box>
   );
   }
