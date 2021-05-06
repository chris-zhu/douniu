
import { getLJPoker } from './fs';
import Game from './game';
import { Card } from './poker';
import User from './user';

const Leon = new User('Leon')
const Judy = new User('Judy')

const game = new Game()
game.addUser(Leon)
game.addUser(Judy)

const handleCards = getLJPoker()
console.log(handleCards.length);

const ResultReg = /([S|H|C|D]([A|2-9|J|Q|K]|10))/g //match 手牌结果
const CheckCardReg = /([S|H|C|D]([A|2-9|J|Q|K]|10)){5}/ // test 手牌是否正确
let aa = 0
for (let i = 0; i < handleCards.length; i++) {
    let cds = handleCards[i]
    if (CheckCardReg.test(cds[0]) && CheckCardReg.test(cds[1])) {

    }
}



