import axios from 'axios';

const boardGamesApi = axios.create({
  baseURL: 'https://my-nc-boardgame-reviews-app.herokuapp.com/api'
});

export const getReviews = async (categorySelected) => {
  let apiSearch = '/reviews';

  if (categorySelected && categorySelected !== 'allReviews') {
    apiSearch += `?category=${categorySelected}&?sort_by=created_at`;
  } else {
    apiSearch += '?sort_by=created_at';
  }

  const { data } = await boardGamesApi.get(apiSearch);
  return data.reviews;
};

export const getCategories = async () => {
  const { data } = await boardGamesApi.get('/categories');
  return data.categories;
};

export const getIndividualReview = async (reviewId) => {
  const { data } = await boardGamesApi.get(`/reviews/${reviewId}`);
  return data.review;
};

export const getComments = async (reviewId) => {
  const { data } = await boardGamesApi.get(`/reviews/${reviewId}/comments`);
  return data.comments;
};

export const postComment = async (reviewId, commentBody) => {
  const response = await boardGamesApi.post(`/reviews/${reviewId}/comments`, {
    username: 'jessjelly',
    body: commentBody
  });
  return response;
};

export const patchReviewVoteBy1 = async (reviewId) => {
  const response = await boardGamesApi.patch(`/reviews/${reviewId}`, {
    inc_votes: 1
  });
  return response;
};

export const patchCommentVoteBy1 = async (commentId) => {
  const response = await boardGamesApi.patch(`/comments/${commentId}`, {
    inc_votes: 1
  });
  return response;
};

export const getAndSortReviews = async (sortOption, category) => {
  if (category) {
    const response = await boardGamesApi.get('/reviews', {
      params: {
        category: category,
        sort_by: sortOption
      }
    });
    return response.data.reviews;
  } else {
    const response = await boardGamesApi.get('/reviews', {
      params: {
        sort_by: sortOption
      }
    });
    return response.data.reviews;
  }
};

// Ant reccomends when adding a comment or a review then just push the new comment or review to the array rather than make a
// new get request
