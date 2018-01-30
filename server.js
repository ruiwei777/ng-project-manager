//Install express server
const express = require('express');
const app = express();
const path = require("path");

// Serve only the static files form the dist directory

const router = express.Router();

app.use(express.static(__dirname + '/dist'));

const indexCtrl = function (req, res) {
  res.sendFile(path.join(__dirname, "src", "index.html"));
}
router.get(/.*/, indexCtrl);


app.use(/.*/, router);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);