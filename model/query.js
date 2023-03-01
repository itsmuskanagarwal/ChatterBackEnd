const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let query = new Schema(
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      contact: {
        type: String,
      },
      message: {
        type: String,
      },
    },
    {
      collection: "queries",
    }
  );
  
  module.exports = mongoose.model("queries", query);
  