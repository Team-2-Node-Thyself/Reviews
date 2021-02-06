import React from 'react';
import Recommend from './small-components/Recommend.jsx';
import styled from 'styled-components';
import moment from 'moment';

const Ratings = styled.div `
  background: url("http://localhost:8004/images/stars_empty.svg");
  width: 87px;
  height: 17px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 87px 16px;
`
const Stars = styled.div`
  width: 0%;
  height: 17px;
  background-image: url("http://localhost:8004/images/stars_full.svg");
  background-repeat: no-repeat;
  background-size: 87px 16px;
`

const OuterContainer = styled.div`
  width: 64%;
`

const Title = styled.h3`
  font-size: 18px;
  margin-top: 0;
`

const PostDetails = styled.p`
  font-size: 12px;
  color: #666666;
  font-size: 12px;
`

const Recommendation = styled.span`
  display: inline-block;
  border-left: gray solid 1px;
  padding: 0 10px;
  margin: 0 10px;
`

const Container = styled.span`
  display: flex;
  align-items: center;
`

const Gallery = styled.div`
  margin-top: 1em;
`

const GreenText = styled.span`
  color: rgb(0, 102, 1);
`
const Image = styled.img`
width: 70px;
height: 70px;
margin: 0 7px;
overflow: hidden;
`


const Main = ({ review }) => {
  return (
    <OuterContainer>
      <Title>{review.title}</Title>
      <Container>
        <Ratings>
          <Stars style={{ width: `${review.overall_rating}%` }}></Stars>
        </Ratings>
        <Recommendation>
          <Recommend recommend={review.would_recommend}/>
        </Recommendation>
      </Container>
      <PostDetails>
        {review.username} - {moment(review.createdAt).fromNow()}
        {review.verified_purchaser ? <span>, <GreenText> Verified purchaser</GreenText></span> : ''}
      </PostDetails>
      {review.body}
      <Gallery>
        {review.images ? review.images.map((url, i) => <Image src={url} key={i}/>): ''}
      </Gallery>
    </OuterContainer>
  );
}

export default Main;