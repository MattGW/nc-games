import React, { useEffect, useState } from 'react';
import { getReviews } from '../utils/api';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <div>
      <header>
        <h1>NorthCoders board game Reviews</h1>
      </header>
      <main>
        <ul>
          <li>
            what I need to do is make a get request for only 4 reviews, then can
            set the state and map over them
          </li>
        </ul>
      </main>
    </div>
  );
};
export default HomePage;
