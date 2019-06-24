import React from 'react';
import './dashboard.css';

function DashBoardNews(props) {
  let displayCryptoNews = props.news.map((value, index) => {
    // console.log(`value[${index}] = `, value);
    return (    
        <div key={ index }>
          <a href={ value.url } target="popup">
            <img className='cardImg' src={ value.imageurl }></img>
          </a>
          <a href={ value.url } target="popup">
            <p className='cardTitleBox' >{ value.title }</p>
          </a>
          <p>{ value.body }</p>
            {/* <CardText className='cardbody'>{ value.body }</CardText> */}
        </div>
    )
  })

  return (
    <div className="mainBox">
      { displayCryptoNews }
    </div>
  )
}

export default DashBoardNews;