import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { onMessage, saveLikedFormSubmission } from './service/mockServer';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function Toast() {
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

  const handleLike = (event) => {
    console.log('liked', event);
    saveLikedFormSubmission(newSubmission);
    // TODO: add retry logic for when saving a form submission fails
    setNewSubmission({}); // clear the new submission state
    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleLike}>
        LIKE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        message={newSubmission.data?.firstName + ' ' + newSubmission.data?.lastName + '\n' + newSubmission.data?.email}
        style={{ whiteSpace: 'pre-wrap' }} 
        action={action}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        TransitionComponent={SlideTransition}
      />
    </div>
  );
}