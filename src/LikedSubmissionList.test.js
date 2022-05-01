import "regenerator-runtime/runtime";
import React from 'react';
import App from './App.js'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

test('Toasts that are "liked" are added to the list on the page' , async () => {

  // render the application
  render(<App/>);

  // grab the "New Submission" button
  const button = screen.getByText('New Submission');

  // simulate user interaction with userEvent
  userEvent.click(button);

  // grab elements that will asynchronously appear
  const toastLikeButton = await screen.findByText('LIKE');
  const submissionFullName = document.getElementsByClassName('MuiSnackbarContent-message')[0].textContent.split('\n')[0];
  // simulate user clicking the "like" button
  await waitFor(() => {
    const emptyListMessage = screen.queryByText('Submissions you like will appear here.');
    expect(emptyListMessage).toBeInTheDocument();
  }, {timeout: 3000});
  userEvent.click(toastLikeButton);
  // grab the newly added list entry
  await waitFor(() => {
    const listEntry = screen.queryByText(submissionFullName);
    // use special jest-dom matchers like .toBeInTheDocument()
    expect(listEntry).toBeInTheDocument();
  }, {timeout: 2000});
  
});