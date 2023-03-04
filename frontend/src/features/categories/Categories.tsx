import React, { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories, selectFetchAllCategoriesLoading } from './categoriesSlice';
import { fetchAllCategories } from './categoriesThunks';
import { NavLink } from 'react-router-dom';
import { fetchAllItems } from '../news/itemsThunks';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const fetchAllCategoriesLoading = useAppSelector(selectFetchAllCategoriesLoading);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const onClick = async (categoryTitle: string) => {
    await dispatch(fetchAllItems(categoryTitle));
  }

  let info = null;

  if (fetchAllCategoriesLoading) {
    info = <Spinner/>
  } else {
    info = (
      <>
        {categories.map((category) => (
          <li key={category._id}><NavLink to={'/'} onClick={() => onClick(category._id)}>{category.title}</NavLink></li>
        ))}
      </>
    )
  }

  return (
    <div>
      <ul>
      <li><NavLink to={'/'} onClick={async () => await dispatch(fetchAllItems())}>All items</NavLink></li>
      {info}
      </ul>
    </div>
  );
};

export default Categories;