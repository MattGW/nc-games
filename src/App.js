import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import Nav from './components/Nav';
import Reviews from './components/Reviews';
import SpecificReview from './components/SpecifcReview';
import { useState } from 'react';

function App() {
  const [reviews, setReviews] = useState([]);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/reviews" exact>
            <Reviews reviews={reviews} setReviews={setReviews} />
          </Route>
          <Route path="/reviews/:review_id" exact>
            <SpecificReview />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
