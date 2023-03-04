import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CommentApi } from '../../../types';
import { useParams } from 'react-router-dom';
import { addComment, fetchComments } from './commentsThunks';
import { selectUser } from '../users/usersSlise';
import { selectAddCommentLoading } from './commentsSlice';


const FormForComments = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const addCommentLoading = useAppSelector(selectAddCommentLoading);

  const [state, setState] = useState<CommentApi>({
    message: '',
    oneNews: '',
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addComment({
      message: state.message,
      oneNews: id,
    }));
    setState({message: '', oneNews: ''});
    if (id) {
      await dispatch(fetchComments(id));
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <form
      style={user ? {display: "block"} : {display: "none"}}
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2} sx={{mb: 1}}>
        <Grid item xs>
          <TextField
            sx={{width: 1}}
            multiline rows={3}
            id="message" label="Message"
            value={state.message}
            onChange={inputChangeHandler}
            name="message"
            required
          />
        </Grid>

      </Grid>

      <Button type="submit" color="primary" variant="contained" disabled={addCommentLoading}>
        Add comment
      </Button>
    </form>
  );

};

export default FormForComments;