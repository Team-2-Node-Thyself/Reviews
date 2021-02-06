import React from 'react';
import styled from 'styled-components';
import Bar from './Bar.jsx';
import PercentageCircle from './PercentageCircle.jsx';
import Details from './Details.jsx';

const Container = styled.div`
  text-align: center;
`
const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin: 0 auto;
`
const BarRatings = styled.div`
display: flex;
flex-direction: column;
font-size: 12px;
`
const Header = styled.h2`
  font-size: 23px;
  margin-bottom: 1.5em;
`

const StarRatings = styled.div`
font-size: 13px;
`
const LargeText = styled.span`
  font-weight: bold;
  font-size: 40px;
  margin: 5px;
  padding: 0;
  margin-bottom: 0;
`

const Ratings = styled.div `
  margin-top: -5px;
  background: url("http://localhost:8004/images/stars_empty.svg");
  width: 115px;
  height: 35px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 115px 35px;

`
const Stars = styled.div`
  width: 30%;
  height: 35px;
  background-image: url("http://localhost:8004/images/stars_full.svg");
  background-repeat: no-repeat;
  background-size: 115px 35px;

`
const CircleRatings = styled.div`

`

function OverallRatings({ reviews, filterByStars }) {

  const rating = function () {
    var overallSum = reviews.reduce(function(sum, review){
      return sum + review.overall_rating;
    }, 0)

    var overallPercentage = `${(overallSum / (reviews.length * 100)) * 100}%`;
    var starsNumber = `${Math.round(((overallSum / (reviews.length * 100)) * 5) * 10) / 10}`;
    return { overallPercentage: overallPercentage, starsNumber: starsNumber}
  }

  const recommendation = function() {
    var number = reviews.filter(review => review.would_recommend === true);
    var total = reviews.filter(review => review.would_recommend !== null);

    if (total.length !== 0) {
      var percentage = Math.ceil(((number.length / total.length) * 100));
    } else {
      var percentage = 0;
    }
    return {number: number.length, percentage: percentage}
  }

  const ratings = {five:0, four:0, three:0, two:0, one:0}
  reviews.forEach(review => {
    if (review.overall_rating === 100) ratings.five++;
    if (review.overall_rating === 80) ratings.four++;
    if (review.overall_rating === 60) ratings.three++;
    if (review.overall_rating === 40) ratings.two++;
    if (review.overall_rating === 20) ratings.one++;
  });
  for (let key in ratings) {
    ratings[key] = Math.ceil((ratings[key]/reviews.length) * 100) * 2
  }

  return (
    <Container>
      <Header>Guest Ratings & Reviews</Header>
      <Stats>
        <BarRatings>
          <Bar stars={[5, 'five']} rating={ratings.five} filterByStars={filterByStars}/>
          <Bar stars={[4, 'four']} rating={ratings.four} filterByStars={filterByStars}/>
          <Bar stars={[3, 'three']} rating={ratings.three} filterByStars={filterByStars}/>
          <Bar stars={[2, 'two']} rating={ratings.two} filterByStars={filterByStars}/>
          <Bar stars={[1, 'one']} rating={ratings.one} filterByStars={filterByStars}/>
        </BarRatings>

        <StarRatings>
          <LargeText>
            {(Math.round(rating().starsNumber * 10) / 10).toFixed(1)}
            </LargeText>
             <br></br>
          <Ratings>
            <Stars style={{ width: rating().overallPercentage }}></Stars>
          </Ratings>
            <br></br>
            {reviews.length} star ratings
        </StarRatings>

        <CircleRatings>
          <PercentageCircle num={recommendation().percentage}></PercentageCircle>
          <br></br>
          <strong>{recommendation().percentage}% would recommend</strong>
          <br></br>
        {recommendation().number} recommendations
        </CircleRatings>
      </Stats>
      <Details reviews={reviews}></Details>


    </Container>
  )
}

export default OverallRatings;