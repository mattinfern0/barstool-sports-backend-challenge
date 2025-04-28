const { Model } = require('app/modules/common')
require('mongoose')
const mongoose = require('mongoose')

class NoteModel extends Model {
  // Assuming title and message can be empty strings
  schema() {
    return {
      title: {
        type: String,
        trim: true,
        required: true
      },
      message: {
        type: String,
        trim: true,
        required: true
      },
      userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      }
    }
  }
}

module.exports = NoteModel
