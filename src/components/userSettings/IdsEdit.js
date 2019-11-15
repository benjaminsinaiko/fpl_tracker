import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Clear';
import ClearIcon from '@material-ui/icons/ClearAll';
import Slide from '@material-ui/core/Slide';

import { IdsDispatchContext } from '../../contexts/idsContext';
import TeamSearch from './TeamSearch';

const useStyles = makeStyles(theme => ({
  editRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  clearButton: {
    width: '30%',
    color: '#fff',
    backgroundColor: '#f6247b',
    marginTop: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#f6247b',
    },
  },
  editButton: {
    width: '60%',
    marginTop: theme.spacing(1),
  },
  cancelButton: {
    color: '#e0004c',
    alignSelf: 'flex-start',
    marginLeft: 2,
    marginBottom: theme.spacing(1),
  },
  buttonIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function IDsEdit() {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useContext(IdsDispatchContext);

  function handleOpenEdit() {
    setIsEdit(true);
  }

  function handleCancel() {
    setIsEdit(false);
  }

  function handleClear() {
    dispatch({ type: 'CLEAR_IDS' });
  }

  return (
    <div className={classes.editRoot}>
      <div className={classes.buttonGroup}>
        <Button
          onClick={!isEdit ? handleClear : handleCancel}
          variant='contained'
          className={classes.clearButton}>
          {!isEdit ? 'Clear' : 'Cancel'}
          {!isEdit ? (
            <ClearIcon className={classes.buttonIcon} />
          ) : (
            <CancelIcon className={classes.buttonIcon} />
          )}
        </Button>
        <Button
          disabled={isEdit}
          onClick={handleOpenEdit}
          variant='contained'
          color='primary'
          className={classes.editButton}>
          Add / Edit
          <EditIcon className={classes.buttonIcon} />
        </Button>
      </div>

      {isEdit && (
        <Slide direction='up' in={isEdit} mountOnEnter unmountOnExit>
          <div>
            <TeamSearch handleCancel={handleCancel} />
          </div>
        </Slide>
      )}
    </div>
  );
}
