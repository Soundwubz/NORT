const express = require('express'),
  logoutRouter = express.Router();

const db = require('../../models');


  // matches with "api/logout"
logoutRouter.get('/', (req,res,next) => {
    const {token} = req.query;
    db.UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted: true
      }
    }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: server error',
          error: err
        });
      }
      return res.send({
        success: true,
        message: 'logout success'
      })
    });
});

module.exports = logoutRouter;