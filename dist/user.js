"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(name) {
        var _this = this;
        this.cards = []; //当前用户的手牌
        /** 清空手牌 */
        this.clear = function () { return _this.cards.length = 0; };
        this.name = name;
    }
    return User;
}());
exports.default = User;
