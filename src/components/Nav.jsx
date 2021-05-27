import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <main>
      <ul>
        <li>
          <Link to="/">
            <button>Home Page</button>
          </Link>
        </li>
        <li>
          <Link to="/reviews">
            <button>Go to Reviews</button>
          </Link>
        </li>
        <li>
          <Link>
            <button>Create a Review</button>
          </Link>
        </li>
      </ul>
    </main>
  );
};
export default Nav;
