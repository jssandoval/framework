require("dotenv").config();
const envVars = process.env;

module.exports = {
  port: envVars.PORT,
  //port: 3000,
  SecretKey: envVars.SECRET_KEY,
  jwtSecret: envVars.SECRET_JWT,
  SessionTime: envVars.SESSION_TIME, //60 * 60 * 2,
  mongo: {
    uri: envVars.URI_MONGO + ":" + envVars.PORT_MONGO + "/" + envVars.DB_MONGO,
    port: envVars.PORT_MONGO,
    isDebug: envVars.ISDEBUG_MONGO,
  },
};
