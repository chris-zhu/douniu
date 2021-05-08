import Game from "../../src/game"
import { Card } from "../../src/poker"
import { isCard, sum } from "../../src/util"

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
    const str1 = 'DQSJD8C4DA' // 正确牌  true
    const str2 = 'C6D10C5S7H2' // 带 10 点正确牌  true
    const str3 = 'D4C5D3C' // 少牌   false
    const str4 = 'C8CKS9H6' // 少牌  false
    const str5 = 'C5D7C5S6H3' // 重复牌 false
    const str6 = 'C5D7C5S10H3' // 带 10点 重复牌 false
    const str7 = 'C10C10C5D5H3' // 10点 重复牌  false

    expect(isCard(str1)).toBeTruthy()
    expect(isCard(str2)).toBeTruthy()
    expect(isCard(str3)).toBeFalsy()
    expect(isCard(str4)).toBeFalsy()
    expect(isCard(str5)).toBeFalsy()
    expect(isCard(str6)).toBeFalsy()
    expect(isCard(str7)).toBeFalsy()
})

test('求和函数', () => {
    expect(sum([1, 2, 3])).toBe(6)
})
