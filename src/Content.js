import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LikedSubmissionList from './LikedSubmissionList';
import {fetchLikedFormSubmissions} from './service/mockServer';
import Toast from './Toast';

const maxFetchAttempts = 3;

export default function Content() {

  const [likedFormSubmissions, setLikedFormSubmissions] = useState([]);

  const [fetchAttempts, setFetchAttempts] = useState(1);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      fetchLikedFormSubmissions().then(response => {
          console.log('response: ', response);
          setLikedFormSubmissions(response.formSubmissions);
          setIsLoading(false);
      }).catch(error => {
          console.error('error: ', error);
          if (fetchAttempts < maxFetchAttempts) {
            setFetchAttempts(fetchAttempts + 1);
          } else {
            setFetchFailed(true);
            setIsLoading(false);
          }
      });
  }, [fetchAttempts]);

  const addSubmissiontoList = (submission) => {
      setLikedFormSubmissions([...likedFormSubmissions, submission]);
  }

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <LikedSubmissionList likedFormSubmissions={likedFormSubmissions} isLoading={isLoading} fetchFailed={fetchFailed} />
      <Toast addSubmissiontoList={addSubmissiontoList} />
    </Box>
  );
}
