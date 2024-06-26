import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer>
      <Box textAlign="center" py={2} bgcolor="#f1f1f1">
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Charbel
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <Link href="/privacy-policy" color="inherit">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms-of-service" color="inherit">
            Terms of Service
          </Link>{" "}
          |{" "}
          <Link href="/contact" color="inherit">
            Contact Us
          </Link>
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
