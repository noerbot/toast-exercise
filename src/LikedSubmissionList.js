import React from 'react';
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
import Typography from '@mui/material/Typography';

export default function LikedSubmissionList(props) {

    const {likedFormSubmissions, isLoading, fetchFailed} = props;

    if(isLoading && !fetchFailed) {
        return <Typography ml={1}>Loading...</Typography>;
    } else if (fetchFailed && !isLoading) {
        return <Typography ml={1}>Oops, our flaky server failed to load submissions. Please try again later!</Typography>;
    } else if (likedFormSubmissions.length === 0 && !fetchFailed && !isLoading) {
        return <Typography ml={1}>Submissions you like will appear here.</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <List>
                    {likedFormSubmissions.length > 0 && likedFormSubmissions.map((formSubmission) => (
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
