import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            User Management
          </Typography>
          <div>
            <Button color="inherit" component={RouterLink} to="/">
              Users
            </Button>
            {/* <Button color="inherit" component={RouterLink} to="/limits">
              Limits
            </Button> */}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
