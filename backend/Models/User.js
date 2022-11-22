const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
  name: {
    type: Object
  },
  username: {
    type: Object, unique: true
  },
  email: {
    type: Object, unique: true
  },
  password: {
    type: Object
  },
  role: {
    type: Object, default: 'student'
    },
  status: {
    type: Object, default: 'true'
  }
}, {
    collection: 'users'
  })
module.exports = mongoose.model('User', userSchema)