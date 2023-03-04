import React from 'react';

const FullOneNews = () => {
  return (
    <div>

    </div>
  );
};

export default FullOneNews;

// import React, { useEffect } from 'react';
// import { Card, CardContent, CardMedia, Typography } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '../../../app/hooks';
// import { selectFetchOneNewsLoading, selectOneNews } from '../../../features/items/newsSlice';
// import { fetchOneNews } from '../../../features/items/newsThunks';
// import { useParams } from 'react-router-dom';
// import FormForComments from '../../../features/comments/FormForComments';
// import { apiUrl } from '../../../constants';
// import dayjs from 'dayjs';
// import Comments from '../../../features/comments/Comments';
// import Spinner from '../Spinner/Spinner';
//
// const FullOneNews = () => {
//   const {id} = useParams();
//   const dispatch = useAppDispatch();
//   const oneNews = useAppSelector(selectOneNews);
//   const fetchOneNewsLoading = useAppSelector(selectFetchOneNewsLoading);
//
//   useEffect(() => {
//     if (id) {
//       dispatch(fetchOneNews(id));
//     }
//   }, [dispatch, id]);
//
//   let cardImage = undefined;
//   let infoImage = null;
//
//
//   if (oneNews?.image) {
//     cardImage = apiUrl + '/' + oneNews.image;
//     infoImage = (<CardMedia
//       sx={{ height: 140 }}
//       image={cardImage}
//       title="picture"
//     />)
//   } else {
//     cardImage = 'https://justtextit.com/images/social.png';
//     infoImage = (<CardMedia
//       sx={{ height: 140 }}
//       image={cardImage}
//       title="picture"
//     />)
//   }
//
//   let info = null;
//
//   if (fetchOneNewsLoading) {
//     info = <Spinner/>
//   } else {
//     info = (
//         <Card sx={{ maxWidth: 345, border: 1, mt: 2, mb: 2 }}>
//           {infoImage}
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {oneNews?.title ? oneNews.title : 'Anonymous'}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {oneNews?.description}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {dayjs(oneNews?.date).format('DD.MM.YYYY HH:mm:ss')}
//             </Typography>
//           </CardContent>
//         </Card>
//     )
//   }
//
//   return (
//     <>
//       {info}
//       <Comments/>
//       <FormForComments/>
//     </>
//   );
// };
//
// export default FullOneNews;