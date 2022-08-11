//変数宣言
var playerList = new Array;


//playerクラスの呼び出し
const PLAYER = require('./player').player;
const HAI = require('./hai').hai;

//ルームクラス
class room{
    constructor(room){
        this.room = room;
    }
}

//playerListの更新を行う
function updatePlayerList(playerId, playerName){
    var i = playerList.length;
    playerList[i] = new player.playerInfo;

    return playerList;
}

//roomクラスを外部に公開
module.export = room;

//山牌作成(仮)
const CY = new hai.createYamahai();