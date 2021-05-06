
import { errorCard, getLJPoker } from './fs';
import Game from './game';
import { Card, val2Score } from './poker';
import User from './user';

const Leon = new User('Leon')
const Judy = new User('Judy')

const game = new Game()
game.addUser(Leon)
game.addUser(Judy)

const handleCards = getLJPoker()
for (let i = 0; i < handleCards.length; i++) {
    const parseArr = parseCards(handleCards[i])
    if (parseArr.length === 0) { // 解析失败，手牌不正确
        errorCard(handleCards[i].join(';'))
        continue
    }
    game.start(parseArr)
}

/**
 * 解析手牌，解析成功返回手牌数组，不成功返回空数组
 * @param cds .txt的每一行手牌
 * @returns Card[][]
 */
function parseCards(cds: string[]) {
    const result: Card[][] = []
    const ResultReg = /([S|H|C|D]([A|2-9|J|Q|K]|10))/g
    const CheckCardReg = /([S|H|C|D]([A|2-9|J|Q|K]|10)){5}/
    if (CheckCardReg.test(cds[0]) && CheckCardReg.test(cds[1])) {
        for (let j = 0; j < cds.length; j++) {
            const arr: Card[] = []
            const tempArr = cds[j].match(ResultReg) as RegExpMatchArray
            for (const cd of tempArr) {
                const type = cd[0]
                const value = cd.substr(1)
                arr.push(new Card(type, value, val2Score[value]))
            }
            result.push(arr)
        }
    }
    return result
}