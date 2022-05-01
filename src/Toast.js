import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function Toast(props) {
  const {handleLike, handleClose, open, newSubmission} = props;

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
        message={newSubmission.data?.firstName + ' ' + newSubmission.data?.lastName + '\n' + newSubmission.data?.email}
        style={{ whiteSpace: 'pre-wrap' }} 
        action={action}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        TransitionComponent={SlideTransition}
      />
    </div>
  );
}