"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var OrderType;
(function (OrderType) {
    OrderType["one"] = "I";
    OrderType["two"] = "II"; // 一人摸几张
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var Card = /** @class */ (function () {
    function Card(type, value, score) {
        this.name = type + value;
        this.type = type;
        this.value = value;
        this.score = score;
        this.typeIndex = exports.cardType.indexOf(type);
        this.valIndex = exports.cardValue.indexOf(value);
    }
    return Card;
}());
exports.Card = Card;
exports.val2Score = {
    'A': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'Q': 10,
    'K': 10,
};
exports.cardValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
exports.cardType = ['S', 'H', 'C', 'D'];
var Poker = /** @class */ (function () {
    function Poker(isShuffle) {
        var _this = this;
        this.cards = [];
        /**
         * 洗牌，打乱当前牌堆
         * @returns
         */
        this.shuffle = function () {
            if (_this.cards.length !== exports.cardType.length * exports.cardValue.length) {
                _this.cards.length = 0;
                _this.initPoker(true);
            }
            else {
                _this.cards.sort(function () { return Math.random() - 0.5; });
            }
        };
        /**
         * 发牌
         * @param option IDealOption
         * @returns Card[][]
         */
        this.deal = function (option) {
            var _a;
            if (option.userNum * option.total > _this.cards.length)
                return null;
            var result = [];
            var orderType = __assign({}, OrderType);
            if (option.type === true) { // 随机抽牌
                for (var i = 0; i < option.userNum; i++) {
                    var cards = [];
                    for (var j = 0; j < option.total; j++) {
                        var index = Math.floor(Math.random() * _this.cards.length);
                        cards.push.apply(cards, _this.cards.splice(index, 1));
                    }
                    result.push(cards);
                }
            }
            else if (option.type === orderType.one) { // 顺序抽牌
                for (var i = 0; i < option.userNum; i++) {
                    result.push([]);
                }
                for (var i = 0, len = _this.cards.length; i < len; i++) {
                    var index = i % option.userNum;
                    (_a = result[index]).push.apply(_a, _this.cards.splice(0, 1));
                    if (option.userNum * option.total === i + 1)
                        break;
                }
            }
            else if (option.type === orderType.two) {
                for (var i = 0; i < option.userNum; i++) {
                    result.push(_this.cards.splice(0, option.total));
                }
            }
            return result;
        };
        this.initPoker(isShuffle);
    }
    /**
     * 是否洗牌，默认洗牌
     * @param isShuffle 默认 true
     * @returns
     */
    Poker.getCards = function (isShuffle) {
        if (isShuffle === void 0) { isShuffle = true; }
        if (!Poker.instance) {
            Poker.instance = new Poker(isShuffle);
        }
        return Poker.instance;
    };
    // 初始化牌堆
    Poker.prototype.initPoker = function (isShuffle) {
        for (var i = 0, typeLen = exports.cardType.length; i < typeLen; i++) {
            for (var j = 0, valLen = exports.cardValue.length; j < valLen; j++) {
                this.cards.push(new Card(exports.cardType[i], exports.cardValue[j], exports.val2Score[exports.cardValue[j]]));
            }
        }
        isShuffle && this.shuffle();
    };
    return Poker;
}());
exports.default = Poker;
