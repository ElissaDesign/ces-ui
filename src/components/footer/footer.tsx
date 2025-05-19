import { Box, Container, Typography } from "@mui/material"

export default function Footer() {
    return (
      <Box sx={{ py: 3, backgroundColor: '#1976d2', color: 'white' }}>
        <Container>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Engage | Connecting Citizens with Government
          </Typography>
        </Container>
      </Box>
    )
    
};
