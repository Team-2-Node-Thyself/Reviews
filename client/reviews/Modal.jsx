import React from 'react';
import Recommend from './small-components/Recommend.jsx';
import Helpful from './small-components/Helpful.jsx';
import moment from 'moment';
import Stats from './small-components/Stats.jsx';
import styled, {keyframes}  from 'styled-components';

const grow = keyframes`
  {
    0% {
            transform: translate(-50%, -50%) scale(0.8);
            -webkit-transform: translate(-50%, -50%) scale(0.8);
            opacity:0.5;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.0);
            -webkit-transform: translate(-50%, -50%) scale(1.0);
        }
}
`


const Popup = styled.div`
  animation: ${grow} 0.3s ease-in ;
  position: fixed;
  background-color: white;
  width: 85%;
  height: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 5px;
  padding: 2.3em;
  box-sizing: border-box;
  `
const Container = styled.div`
  font-size: 16px;

`
const Title = styled.h1`
  font-size: 23px;
  padding:0;
  margin: 0;
  margin-bottom: 8px;
`

const Overlay = styled.div`
position: fixed;
top:0;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0, 0, 0, 0.7);
z-index: 5;
`

const CloseBtn = styled.div`
  cursor: pointer;
  position: absolute;
  right: 6px;
  top: 6px;
  border-radius: 30px;
  background-color: rgb(51, 51, 51);
  height: 22px;
  width: 22px;
  box-sizing: border-box;
  background-image: url('http://localhost:8004/images/close.svg');
  background-repeat: no-repeat;
  background-size: 23px 23px;
  background-position: -0.5px -0.5px;
`

const Review = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`
const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 660px;
  width: 47%;
  box-sizing: border-box;
`

const Right = styled.div`
  text-align: left;
  width: 47%;
  /* width: 610px; */
  box-sizing: border-box;
`

const ArrowLeft = styled.button`
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-image: url("http://localhost:8004/images/arrow_left.svg");
  background-repeat: no-repeat;
  background-size: 34px 34px;
  border: none;
  background-color: white;
  border-radius:20px;

  &:focus {
    outline: gray 1px dashed;
    outline-offset: 2px;
  }
`

const ArrowRight = styled.button`
  width: 34px;
  height: 34px;
  cursor: pointer;
  background-image: url("http://localhost:8004/images/arrow_right.svg");
  background-repeat: no-repeat;
  background-size: 34px 34px;
  border: none;
  background-color: white;
  border-radius:20px;

  &:focus {
    outline: gray 1px dashed;
    outline-offset: 2px;
  }
`

const Recommendation = styled.span`
  display: inline-block;
  border-left: gray solid 1px;
  padding: 0 15px;
  margin: 0 10px;
`
const Ratings = styled.div`
  background: url("http://localhost:8004/images/stars_empty.svg");
  width: 87px;
  height: 20px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 87px 20px;
  margin-right: 6px;
`

const Stars = styled.div`
  width: 0%;
  height: 20px;
  background-image: url("http://localhost:8004/images/stars_full.svg");
  background-repeat: no-repeat;
  background-size: 87px 20px;
`

const Wrapper = styled.span`
  display: flex;
  align-items: center;
`

const PostDetails = styled.p`
  font-size: 12px;
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 16px;
`

const GreenText = styled.span`
  color: rgb(0, 102, 1);
`

const Buttons = styled.div`
  margin-top: 1.2em;
`
const Button = styled.button`
  display: inline-block;
  width: 120px;
  padding: 8px 0;
  border:#888888 solid 1px;
  border-radius: 4px;
  font-size: 12px;
  background-color: white;
  color: #333333;
  margin: 0 2px;

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

const ReportLink = styled.div`
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
`

const Footer = styled.div`
  font-size: 12px;
  color: #666666;
  display:flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0.8em;
`

const Body = styled.div`
  margin-bottom: 1.5em;
`


function Modal({ reviews, index, closeModal, images, changeIndex, helpful, notHelpful }) {

  return (
    <Container>
      <Overlay onClick={closeModal}></Overlay>
      <Popup>
        <CloseBtn onClick={closeModal}></CloseBtn>

        <Review>
          <Left>
            <ArrowLeft onClick={() => changeIndex(false)}></ArrowLeft>

            <img src={images[index]} width="80%"></img>

            <ArrowRight onClick={() => changeIndex(true)}></ArrowRight>
          </Left>

          <Right>
            <Title>{reviews[index].title}</Title>
            <Wrapper>
              <Ratings>
                <Stars style={{ width: `${reviews[index].value_rating}%` }}></Stars>
              </Ratings>
              <Recommendation>
                <Recommend recommend={reviews[index].would_recommend} />
              </Recommendation>
            </Wrapper>
            <PostDetails>
              {reviews[index].username} - {moment(reviews[index].createdAt).fromNow()}
              {reviews[index].verified_purchaser ? <span>, <GreenText> Verified purchaser</GreenText></span> : ''}
            </PostDetails>
            <Body>{reviews[index].body}</Body>

            <Stats review={reviews[index]}></Stats>

            <Footer>
              <div>
                <span>{reviews[index].helpful_count <= 0 ? "Did you find this review helpful?" : <Helpful helpful_count={reviews[index].helpful_count} />} </span>
                <Buttons>
                  <Button className="disabledCursor" onClick={() => helpful(reviews[index].id)} data-id={reviews[index].id}>Helpful</Button>
                  <Button onClick={() => notHelpful(reviews[index].id)} data-id={reviews[index].id}>Not helpful</Button>
                </Buttons>
              </div>
              <ReportLink>Report review</ReportLink>
            </Footer>
          </Right>
        </Review>

      </Popup>
    </Container>
  )
}

export default Modal;