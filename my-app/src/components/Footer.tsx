import React from 'react';
import { Typography, Link, Box, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

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
          </Link>{" "}
          |{" "}
          <IconButton
            aria-label="GitHub"
            color="inherit"
            href="https://github.com/cam207/Front-end-task"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
