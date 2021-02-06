import React from 'react';
import styled from 'styled-components';
import Helpful from './small-components/Helpful.jsx';
import Stats from './small-components/Stats.jsx';

const Container = styled.div`
  width: 34%;
  color: #666666;
  font-size: 12px;
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

const ButtonDisabled = styled.button`
  display: inline-block;
  width: 120px;
  padding: 8px 0;
  border:#888888 solid 1px;
  border-radius: 4px;
  font-size: 12px;
  background-color: black;
  color: white;
  margin: 0 2px;

  &:focus {
    outline: none;
  }
`
const Buttons = styled.div`
  margin-top: 1.2em;
`
const Links = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
`
const ReportLink = styled.div`
  font-size: 14px;
  text-decoration: underline;
`

class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.review = this.props.review;
    this.helpful = this.props.helpful;
    this.notHelpful = this.props.notHelpful;
    this.state = {
      buttonsEnabled: true,
      helpful: { background: 'rgb(51, 51, 51)' },
      unhelpful: { background: 'rgb(51, 51, 51)' }
    }
  }

  render() {
    const theme = {
      background: 'rgb(51, 51, 51)',
      color: 'white'
    };

    if (this.state.buttonsEnabled) {
      return (
        <Container>
          <Stats review={this.review}></Stats>
          <div className="helpful-form">
            <span>{this.review.helpful_count <= 0 ? "Did you find this review helpful?" : <Helpful helpful_count={ this.review.helpful_count}/>} </span>
            <Links>
            <Buttons>
              <Button className="disabledCursor" onClick={() => this.helpful(this.review.reviewId)} data-id={this.props.id}>Helpful</Button>
              <Button onClick={() => this.notHelpful(this.review.id)} data-id={this.props.reviewId}>Not helpful</Button>
            </Buttons>
            <ReportLink>Report review</ReportLink>
            </Links>
          </div>
        </Container>
      );
    } else {
      return (
        <Container>
          <Stats review={this.review}></Stats>
          <div className="helpful-form">
            <span>{this.review.helpful_count <= 0 ? "Did you find this review helpful?" : <Helpful helpful_count={this.review.helpful_count}/>} </span>
            <Links>
            <Buttons>
              <ButtonDisabled>Helpful</ButtonDisabled>
              <ButtonDisabled>Not helpful</ButtonDisabled>
            </Buttons>
            <ReportLink>Report review</ReportLink>
            </Links>
          </div>
        </Container>
      );
    }
  }
}

export default Aside;