import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getIndividualReview,
  getComments,
  patchReviewVoteBy1,
  patchCommentVoteBy1
} from '../utils/api';
import AddComment from './addComment';

const SpecificReview = () => {
  const params = useParams();
  const [specificReview, setSpecificReview] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [reviewVotes, setReviewVotes] = useState(0);

  useEffect(() => {
    getIndividualReview(params.review_id).then((review) => {
      setSpecificReview(review);
      setNumberOfComments(review.comment_count);
      setReviewVotes(review.votes);
    });
  }, [params.review_id]);

  useEffect(() => {
    getComments(params.review_id).then((comments) => {
      setComments(comments);
    });
  }, [params.review_id, newComment]);

  function incrementReviewVote() {
    setReviewVotes(reviewVotes + 1);
    patchReviewVoteBy1(params.review_id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function incrementCommentVote(currVotes, id) {
    document.getElementById(`${id}votes`).innerText = `Number of votes: ${
      currVotes + 1
    }`;
    patchCommentVoteBy1(id)
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err);
      });

    document.getElementById(id).outerHTML =
      '<p>You have upvoted this comment :D<P>';
  }

  return (
    <main>
      <h1>{specificReview.title}</h1>
      <h2>Review by {specificReview.owner}</h2>
      <img
        src={specificReview.review_img_url}
        alt=""
        width="200"
        height="200"
      />
      <p>{specificReview.review_body}</p>
      <p>Number of votes: {reviewVotes}</p>
      {reviewVotes === specificReview.votes ? (
        <button onClick={incrementReviewVote}>Upvote this review</button>
      ) : (
        <p>You have voted for this Review :D</p>
      )}
      <h2>Number of comments: {numberOfComments}</h2>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h3>Comment by {comment.author}</h3>
              <p>{comment.body}</p>
              <p>Created at {comment.created_at}</p>
              <p id={`${comment.comment_id}votes`}>
                Number of votes: {comment.votes}
              </p>
              <button
                onClick={() =>
                  incrementCommentVote(comment.votes, comment.comment_id)
                }
                id={comment.comment_id}
              >
                Upvote this comment
              </button>
            </li>
          );
        })}
      </ul>
      <AddComment
        specificReview={specificReview}
        newComment={newComment}
        setNewComment={setNewComment}
        setNumberOfComments={setNumberOfComments}
        numberOfComments={numberOfComments}
      />
    </main>
  );
};
export default SpecificReview;

// so we are going to need a state for the comment we type, that then gets updated and a post request is made to comments
// it will then need to re-render so we can then see our comment has been added

// i didn't use state for the comment votes as there are so many possible comments that you would have so many states for
// each comment   You cant create a state in map can you?
