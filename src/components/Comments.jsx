import React, { useEffect, useState } from 'react';
import { patchCommentVoteBy1, getComments } from '../utils/api';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const params = useParams();

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

  useEffect(() => {
    getComments(params.review_id).then((comments) => {
      setComments(comments);
    });
  }, [params.review_id]);

  return (
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
  );
};

export default Comments;
