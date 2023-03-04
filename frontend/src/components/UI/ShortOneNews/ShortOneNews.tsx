import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';

interface Props {
  id: number;
  title: string;
  description: string;
  image: string | null;
  date: string;
}

const ShortOneNews: React.FC<Props> = ({title,description,image,id,date}) => {

  let cardImage = undefined;
  let infoImage = null;

  if (image) {
    cardImage = apiUrl + '/' + image;
    infoImage = (<CardMedia
      sx={{ height: 140 }}
      image={cardImage}
      title="picture"
    />)
  } else {
    cardImage = 'https://justtextit.com/images/social.png';
    infoImage = (<CardMedia
      sx={{ height: 140 }}
      image={cardImage}
      title="picture"
    />)
  }


  return (
    <Card sx={{ maxWidth: 345, border: 1, mt: 2 }}>
      {infoImage}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title ? title : 'Anonymous'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dayjs(date).format('DD.MM.YYYY HH:mm:ss')}
        </Typography>
      </CardContent>
      <NavLink to={"/news/" + id} style={{marginLeft: "16px"}}>Read full post</NavLink>
    </Card>
  );
};

export default ShortOneNews;