import React, { useEffect } from 'react';
import { fetchAllItems } from './itemsThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchAllLoading, selectItems } from './itemsSlice';
import Spinner from '../../components/UI/Spinner/Spinner';
import CardItem from '../../components/UI/CardItem/CardItem';
import Categories from '../categories/Categories';

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const fetchAllLoading = useAppSelector(selectFetchAllLoading);

  useEffect(() => {
    dispatch(fetchAllItems());
  }, [dispatch]);

  let info = null;

  if (fetchAllLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {items.map((item) => (
          <CardItem key={item._id} category={item.category} title={item.title} description={item.description} price={item.price} image={item.image} id={item._id}/>
        ))}
      </>
    )
  }

  return (

    <div>
      <Categories/>
      {info}
    </div>
  );
};

export default Items;