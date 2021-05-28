import React, { useEffect, useState } from 'react';
import { getReviews, getCategories, getAndSortReviews } from '../utils/api';
import { Link } from 'react-router-dom';

const Reviews = ({ reviews, setReviews }) => {
  const [categories, setCategories] = useState([]);

  //useEffects

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, [setCategories]);

  useEffect(() => {
    getReviews().then((reviews) => setReviews(reviews));
  }, [setReviews]);

  // functions

  function optionSelected(event) {
    const categorySelected = event.target.value;
    getReviews(categorySelected).then((reviews) => setReviews(reviews));

    const heading = document.getElementById('reviewsHeading');
    if (categorySelected === 'allReviews') {
      heading.innerText = 'Showing all reviews';
    } else {
      heading.innerText = `Showing reviews based on games from the ${categorySelected} category`;
    }
  }

  function sortOptionSelected(event) {
    const sortOption = event.target.value;
    const categoryInHeading = document
      .getElementById('reviewsHeading')
      .innerText.split(' ')[7];

    getAndSortReviews(sortOption, categoryInHeading).then((sortedReviews) => {
      setReviews(sortedReviews);
    });
  }

  return (
    <main>
      <h1 id="reviewsHeading">Showing all reviews</h1>

      <label htmlFor="categories">Choose a category: </label>

      <select name="categories" id="categories" onChange={optionSelected}>
        <option value="allReviews">All Reviews</option>
        {categories.map((category) => {
          return (
            <option key={category.slug} value={category.slug}>
              {category.slug}
            </option>
          );
        })}
      </select>

      <br />

      <label htmlFor="sortBy">Sort Reviews by: </label>
      <select name="sortBy" id="sortBy" onChange={sortOptionSelected}>
        <option value="created_at">Date created</option>
        <option value="comment_count">Number of comments</option>
        <option value="votes">Number of votes</option>
      </select>

      <ul>
        {reviews.map((review) => (
          <li key={review.review_id}>
            <Link to={`/reviews/${review.review_id}`}>
              <h3>{review.title}</h3>
            </Link>
            <p>Review by {review.owner}</p>
            <p>Created {review.created_at}</p>
            <p>This Review currently has {review.comment_count} comments</p>
            <p>This Review has {review.votes} votes</p>
            <img src={review.review_img_url} alt="" width="200" height="200" />
          </li>
        ))}
      </ul>
    </main>
  );
};
export default Reviews;

// on the option with value="created_at"
// I need to use https://www.pluralsight.com/guides/how-to-get-selected-value-from-a-mapped-select-input-in-react
// to try and set the drop down back to created_at when you select a new category to view by

// is it easier to have the reviews just ordered in whatever it says when you select another category? rather thsn trying
// to default the drop down back to "created_at" ?
