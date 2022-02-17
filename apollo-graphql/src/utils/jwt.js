require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtprivateKey = process.env.jwtPrivateKey

module.exports = {
  generateToken: function(_id, username) {
    const token = jwt.sign(
      { 
        _id,
        username, 
      }, 
      jwtprivateKey, 
      {
        algorithm: "HS512",
        expiresIn: "30 days",
      }); 
    return token
  }
}