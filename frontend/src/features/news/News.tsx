import React, { useEffect } from 'react';
import { fetchAllNews } from './newsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchAllLoading, selectNews } from './newsSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import ShortOneNews from '../../components/UI/ShortOneNews/ShortOneNews';

const News = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  let info = null;

  if (fetchAllLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {news.map((oneNews) => (
          <ShortOneNews key={oneNews._id} title={oneNews.title} description={oneNews.description} image={oneNews.image} id={oneNews._id} date={oneNews.date}/>
        ))}
      </>
    )
  }

  return (

    <div>
      {info}
    </div>
  );
};

export default News;