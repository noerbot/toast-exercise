import "regenerator-runtime/runtime";
import React from 'react';
import App from './App.js'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

test('When you click "New Submission" your app must respond and show a toast' , async () => {
  // render the application
  render(<App/>);

  // grab the "New Submission" button
  const button = screen.getByText('New Submission');

  // simulate user interaction with userEvent
  userEvent.click(button);

  // grab elements that will asynchronously appear
  const toast = await screen.findByText('LIKE');
  // use special jest-dom matchers like .toBeInTheDocument()
  expect(toast).toBeInTheDocument();
});