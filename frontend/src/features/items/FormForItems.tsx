import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItem, fetchAllItems } from './itemsThunks';
import FileInput from '../../components/UI/FileInput/FileInput';
import { ItemApi } from '../../../types';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectUser } from '../users/usersSlise';
import { selectAddItemLoading } from './itemsSlice';

const FormForItems = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const addItemLoading = useAppSelector(selectAddItemLoading);

  const [state, setState] = useState<ItemApi>({
    category: '',
    title: '',
    description: '',
    price: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addItem({
      category: state.category,
      title: state.title,
      description: state.description,
      price: state.price,
      image: state.image,
    }));
    setState({category: '', title: '', description: '', price: '', image: null});
    await dispatch(fetchAllItems());
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files && files[0]) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    } else {
      setState(prevState => ({
        ...prevState, [name]: null,
      }))
    }
  };

  if (!user) {
    return <Navigate to="/login" />
  }

  let disabled = false;

  if (addItemLoading) {
    disabled = true;
  }

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid item container justifyContent="space-between" alignItems="center" xs sx={{mb: 1}}>
        <TextField
          sx={{width: '100%'}}
          id="title" label="Title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          required
        />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{mb: 1}}>
        <Grid item xs>
          <TextField
            sx={{width: 1}}
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <TextField
            sx={{width: 1}}
            multiline rows={3}
            id="price" label="Price"
            value={state.price}
            onChange={inputChangeHandler}
            name="price"
            type="number"
          />
        </Grid>

        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            name="image"
            label="Image"
          />
        </Grid>
      </Grid>

      <Button disabled={disabled} type="submit" color="primary" variant="contained">
        Add Item
      </Button>
    </form>
  );

};

export default FormForItems;