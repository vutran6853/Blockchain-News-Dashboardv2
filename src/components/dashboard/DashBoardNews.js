import React, { Component } from 'react';
import { defaults } from 'react-chartjs-2';
import axiso from 'axios';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import './dashboard.css';

class DashBoardNews extends Component{
  constructor(props) {
    super(props)

    this.state = {
      cyproNews: [],
      cyproNews2: []
    }

  }
  componentDidMount() {
    axiso.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
    .then((response) => this.setState({ cyproNews: response.data.Data.splice(0, 8) }))
    .catch((error) => console.log(`Fail to Fetch Data ${ error }`))
  }

  render() {
    let { cyproNews } = this.state
    let { Meta } = Card;

    let displayCyproNews = cyproNews.map((value, index) => {
      return(        
          <Card id='card' key={ index }>
            <a href={ value.url } target="popup">
              <CardImg className='cardImg' src={ value.imageurl }/>
            </a>

            <CardBody>
              <a href={ value.url } target="popup">
                <CardTitle className='cardTitleBox' >{ value.title }</CardTitle>
              </a>
              <CardText className='cardbody'>{ value.body }</CardText>
            </CardBody>
          </Card>
      
      )
    })

    return(
      <div className='mainBox'>
        <div className='header headerBox' >
            <p className="p-5">CryptoZone is the perfect place to learn about Crypto currencies and start to understand some of the fundamental concepts behind the blockchain.</p>
        </div>
        <div className='container'>
          { displayCyproNews }
        </div>
      </div>
    )
  }
}

export default DashBoardNews;