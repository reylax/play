const pbkdf2 = require('pbkdf2')
const crypto = require('crypto')



module.exports = {
  hashPassword: function(password) {
    var salt = crypto.randomBytes(32).toString('base64');
    var hash = pbkdf2.pbkdf2Sync(password, salt, 1, 64).toString('base64');
    return { salt, hash };
  },
  
  isPasswordCorrect: function(savedHash, savedSalt, passwordAttempt) {
    return savedHash === pbkdf2.pbkdf2Sync(passwordAttempt, savedSalt, 1, 64).toString('base64');
  },
}

