const mongosse = require("mongoose")

const modelName = "User"

const schema = new mongosse.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 2,
  },
  profilePic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongosse.model(modelName, schema)

module.exports = model