import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LikedSubmissionList from './LikedSubmissionList';
import {fetchLikedFormSubmissions} from './service/mockServer';
import Toast from './Toast';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { onMessage, saveLikedFormSubmission } from './service/mockServer';

export default function Content() {

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery('submissions', fetchLikedFormSubmissions);

  const [open, setOpen] = React.useState(false);
  const [newSubmission, setNewSubmission] = useState({});
  useEffect(() => {
    onMessage((formSubmission) => {
        console.log('message received: ', formSubmission);
        setNewSubmission(formSubmission);
        setOpen(true);
        // TODO: better handling when "Add Submission" is clicked in rapid succession
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLike = () => {
    addSubmissionMutation.mutate(newSubmission);
    // TODO: add retry logic for when saving a form submission fails
  }

  const addSubmissionMutation = useMutation(
    newSubmission => saveLikedFormSubmission(newSubmission),
    {
      // Optimistically update the cache value on mutate, but store
      // the old value and return it so that it's accessible in case of
      // an error
      onMutate: async newSubmission => {
        await queryClient.cancelQueries('submissions');

        const previousValue = queryClient.getQueryData('submissions');

        queryClient.setQueryData('submissions', old => ({
          ...old,
          formSubmissions: [...old.formSubmissions, newSubmission],
        }));

        return previousValue;
      },
      // On success, close the toast and reset the newSubmission state
      onSuccess: (data, variables, context) => {
        setOpen(false);
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
        alert("Error saving submission: " + err.message + "\nPlease try again.");
        queryClient.setQueryData('submissions', previousValue);
      },
      // After success or failure, refetch the query
      onSettled: () => {
        queryClient.invalidateQueries('submissions');
      },
    }
  );

  const removeSubmission = (submissionId) => {
    console.log('removeSubmission', submissionId);
    // Remove the submission from local storage
    const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const updatedSubmissions = [...submissions.filter(submission => submission.id !== submissionId)];
    localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions),);
    // Remove the submission from the list on the page
    queryClient.setQueryData('submissions', old => ({
      ...old,
      formSubmissions: [...old.formSubmissions.filter(submission => submission.id !== submissionId)],
    }));
  };

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <LikedSubmissionList likedFormSubmissions={data?.formSubmissions} isLoading={isLoading} fetchFailed={isError} removeSubmission={removeSubmission} />
      <Toast handleLike={handleLike} handleClose={handleClose} open={open} newSubmission={newSubmission} />
    </Box>
  );
}
