import React, { useEffect, useState } from 'react';
import { getReviews, getCategories } from '../utils/api';
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
    console.log(sortOption);
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
            <img src={review.review_img_url} alt="" width="200" height="200" />
          </li>
        ))}
      </ul>
    </main>
  );
};
export default Reviews;
