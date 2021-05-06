import Game, { sum } from "../../src/game"
import { Card } from "../../src/poker"

test('判断手牌点数', () => {
    const cds1 = [
        new Card('S', '3', 3),
        new Card('H', '7', 7),
        new Card('C', '5', 5),
        new Card('D', 'Q', 10),
        new Card('H', '5', 5),
    ]
    const cds2 = [
        new Card('S', '3', 3),
        new Card('H', '5', 5),
        new Card('C', '4', 4),
        new Card('D', 'Q', 10),
        new Card('H', 'K', 10),
    ]
    const cds3 = [
        new Card('S', '5', 5),
        new Card('H', '2', 2),
        new Card('C', 'J', 10),
        new Card('D', 'Q', 10),
        new Card('H', 'K', 10),
    ]
    expect(Game.checkCount(cds1)).toBe(0)
    expect(Game.checkCount(cds2)).toBe(-1)
    expect(Game.checkCount(cds3)).toBe(7)
})

test('测试手牌是否规范', () => {
    const CheckCardReg = /([S|H|C|D]([A|2-9|J|Q|K]|10)){5}/
    const str1 = 'D4C5D3C'
    const str2 = 'C8CKS9H6'
    const str3 = 'DQSJD8C4DA'
    const str4 = 'C6D10C5S7H2'
    expect(CheckCardReg.test(str1)).toBeFalsy()
    expect(CheckCardReg.test(str2)).toBeFalsy()
    expect(CheckCardReg.test(str3)).toBeTruthy()
    expect(CheckCardReg.test(str4)).toBeTruthy()
})

test('求和函数', () => {
    expect(sum([1, 2, 3])).toBe(6)
})