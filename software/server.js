const express = require("express");
const chalk = require("chalk");
const log = console.log;

var SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

var sp = new SerialPort("/dev/tty.usbmodem14601", {
  baudRate: 115200,
});

var parser = new Readline();
sp.pipe(parser);

//this needs to be refined
parser.on("data", (line) => {
  let data = line.split(",");
  console.log(data[0] * (180 / Math.PI) + " " + data[1] * (180 / Math.PI));
  io.sockets.emit("message", data);
});

// setInterval(() => {
//   let rndAngle = Math.random() * 10;
//   sp.write(rndAngle + "\n");
// }, 5000);

let app = express();
const port = 8080;

var server = app.listen(port, () => {
  log("listening on port: " + port);
});

app.use(express.static("client", (hello) => {}));

var io = require("socket.io")(server);
io.on("connection", (socket) => {
  log(chalk.white(socket.id + " connected "));

  // setInterval(() => {
  //   socket.emit("message", Math.random() * 5);
  // }, 100);
});
