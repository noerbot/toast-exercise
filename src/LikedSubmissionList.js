import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {fetchLikedFormSubmissions} from './service/mockServer';
import Typography from '@mui/material/Typography';

// TODO: replace the following placeholder function with one that populates the list from local storage
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
export default function LikedSubmissionList() {

    const [likedFormSubmissions, setLikedFormSubmissions] = useState(false);

    useEffect(() => {
        fetchLikedFormSubmissions().then(response => {
            console.log('response: ', response);
            setLikedFormSubmissions(response.formSubmissions);
        }).catch(error => {
            console.log('error: ', error);
            // TODO: better error handling - show error to user and retry or tell them to refresh
        });
        // TODO: handle empty state (before any submissions have been saved)
    }, []);

    if(!likedFormSubmissions) {
        return <Typography variant="p">Loading...</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <List>
                    {likedFormSubmissions.map((formSubmission) => (
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        {// TODO: wire up the delete button 
                                        }
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                key={formSubmission.id}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={formSubmission.data.firstName + ' ' + formSubmission.data.lastName}
                                    secondary={formSubmission.data.email}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}
