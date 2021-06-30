const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const ip = require("ip")
const dotenv = require('dotenv');
const router = require("./network/router");
const db = require("./db");

dotenv.config();

app.use(express.json())
app.use(cors([{origin:'*', credentials:true}]));
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.set('port', process.env.PORT);

server.listen(process.env.PORT, () => {
	console.log(`La app está en ->${ip.address()}:${process.env.PORT}`);
});

router(app)
db(process.env.MONGO_DB_CONNECTION)

app.get("/", (req, res) => {
	res.send({res:"Perra hpta"});
});