"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("./fs");
var poker_1 = __importStar(require("./poker"));
var MatchEnum;
(function (MatchEnum) {
    MatchEnum[MatchEnum["Win"] = -1] = "Win";
    MatchEnum[MatchEnum["Draw"] = 0] = "Draw";
    MatchEnum[MatchEnum["Lost"] = 1] = "Lost";
    MatchEnum[MatchEnum["Same"] = 2] = "Same";
})(MatchEnum || (MatchEnum = {}));
/**
 * 排列组合
 * @param input
 * @returns
 */
function permute(input) {
    var permArr = [], usedChars = [];
    function main(input) {
        var i, ch;
        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length == 0) {
                permArr.push(usedChars.slice());
            }
            main(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        }
        return permArr;
    }
    return main(input);
}
;
var sum = function (arr) { return arr.reduce(function (prev, next) { return prev + next; }, 0); };
var Game = /** @class */ (function () {
    function Game() {
        this.users = [];
        this.poker = poker_1.default.getCards(false);
    }
    Game.prototype.addUser = function (user) {
        if (this.users.length * 5 < poker_1.cardValue.length * poker_1.cardType.length) {
            this.users.push(user);
            return;
        }
        console.log('房间人数已满');
    };
    Game.prototype.showUsers = function () {
        return this.users;
    };
    /**
     * 游戏开始
     * @param cds 指定发的牌
     * @returns
     */
    Game.prototype.start = function (cds) {
        var _this = this;
        if (this.users.length < 2)
            return;
        this.users.forEach(function (user) { return user.clear(); });
        var userCards = [];
        if (!cds || cds.length === 0) {
            this.poker.shuffle();
            var option = {
                userNum: this.users.length,
                total: 5,
                type: poker_1.OrderType.two
            };
            userCards = this.poker.deal(option);
        }
        else {
            userCards = __spreadArrays(cds);
        }
        userCards.forEach(function (arr, i) {
            _this.users[i].cards = arr;
        });
        var result = this.match(this.users[0].cards, this.users[1].cards);
        this.handleResult(result);
    };
    /**
     * 处理比较结果   // TODO  可优化  扩展多人玩法 可优化
     * @param result number
     */
    Game.prototype.handleResult = function (result) {
        switch (result) {
            // leon win
            case MatchEnum.Win:
                fs_1.leonWin(this.users[0].cards.map(function (card) { return card.name; }).join('') + ";" + this.users[1].cards.map(function (card) { return card.name; }).join(''));
                break;
            // judy win
            case MatchEnum.Lost:
                fs_1.judyWin(this.users[1].cards.map(function (card) { return card.name; }).join('') + ";" + this.users[0].cards.map(function (card) { return card.name; }).join(''));
                break;
            // leon === judy
            case MatchEnum.Same:
                var leonMaxCard = this.findMaxCard(this.users[0].cards);
                var judyMaxCard = this.findMaxCard(this.users[1].cards);
                var res = this.compare(leonMaxCard, judyMaxCard);
                if (res)
                    this.handleResult(MatchEnum.Win);
                else
                    this.handleResult(MatchEnum.Lost);
                break;
            // 都没有牛
            case MatchEnum.Draw:
                this.handleResult(MatchEnum.Same);
                break;
            default:
                break;
        }
    };
    /**
     * 判断当前数组是否有牛
     * @param cards 牌
     * @returns number -1: 没有  0：牛牛  {number}: 牛{number}
     */
    Game.prototype.checkCount = function (cards) {
        var numArr = cards.map(function (cd) { return cd.score; });
        var temp = permute(numArr);
        var result = [];
        for (var i = 0; i < temp.length; i++) {
            var a = temp[i].slice(0, 3);
            var b = temp[i].slice(3);
            var sumA = sum(a);
            var sumB = sum(b);
            if (sumA % 10 === 0) {
                result.push(sumB % 10);
            }
        }
        return result.length === 0 ? -1 : Math.max.apply(Math, result);
    };
    /**
     * 比赛，判断两组数组谁获胜,前者向后者对比  // TODO 可优化，这里只比较了两个人，可以扩展多人玩法  ...cards: Card[][]
     * @param one user1 的手牌
     * @param two user2 的手牌
     * @returns {number} MatchEnum
     */
    // private match(...cards: Card[][]): number {
    //     const results = cards.map(cds => this.checkCount(cds))
    //     const result1 = this.checkCount(cds1)
    //     const result2 = this.checkCount(cds2)
    //     if (result1 === -1 && result2 === -1) return MatchEnum.Draw // 都无牛
    //     else if (result1 > result2) return MatchEnum.Win // 前者胜
    //     else if (result1 < result2) return MatchEnum.Lost // 后者胜
    //     return MatchEnum.Same // 都有牛，但是相同
    // }
    Game.prototype.match = function (cds1, cds2) {
        var result1 = this.checkCount(cds1);
        var result2 = this.checkCount(cds2);
        if (result1 === -1 && result2 === -1)
            return MatchEnum.Draw; // 都无牛
        else if (result1 > result2)
            return MatchEnum.Win; // 前者胜
        else if (result1 < result2)
            return MatchEnum.Lost; // 后者胜
        return MatchEnum.Same; // 都有牛，但是相同
    };
    /**
     * 找出最大的手牌
     * @param cards 手牌
     */
    Game.prototype.findMaxCard = function (cards) {
        var valIndexs = cards.map(function (card) { return card.valIndex; });
        var maxValIndex = Math.max.apply(Math, valIndexs);
        var filterValArr = cards.filter(function (card) { return card.valIndex === maxValIndex; });
        var typeIndexs = filterValArr.map(function (card) { return card.typeIndex; });
        var minTypeIndex = Math.min.apply(Math, typeIndexs);
        var index = typeIndexs.indexOf(minTypeIndex);
        return filterValArr[index];
    };
    /**
     * 比较两个牌谁大
     * @param c1 Card
     * @param c2 Card
     * @returns {boolean} true: c1 大， 反之亦然
     */
    Game.prototype.compare = function (c1, c2) {
        if (c1.valIndex < c2.valIndex)
            return false;
        else if (c1.valIndex > c2.valIndex)
            return true;
        else { // 点数相同比较花色
            if (c1.typeIndex < c2.typeIndex)
                return true;
            return false;
        }
    };
    return Game;
}());
exports.default = Game;
