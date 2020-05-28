require("dotenv").config();

const app = require("./server");
const config = require("./configs/config");

// Server is listening
app.listen(app.get("port"), () => {
  // console.log("Server on port", app.get("port"));
  // console.log("Environment:", process.env.PORT);
});