import React from 'react';
import styled from 'styled-components'
import Main from './Main.jsx';
import Aside from './Aside.jsx';
import axios from 'axios';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  componentDidMount() {
    this.props.addPhotos(this.props.review.id)
      // if (review.images) {
      //   var images = review.images.map((image, i) => (<img src={image.url} style={{ width: "100px", "padding-right": "1em" }} />))
      // }

  }

  render() {
    return (
      < ReviewContainer >
        <Main review={this.props.review} photosAdded={this.props.photosAdded}/>
        {/* images={this.state.images} */}

      <Aside review={this.props.review} />
    </ReviewContainer>
    )
  }
}


const ReviewContainer = styled.li`
  list-style: none;
  padding: 20px;
  margin: 14px 0;
  border: rgb(214, 214, 214) solid 1px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`

export default Review;