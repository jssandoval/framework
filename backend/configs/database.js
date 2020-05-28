const mongoose = require("mongoose");
const config = require("../configs/config");

mongoose
  .connect(config.mongo.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB conneced"))
  .catch((err) => console.error(err));
