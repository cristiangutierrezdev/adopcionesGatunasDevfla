const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  is_adopted: {
    type: Boolean,
    default: false
  },
  first_owner: {
    type: [{
      name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      celphone: {
        type: Number,
        required: true
      }
    }],
    required: true
  },
  current_owner: {
    type: [{
      name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      celphone: {
        type: Number,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    }]
  },
  likes: {
    type: Number
  },
  comments: {
    type: [{
      user_comment: {
        type: String
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }]
  }
}, { timestamps: true })

const Cat = mongoose.model('Cat', catSchema)

module.exports = { Cat }
