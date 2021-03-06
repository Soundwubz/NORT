const router = require("express").Router();
const db = require('../../models');

// Matches with "/api/user/signup"
router.route("/signup").post(
  (req, res, next) => {
    const {username, password} = req.body;
    if(username !== "") {
      db.User.findOne({username}, (err, user) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Error: Server Error',
            error: err
          });
        } else if(user !== null) {
          return res.send({
            success: false,
            message: 'Error: User already exists'
          });
        }
        const newUser = new db.User();

        newUser.username = username;
        newUser.password = newUser.hashPassword(password);
        newUser.save((err, user) => {
          if(err) {
            return res.send({
              success: false,
              message: 'Error: Server Error',
              error: err,
              newUser: user
            });
          }
          return res.send({
            success: true,
            message: 'Signed Up',
            newUser: user
          })
        })
      })
    }
  }
);

// Matches with "/api/user/verify"
router.route("/verify").get(
  (req, res, next) => {
    const {token} = req.query;
    
    db.UserSession.findOne({
      _id: token,
      isDeleted: false
    }, (err, session) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error',
          err: err
        });
      }      
      // if (sessions.length != 1) {
      //   return res.send({
      //     success: false,
      //     message: 'Error: Invalid'
      //   });
      // } else {
        // DO ACTION
        return res.send({
          success: true,
          message: 'Good',
          userId: session.userId
        });
      // }
    });
  }
)

// Matches with "/api/user"
router.route('/').get(
  (req, res, next)  => {
    const {token} = req.query;
    db.UserSession.findOne({_id: token, isDeleted: false}, (err, session) => {
      if(err) {
        res.send({
          success: false,
          message: 'Server Error',
          error: err
        });
      }
      console.log(session);
      if(session) {
        res.send({
          success: true,
          userId: session.userId
        })
      }
    })
  }
)


module.exports = router;