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
import Toast from './Toast';

const maxFetchAttempts = 3;

export default function LikedSubmissionList() {

    const [likedFormSubmissions, setLikedFormSubmissions] = useState(false);
    const [fetchAttempts, setFetchAttempts] = useState(1);
    const [fetchFailed, setFetchFailed] = useState(false);
    useEffect(() => {
        fetchLikedFormSubmissions().then(response => {
            console.log('response: ', response);
            setLikedFormSubmissions(response.formSubmissions);
        }).catch(error => {
            console.log('error: ', error);
            fetchAttempts < maxFetchAttempts ? setFetchAttempts(fetchAttempts + 1) : setFetchFailed(true);
        });
    }, [fetchAttempts]);

    const addSubmissiontoList = (submission) => {
        setLikedFormSubmissions([...likedFormSubmissions, submission]);
    }

    if(!likedFormSubmissions && !fetchFailed) {
        return <Typography ml={1}>Loading... attempt #{fetchAttempts} of {maxFetchAttempts}</Typography>;
    } else if (fetchFailed) {
        return <Typography ml={1}>Oops, our flaky server failed to load submissions after {maxFetchAttempts} attempts. Please try again later!</Typography>;
    } else if (likedFormSubmissions.length === 0) {
        return (
            <>
                <Typography ml={1}>Submissions you like will appear here.</Typography>
                <Toast addSubmissiontoList={addSubmissiontoList} />
            </>
        );
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
            <Toast addSubmissiontoList={addSubmissiontoList} />
        </Box>
    );
}
