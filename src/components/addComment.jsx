import React from 'react';
import { postComment } from '../utils/api';

const AddComment = ({
  specificReview,
  newComment,
  setNewComment,
  setNumberOfComments,
  numberOfComments
}) => {
  // need to work out how to increase the number of comments by 1 each time they add a comment but stay on the page
  // most likely going to be similar logic to how the vote will go up by one when they are on the page, then make another get request
  // when they refresh

  // from what I can picture in my head it will be having some state that takes hold off the comment count at the first time
  // the person comes to the page, then every time they add a comment you just add one to that state.
  // that way the state will be rendered by when they visit it again it will make the original get request to get the review as
  // well as the number of comments :D (same logic for the vote buttons!!!)

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
