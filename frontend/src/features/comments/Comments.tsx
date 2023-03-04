import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchComments } from './commentsThunks';
import { selectComments, selectFetchAllCommentsLoading } from './commentsSlice';
import CardForComment from '../../components/UI/CardForComment/CardForComment';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

const Comments = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const fetchAllCommentsLoading = useAppSelector(selectFetchAllCommentsLoading);

  console.log(id)

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  let info = null;

  if (fetchAllCommentsLoading) {
    info = <Spinner/>
  } else {
    info = (
      comments.map((comment) => (
        <CardForComment key={comment._id} author={comment.author.username} message={comment.message} id={comment._id}/>
      ))
    )
  }

  return (
    <div>
      <h3>Comments</h3>
      {info}
    </div>
  );
};

export default Comments;