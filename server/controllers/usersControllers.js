let getUsers = (req, res, next) => {

  const dbInstance = req.app.get('db');

  dbInstance.get_users()
  .then((response) => {
    //  console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    res.statue(500).send('Oop, Something have Happen unable to complete this request')
    // console.log(error);
  });
}

let getUserByID = (req, res, next) => {

  const dbInstance = req.app.get('db');

  dbInstance.get_userByID(req.params.id)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request')
    // console.log(error);  
  });
}


let getFavlist = (req, res, next) => {

  const dbInstance = req.app.get('db')

  dbInstance.get_Favlist(req.params.id)
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    res.status(500).send('Oop, Something have Happen unable to complete this request')
  });
}

let editUserInfo = (req, res, next) => {

  const dbInstance = req.app.get('db')

  dbInstance.edit_user([req.query.newname, req.query.id ]) 
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    //  console.log(error)
    res.status(500).send('Fail to post Edit User!')
  });
}

let postUser = (req, res, next) => {

  const dbInstance = req.app.get('db')

  dbInstance.post_user([req.body.firstName, req.body.lastName, req.body.email, req.body.password]) 
  .then((response) => {
    // console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    // console.log(error)
    res.status(500).send('Fail to post new User!')
  });
}

let postlogin = (req, res, next) => {

  const dbInstance = req.app.get('db')

  dbInstance.post_login([req.query.params.email]) 
  .then((response) => {
    //  console.log(response)
    res.status(200).send(response)
  })
  .catch((error) => {
    // console.log(error)
    res.status(500).send('Fail to post new User!')
  });
}

module.exports = {
  getUsers,
  getFavlist,
  postUser,
  postlogin,
  getUserByID,
  editUserInfo
}