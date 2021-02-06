import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Filters from './filters/Filters.jsx';
import Gallery from './Gallery.jsx';
import OverallRatings from './overall-ratings/OverallRatings.jsx';
import styled from 'styled-components'
import Review from './reviews/Review.jsx';

const Container = styled.div`
  border-top: rgb(214, 214, 214) solid 1px;
  padding-top: 3em;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  width: 97%;
  margin: 0 auto;
  color: #333333;
`
const List = styled.ul`
  padding-inline-start: 0;
`
const Button = styled.button`
  display: block;
  padding: 8px 15px;
  border:#888888 solid 1px;
  border-radius: 4px;
  font-size: 12px;
  background-color: white;
  color: #333333;
  margin: 2em auto;
  transition: all 200ms ease-out 0s;

  &:hover {
    background-color: rgb(240, 240, 240);
    border-color: black;
    cursor: pointer;
  }

  &:focus {
    outline: gray 1px dashed;
    outline-offset: 2px;
  }
`
const ReviewButton = styled.button`
display: block;
padding: 8px 15px;
border-radius: 4px;
font-size: 12px;
background-color: #CC0000;
color: white;
margin: 2.5em auto;
border: none;
transition: all 200ms ease-out 0s;

&:hover {
  background-color: rgb(170, 0, 0);
  border-color: black;
  cursor: pointer;
}

&:focus {
  outline: gray 1px dashed;
  outline-offset: 2px;
}
`

const Words = styled.div`
  position: absolute;
  width: 100%;
`
const Circle = styled.div`
  width:60px;
`

const PCircle = styled.svg`
width: 100%;
`

const FoundMatches = styled.span`
  display: inline-block;
  padding: 0.3em 2em;
  font-size: 16px;
`


class App extends React.Component {
  constructor(props) {
    super(props);
    this.reviewsWithImages = [];
    this.images = [];
    this.filterByPhotos = this.filterByPhotos.bind(this);
    this.filterByStars = this.filterByStars.bind(this);
    this.filterByVerified = this.filterByVerified.bind(this);
    this.notHelpful = this.notHelpful.bind(this);
    this.helpful = this.helpful.bind(this);
    this.state = {
      allReviews: [],
      selectedReviews: [],
      displayedReviews: [],
      withPhotos: false,
      verified: false,
      stars: { five: false, four: false, three: false, two: false, one: false },
      sortBy: { mostRecent: false, highestRated: false, lowestRated: false, mostHelpful: false }
    }
    this.getReviews = this.getReviews.bind(this)
    this.getImages = this.getImages.bind(this)
  }

  getReviews(cb) {
    axios.get('http://localhost:8004/products/9999997/reviews')
      .then((reviews) => {
        const reviewList = reviews.data.reviews;
        console.log(reviewList);
        this.setState({
          allReviews: reviewList,
          displayedReviews: reviewList,
          selectedReviews: reviewList
        }, () => {
          for (let i = 0; i < this.state.allReviews.length; i++) {
            cb(reviewList[i])
          }
        });
      })
  }

  getImages(review) {
    if (review.images.length > 0) {
      this.reviewsWithImages.push(review);
      for (let i = 0; i < review.images.length; i++) {
        this.images.push(review.images[i]);
      }
    }
  }

  helpful(id) {
    var i = event.target.getAttribute('data-id');
    var reviews = this.state.allReviews.slice();
    reviews[i].helpful_count++;

    this.setState({
      allReviews: reviews,
      displayedReviews: reviews,
      selectedReviews: reviews
    });

    axios.patch(`http://localhost:8004/products/9999997/${id}/helpful`);
  }

  notHelpful(id) {
    var i = event.target.getAttribute('data-id');
    var reviews = this.state.allReviews.slice();
    reviews[i].helpful_count--;

    this.setState({
      allReviews: reviews,
      displayedReviews: reviews,
      selectedReviews: reviews
    });

    axios.patch(`http://localhost:8004/products/9999997/${id}/not_helpful`);
  }

  filterByVerified() {
    if (this.state.verified === false) {
      const newDisplay = this.state.displayedReviews.filter(review => review.verified_purchaser === true);
      this.setState({
        verified: !this.state.verified,
        displayedReviews: newDisplay
      });
    } else {
      this.setState({
        verified: !this.state.verified
      }, () => { this.reapplyFilters() })
    }
  }

  filterByPhotos() {
    if (this.state.withPhotos === false) {
      const newDisplay = this.state.displayedReviews.filter(review => {
        if (review.images && review.images.length > 0) return review;
      });
      this.setState({
        withPhotos: !this.state.withPhotos,
        displayedReviews: newDisplay
      });
    } else {
      this.setState({
        withPhotos: !this.state.withPhotos
      }, () => { this.reapplyFilters() })
    }
  }


  filterByStars(stars) {
    var allStars = this.state.stars;
    allStars[stars] = !this.state.stars[stars];
    if (allStars[stars] === true) {
      var percentage = { five: 100, four: 80, three: 60, two: 40, one: 20 }
      var newDisplay = this.state.displayedReviews.filter((review) => (
        review.overall_rating === (percentage[stars])
      ));

      this.setState({
        stars: allStars,
      }, () => { this.reapplyFilters() })
    } else {
      this.setState({
        stars: allStars
      }, () => { this.reapplyFilters() })
    }
  }

  reapplyFilters() {
    var reviews = this.state.allReviews;

    if (this.state.withPhotos) {
      reviews = reviews.filter(review => review.images.length > 0);
    }
    if (this.state.verified) {
      reviews = reviews.filter(review => review.verified_purchaser === true);
    }

    var allStars = this.state.stars;
    var percentage = { five: 100, four: 80, three: 60, two: 40, one: 20 }

    var starReviews = [];
    for (let key in allStars) {
      if (allStars[key]) {
        var currentRev = reviews.filter((review) => (
          review.overall_rating === (percentage[key])
        ));
        starReviews.push(...currentRev);
      }
    }

    reviews = starReviews.length === 0 ? reviews : starReviews

    this.setState({ displayedReviews: reviews });
  }

  componentDidMount() {
    this.getReviews(this.getImages);
    console.log('here');
  }

  render() {
    var reviews = this.state.displayedReviews.map((review, i) => <Review key={i} review={review} id={i} helpful={this.helpful} notHelpful={this.notHelpful}></Review>)
    return (
      <Container>
        <OverallRatings reviews={this.state.allReviews} filterByStars={this.filterByStars}></OverallRatings>
        <Gallery images={this.images} reviews={this.reviewsWithImages} helpful={this.helpful} notHelpful={this.notHelpful}></Gallery>
        <ReviewButton>Write a review</ReviewButton>

        <Filters verified={this.state.verified} withPhotos={this.state.withPhotos} filterByVerified={this.filterByVerified} filterByPhotos={this.filterByPhotos} filterByStars={this.filterByStars} stars={this.state.stars} />

        <FoundMatches>We found {this.state.displayedReviews.length} matching reviews</FoundMatches>
        <List>
          {reviews}
        </List>
      </Container>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('bullseye-reviews'));
