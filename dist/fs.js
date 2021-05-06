"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var aimPath = path_1.default.resolve('./result');
var exist = fs_1.default.existsSync(aimPath);
if (!exist)
    fs_1.default.mkdirSync(aimPath);
exports.leonWin = debounce(function (result) {
    existResult('leno.txt', result);
}, 1000);
exports.judyWin = debounce(function (result) {
    existResult('judy.txt', result);
}, 1000);
function debounce(fn, delay) {
    var timer = null;
    var resultSet = new Set();
    return function (newStr) {
        resultSet.add(newStr);
        clearTimeout(timer);
        timer = setTimeout(function () {
            var items = Array.from(resultSet);
            fn(items.join('\n'));
        }, delay);
    };
}
function existResult(filename, result) {
    fs_1.default.writeFileSync(path_1.default.resolve(aimPath, filename), result, { encoding: 'utf-8' });
}
function getLJPoker() {
    var temp = fs_1.default.readFileSync(path_1.default.resolve('./public/LJ-poket.txt'), { encoding: 'utf-8' });
    var cards = temp.split('\r\n');
    return cards.map(function (el) { return el.split(';'); });
}
exports.getLJPoker = getLJPoker;
