import {
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  QuestionAnswer,
  ContactSupport,
  Home,
} from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import { Logo } from '../logo';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
    return (
      <AppBar position="static" color="default" elevation={1} sx={{ zIndex: 1 ,backgroundColor: 'rgba(255, 255, 255, 0.1)', }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() =>Navigate({to: '/'})}
          >
            <Logo/>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" href="/#intro" startIcon={<Home />}>
              Home
            </Button>
            <Button color="inherit" href="/#faqs" startIcon={<QuestionAnswer />}>
              FAQs
            </Button>
            <Button color="inherit" href="/#contact" startIcon={<ContactSupport />}>
              Contact
            </Button>
            <Button variant="contained" color="primary" component={RouterLink}
             to="/sign-in">
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
};
