import { Box, Button, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Landing - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
      />
      <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />

<Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h2'>Landing page</Typography>
        
      </Box>

        <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        style={{ backgroundColor: '#00A0D6' , marginTop: '20px'}}
 
        
      >
        <a href="/sign-in">
        Sign in
        </a>
      </Button>
    </>
  );
}
