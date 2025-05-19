import React from 'react';
import {
  Box,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Card,
  CardContent,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  Paper,
  Divider,
  Grid,
} from '@mui/material';
import {
  ExpandMore,
  QuestionAnswer,
  ContactSupport,
  Dashboard,
  Search,
  Email,
  Person,
  Description,
  Phone,
  Home,
} from '@mui/icons-material';
import { DashboardContent } from 'src/layouts/dashboard';

const faqData = [
  {
    question: 'How do I submit a new feedback or complaint?',
    answer:
      'Sign in and click "Submit Feedback" on your dashboard. Fill in the details and submit the form.',
  },
  {
    question: 'How can I track the status of my submitted request?',
    answer: 'Use the ticket ID you received after submission in the "Track Your Request" section.',
  },
  {
    question: 'Who can access the information I submit?',
    answer: 'Only relevant government departments have access, per our privacy policy.',
  },
  {
    question: 'What is the typical response time?',
    answer: 'Most requests are acknowledged in 24–48 hours. Resolution varies by issue.',
  },
  {
    question: 'Can I update my submission?',
    answer: 'Yes. Go to "My Submissions" in your account and select your ticket to update it.',
  },
];

const contactDetails = [
  {
    label: 'Email',
    value: 'support@engage.gov',
    icon: <Email color="primary" />,
  },
  {
    label: 'Phone',
    value: '+1 (800) 123-4567',
    icon: <Phone color="primary" />,
  },
  {
    label: 'Office',
    value: '123 Government Plaza\nSuite 500\nWashington, DC 20001',
    icon: <Home color="primary" />,
  },
];

export default function LandingPageView() {
  return (
    <DashboardContent maxWidth="xl">
      {/* App Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
          >
            <Dashboard sx={{ mr: 1 }} /> ENGAGE
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" href="#intro" startIcon={<Home />}>
              Home
            </Button>
            <Button color="inherit" href="#faqs" startIcon={<QuestionAnswer />}>
              FAQs
            </Button>
            <Button color="inherit" href="#contact" startIcon={<ContactSupport />}>
              Contact
            </Button>
            <Button variant="contained" color="primary" href="/sign-in">
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Introduction */}
      <Box
        id="intro"
        sx={{ py: 10, background: 'linear-gradient(to bottom right, #f5f7fa, #e4e8ef)' }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Your Voice Matters
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Connect with your government, share feedback, and track resolution of your concerns
                through our unified platform.
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" color="primary" size="large">
                  Submit Feedback
                </Button>
                <Button variant="outlined" size="large">
                  Learn More
                </Button>
              </Box>
              <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Track Your Request Status
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your ticket ID"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                  Track Status
                </Button>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="img"
                src="/api/placeholder/600/400"
                alt="Engage Platform"
                sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQs */}
      <Box id="faqs" sx={{ py: 10, backgroundColor: '#fff' }}>
        <Container>
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Get answers to common questions about using the Engage platform
          </Typography>
          <Box mt={4}>
            {faqData.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Contact */}
      <Box id="contact" sx={{ py: 10, backgroundColor: '#f5f5f5' }}>
        <Container>
          <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            We're here to help with any questions or concerns
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" gutterBottom>
                Send us a message
              </Typography>
              {['Full Name', 'Email Address', 'Phone Number', 'Subject', 'Message'].map(
                (label, i) => (
                  <TextField
                    key={i}
                    fullWidth
                    label={label}
                    variant="outlined"
                    margin="normal"
                    multiline={label === 'Message'}
                    rows={label === 'Message' ? 4 : undefined}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {label === 'Full Name' && <Person />}
                          {label === 'Email Address' && <Email />}
                          {label === 'Phone Number' && <Phone />}
                          {label === 'Subject' && <Description />}
                        </InputAdornment>
                      ),
                    }}
                  />
                )
              )}
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Send Message
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Contact Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  {contactDetails.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {item.icon}
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.label}
                        </Typography>
                        <Typography variant="body2" whiteSpace="pre-line">
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Office Hours
                  </Typography>
                  <Typography variant="body2">
                    Monday - Friday: 9:00 AM - 5:00 PM
                    <br />
                    Saturday - Sunday: Closed
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3, backgroundColor: '#1976d2', color: 'white' }}>
        <Container>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Engage | Connecting Citizens with Government
          </Typography>
        </Container>
      </Box>
    </DashboardContent>
  );
}
