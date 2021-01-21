import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function Popup(props) {
  const { popupDelete, cancel, popupState, category } = props;
  const { open, type, actionID, actionName } = popupState;
  const listType = category === 1 ? "to-do" : "habit";

  // Making form a controlled component
  const [name, setName] = useState(actionName);

  // Prevent stale props by re-rendering when actionName changes in parent
  useEffect(() => {
    setName(actionName)
  }, [actionName])

  console.log("actionName", actionName);

  return (
    <div>
      { type === "Delete" ? (
              <Dialog
              open={open}
              onClose={cancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{type} {listType}?</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
                {actionID}
                </DialogContentText> */}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => popupDelete(actionID)} color="primary">
                  Confirm
                </Button>
                <Button onClick={cancel} color="primary" autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
      ) : (
        <Dialog open={open} onClose={cancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{type} a {listType}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            {actionID}
          </DialogContentText> */}
          <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={cancel} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      )}
    </div>
  );
}