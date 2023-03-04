import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';
import { NavLink } from 'react-router-dom';

interface Props {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
}

const CardItem: React.FC<Props> = ({category, title, description, image, price, id}) => {

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
      <Button style={{marginLeft: '16px', marginBottom: "10px"}} variant="contained">Delete</Button>
    </Card>
  );
};

export default CardItem;