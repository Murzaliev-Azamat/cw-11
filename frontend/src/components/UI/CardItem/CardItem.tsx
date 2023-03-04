import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlise';
import { deleteItem, fetchAllItems } from '../../../features/items/itemsThunks';

interface Props {
  id: string;
  author: string;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
}

const CardItem: React.FC<Props> = ({author, category, title, description, image, price, id}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  let cardImage = undefined;
  let infoImage = null;

  if (image) {
    cardImage = apiUrl + '/' + image;
    infoImage = (<CardMedia
      sx={{height: 140}}
      image={cardImage}
      title="picture"
    />)
  }

  const removeItem = async () => {
    await dispatch(deleteItem(id));
    await dispatch(fetchAllItems());
  }

  let buttonInfo = null;
  
  if (user && user._id === author){
    buttonInfo = <Button onClick={removeItem} style={{display: "block", marginLeft: '16px', marginBottom: "10px"}} variant="contained">Delete</Button>
  } else {
    buttonInfo = <Button style={{display: "none"}} variant="contained">Delete</Button>
  }

  return (
    <Card sx={{maxWidth: 345, border: 1, mt: 2}}>
      {infoImage}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title ? title : 'Anonymous'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category}
        </Typography>
      </CardContent>
      {buttonInfo}
    </Card>
  );
};

export default CardItem;