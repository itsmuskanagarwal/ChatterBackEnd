const query = require("../model/query");

//Registering a new user 
const submitQuery = async (req, res) => {

    try {
      //Add a query
      const query = new query({
        name: req.body.username,
        contact: req.body.contact,
        email: req.body.email,
        password: req.body.message,
      });
  
      const result = await query.save();
      res.send("Query Submitted" + result);
    } catch (err) {
      res.send("Error" + err);
    }
  };
  
  module.exports = {
    submitQuery,
  };
  