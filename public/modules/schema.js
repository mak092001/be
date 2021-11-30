let mongo = require("mongoose");
let createschema = new mongo.Schema({
  task: {
    type: String,
    required: true,
  },
});
module.exports = mongo.model("todo", createschema);
