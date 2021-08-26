const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  const {
    username
    // any other properties you need
  } = req.body

  User.register(new User({
    username
    // any other properties you need
  }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})



router.get('/user',
  passport.authenticate('jwt'), 
  (req, res) => User.findOne({
    where: { id: req.user.id }
    // , include: [Comment]
  })
    .then(userData => res.json(userData))
    .catch(err => console.log(err)))


// router.get('/user', (req, res) => {
//   res.json (req.user.username)
// }
 


module.exports = router