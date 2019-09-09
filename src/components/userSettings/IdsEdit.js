import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  editRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  editButton: {
    width: '100%',
  },
  buttonIcon: {
    marginLeft: theme.spacing(1),
  },
  editBox: {
    display: 'flex',
  },
  editActionsBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
  editActionsButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function IdsEdit() {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);

  function handleEdit() {
    setIsEdit(true);
  }
  function handleCancel() {
    setIsEdit(false);
  }
  function handleUpdate() {
    setIsEdit(false);
  }

  return (
    <div className={classes.editRoot}>
      {isEdit ? (
        <div>
          <div className={classes.editBox}>
            <TextField
              id='league-id'
              label='Set League ID'
              autoFocus
              autoComplete='league-id'
              type='number'
              margin='normal'
              variant='outlined'
            />
            <TextField
              id='team-id'
              label='Set Team ID'
              autoComplete='team-id'
              type='number'
              margin='normal'
              variant='outlined'
            />
          </div>
          <div className={classes.editActionsBox}>
            <Button
              onClick={handleCancel}
              variant='outlined'
              size='small'
              className={classes.editActionsButton}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant='contained'
              size='small'
              color='secondary'
              className={classes.editActionsButton}>
              Update
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleEdit}
          variant='contained'
          color='primary'
          className={classes.editButton}>
          Edit IDs
          <EditIcon className={classes.buttonIcon} />
        </Button>
      )}
    </div>
  );
}
