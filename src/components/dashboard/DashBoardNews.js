import React from 'react';
import './dashboard.css';

function DashBoardNews(props) {
  let displayCryptoNews = props.news.map((value, index) => {
    // console.log(`value[${index}] = `, value);
    return (
        <div className="news-item" key={ index }>
          <a href={ value.url } target="popup">
            <img className="newsimage" src={ value.imageurl } alt={ value.imageurl }></img>
          </a>
          <a href={ value.url } target="popup">
            <p>{ value.title }</p>
          </a>
          <p>{ value.body }</p>
        </div>
    )
  })

  return (
      <>
        { displayCryptoNews }
      </>
  )
}

export default DashBoardNews;