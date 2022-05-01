import * as React from 'react';
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

// TODO: replace the following placeholder function with one that populates the list from local storage
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
export default function LikedSubmissionList() {

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <List>
                    {generate(
                    <ListItem
                        secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                        }
                    >
                        <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                        primary="Single-line item"
                        secondary="Secondary text"
                        />
                    </ListItem>,
                    )}
                </List>
            </Grid>
        </Grid>
    </Box>
  );
}
