import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

function CryptoTrendingPrice(props) {
  let displayCryptoDate = []    // STORE CRYPTODATE DATA
  let displayCrtptoPrice = []   // STORE CRYPTODATE PRICE

  props.priceData.forEach((value) => {
    return displayCryptoDate.push(moment.unix(value.time).format('h:mm a'))
  })

  props.priceData.map((value) => {
    return displayCrtptoPrice.push(value.close)
  })

  const data = {
    labels: displayCryptoDate,
    datasets: [
      {
        label: props.name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ],
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: displayCrtptoPrice
      }
    ]
  };

  return (
    <div className='topTrendingCryptoBTCBox'>
      <Line data={ data } width="700" id='btcLineGraphBox'/>
    </div>
  )
}
 
export default CryptoTrendingPrice;