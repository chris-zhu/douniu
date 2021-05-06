"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("./fs");
var game_1 = __importDefault(require("./game"));
var poker_1 = require("./poker");
var user_1 = __importDefault(require("./user"));
var Leon = new user_1.default('Leon');
var Judy = new user_1.default('Judy');
var game = new game_1.default();
game.addUser(Leon);
game.addUser(Judy);
var handleCards = fs_1.getLJPoker();
for (var i = 0; i < handleCards.length; i++) {
    var parseArr = parseCards(handleCards[i]);
    if (parseArr.length === 0)
        continue; // 解析失败，手牌不正确
    game.start(parseArr);
}
/**
 * 解析手牌，解析成功返回手牌数组，不成功返回空数组
 * @param cds .txt的每一行手牌
 * @returns
 */
function parseCards(cds) {
    var result = [];
    var ResultReg = /([S|H|C|D]([A|2-9|J|Q|K]|10))/g; //match 手牌结果
    var CheckCardReg = /([S|H|C|D]([A|2-9|J|Q|K]|10)){5}/; // test 手牌是否正确
    if (CheckCardReg.test(cds[0]) && CheckCardReg.test(cds[1])) {
        for (var j = 0; j < cds.length; j++) {
            var arr = [];
            var tempArr = cds[j].match(ResultReg);
            for (var _i = 0, tempArr_1 = tempArr; _i < tempArr_1.length; _i++) {
                var cd = tempArr_1[_i];
                var type = cd[0];
                var value = cd.substr(1);
                arr.push(new poker_1.Card(type, value, poker_1.val2Score[value]));
            }
            result.push(arr);
        }
    }
    return result;
}
