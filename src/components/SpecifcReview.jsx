import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getIndividualReview } from '../utils/api';
import AddComment from './addComment';
import Comments from './Comments';
import ReviewData from './ReviewData';

const SpecificReview = () => {
  const params = useParams();

  const [specificReview, setSpecificReview] = useState({});
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [reviewVotes, setReviewVotes] = useState(0);

  useEffect(() => {
    getIndividualReview(params.review_id).then((review) => {
      setSpecificReview(review);
      setNumberOfComments(review.comment_count);
      setReviewVotes(review.votes);
    });
  }, [params.review_id]);

  return (
    <main>
      <ReviewData
        specificReview={specificReview}
        reviewVotes={reviewVotes}
        setReviewVotes={setReviewVotes}
        numberOfComments={numberOfComments}
      />
      <Comments />
      <AddComment
        specificReview={specificReview}
        setNumberOfComments={setNumberOfComments}
        numberOfComments={numberOfComments}
      />
    </main>
  );
};
export default SpecificReview;

// i didn't use state for the comment votes as there are so many possible comments that you would have so many states for
// each comment   You cant create a state in map can you?
