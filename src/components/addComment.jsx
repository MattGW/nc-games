import React, { useState } from 'react';
import { postComment } from '../utils/api';

const AddComment = ({
  specificReview,
  setNumberOfComments,
  numberOfComments
}) => {
  const [newComment, setNewComment] = useState('');

  function submitComment(event) {
    event.preventDefault();
    postComment(specificReview.review_id, newComment)
      .then((response) => {
        console.log(response);
        document.getElementById('messageSubmited').innerText =
          'Your message has been submited!';
        setNewComment('');
        setNumberOfComments(Number(numberOfComments) + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={submitComment}>
      <label htmlFor="newcomment">
        <h2>Add your comment here: </h2>
      </label>
      <input
        id="newComment"
        name="newComment"
        value={newComment}
        onChange={(event) => {
          setNewComment(event.target.value);
        }}
        required
      ></input>
      <button type="submit">Submit comment</button>
      <p id="messageSubmited"></p>
    </form>
  );
};
export default AddComment;
