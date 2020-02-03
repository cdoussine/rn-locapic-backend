const mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(
  'mongodb+srv://cdoussine:Acmsjm9000!@cluster0-jnkyk.mongodb.net/test?retryWrites=true&w=majority',
  options,
  function(err) {
    if (err) {
      console.log(
        `error, failed to connect to the database because --> ${err}`
      );
    } else {
      console.info('*** Locapic database coonection done ***');
    }
  }
);

module.exports = mongoose;
