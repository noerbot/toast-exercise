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
  const {handleLike, handleClose, open, message} = props;

  const action = (
    <React.Fragment>
      <Button color="primary" size="large" onClick={handleLike}>
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
        message={message}
        style={{ whiteSpace: 'pre-wrap' }} 
        action={action}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        TransitionComponent={SlideTransition}
      />
    </div>
  );
}