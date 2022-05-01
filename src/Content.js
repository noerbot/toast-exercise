import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toast from './Toast';
import LikedSubmissionList from './LikedSubmissionList';

export default function Content() {
  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <LikedSubmissionList />
      <Toast />
    </Box>
  );
}
