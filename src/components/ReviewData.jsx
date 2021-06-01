import React from 'react';
import { patchReviewVoteBy1 } from '../utils/api';
import { useParams } from 'react-router-dom';

const ReviewData = ({
  specificReview,
  reviewVotes,
  setReviewVotes,
  numberOfComments
}) => {
  const params = useParams();
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

  return (
    <div>
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
    </div>
  );
};

export default ReviewData;
