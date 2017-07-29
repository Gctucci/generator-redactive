'use strict'
var bcrypt = require('bcrypt')
var restful = require('node-restful')
var mongoose = restful.mongoose

// Value for salting the hashed password
const SALT_WORK_FACTOR = 10

// Function for email validation
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    index: {
      unique: true
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [
      validateEmail, 'Please fill in a valid email address.'
    ],
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  // Sets default version of the database, for API handling purposes
  db_version: {
    type: String,
    default: 'v1.0'
  }
}, {timestamps: true})

// Hashes the password before saving
userSchema.pre('save', function(next) {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password'))
    return next()

    // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err)
      return next(err)

      // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err)
        return next(err)

        // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

// Function to compare a new password and check if it is authenticated
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err)
      return cb(err)
    cb(null, isMatch)
  })
}

var Users = restful.model('User', userSchema).methods(['get', 'post', 'put', 'delete'])

module.exports = Users
