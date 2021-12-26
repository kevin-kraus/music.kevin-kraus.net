import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types';

export const OpenPlaylistDialog = (props) => {

    return (
        <Dialog onClose={props.handleClose} open={props.show}>
            <DialogTitle>Open Playlist "{props.playlist.name}"</DialogTitle>
            <DialogContent >
                <Typography variant="body1">Please choose whether you have Spotify installed or not.</Typography>
            </DialogContent>
            <DialogActions>
                <Button 
                href={props.playlist.externalUrl}
                variant="outlined"
                color="secondary"
                sx={{
                    ':hover': {
                        bgcolor: 'primary.secondary',
                        color: 'white',
                    },
                }}
                onClick={() => props.handleClick(true)}>
                    Open with Browser
                </Button>
                <Button 
                href={props.playlist.spotifyUrl}
                variant="contained"
                color="primary" 
                sx={{
                    ':hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                    },
                }}
                onClick={() => props.handleClick(false)}>
                    Open with Spotify
                </Button>
            </DialogActions>
        </Dialog>
    )
}

// PropTypes
OpenPlaylistDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired
}