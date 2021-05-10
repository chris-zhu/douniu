import { Card } from "../../src/poker"
import { checkCount, isCard, sum } from "../../src/util"

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
    // expect(checkCount(cds1)).toBe(0)
    // expect(checkCount(cds2)).toBe(-1)
    // expect(checkCount(cds3)).toBe(7)
    expect(checkCount([9, 9, 2, 7, 5])).toBe(2)
    expect(checkCount([3, 4, 4, 2, 8])).toBe(1)
    expect(checkCount([2, 8, 10, 5, 5])).toBe(10)
    expect(checkCount([2, 3, 4, 5, 6])).toBe(10)
    expect(checkCount([10, 10, 10, 10, 10])).toBe(10)
    expect(checkCount([10, 10, 3, 4, 3])).toBe(10)
    expect(checkCount([7, 7, 5, 5, 8])).toBe(2)
    expect(checkCount([7, 7, 7, 6, 6])).toBe(3)
})

// test('测试手牌是否规范', () => {
//     expect(isCard('DQSJD8C4DA')).toBeTruthy()
//     expect(isCard('C6D10C5S7H2')).toBeTruthy()
//     expect(isCard('D4C5D3C')).toBeFalsy()
//     expect(isCard('C8CKS9H6')).toBeFalsy()
//     expect(isCard('C5D7C5S6H3')).toBeFalsy()
//     expect(isCard('C5D7C5S10H3')).toBeFalsy()
//     expect(isCard('C10C10C5D5H3')).toBeFalsy()
// })

// test('求和函数', () => {
//     expect(sum([1, 2, 3])).toBe(6)
// })
