//モジュールの呼び出し
const express = require("express"),
  http = require("http"),
  path = require("path"),
  routes = require("./routes"),
  socketIO = require("socket.io");

//サーバ生成
const app = express();
const server = http.Server(app);
const io = socketIO(server);
server.listen(3000);

//app設定、要勉強
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
//app.use(express.favicon());　express4では不要
//app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
//app.use(express.logger('dev')); ログは今度勉強する
//app.use(express.bodyParser());　express4では不要
//app.use(express.methodOverride());　express4では不要
//app.use(app.router);　express4では不要
app.use(express.static(path.join(__dirname, "public")));

//ルーティング
app.get("/", routes.title);
app.get("/lobby", routes.lobby);

//クライアントとのやり取り
var playerId = 0;
io.sockets.on("connection", function (socket) {
  socket.handshake.playerId = playerId;
  playerId++;

  socket.on("joinLobby", function (data) {
    var Room = require("./public/javascripts/Room.js");
    var playerList = Room.updatePlayerList(
      { playerId: data.playerId },
      { name: data.name }
    );
    socket.handshake.playerList = playerList;
    io.sockets.emit("trnsLobby", { playerList: data.playerList });
  });

  socket.on("disconnect");
});
