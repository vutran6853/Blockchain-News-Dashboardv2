let getCharts = (req, res, next) => {

  const dbInstance = req.app.get('db');

  dbInstance.get_charts()
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request')
    // console.log(error);
  });
}

module.exports = {
  getCharts
}