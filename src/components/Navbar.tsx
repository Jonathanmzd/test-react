import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
            <Button color="inherit" component={RouterLink} to="/" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              Users
            </Button>
            <IconButton
              color="inherit"
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
