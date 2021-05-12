import { Card } from "../../src/poker"
import { checkCount, compare, findMaxCard, hasSameCard, isCard, parseCards, sum } from "../../src/util"

test('判断手牌分数', () => {
    expect(checkCount([9, 9, 2, 7, 5])).toBe(2)
    expect(checkCount([3, 4, 4, 2, 8])).toBe(1)
    expect(checkCount([2, 3, 4, 5, 6])).toBe(10)
    expect(checkCount([4, 9, 3, 7, 6])).toBe(9)
    expect(checkCount([2, 8, 10, 5, 5])).toBe(10)
    expect(checkCount([6, 7, 8, 9, 10])).toBe(0)
    expect(checkCount([10, 10, 3, 4, 3])).toBe(10)
    expect(checkCount([10, 10, 9, 2, 9])).toBe(10)
    expect(checkCount([10, 10, 8, 3, 9])).toBe(10)
    expect(checkCount([10, 10, 10, 8, 2])).toBe(10)
    expect(checkCount([10, 10, 10, 10, 2])).toBe(2)
    expect(checkCount([10, 10, 10, 10, 10])).toBe(10)
    expect(checkCount([7, 7, 5, 5, 8])).toBe(2)
    expect(checkCount([7, 7, 7, 6, 6])).toBe(3)
})

test('判断手牌是否规范', () => {
    expect(isCard('DQSJD8C4DA')).toBeTruthy()
    expect(isCard('C6D10C5S7H2')).toBeTruthy()
    expect(isCard('D4C5D3C')).toBeFalsy()
    expect(isCard('C8CKS9H6')).toBeFalsy()
    expect(isCard('C5D7C5S6H3')).toBeFalsy()
    expect(isCard('C5D7C5S10H3')).toBeFalsy()
    expect(isCard('C10C10C5D5H3')).toBeFalsy()
    expect(isCard('H9HQD2S10C42')).toBeFalsy()
})

test('找出最大手牌', () => {
    const cds1 = parseCards(['DQSJD8C4DA', 'C6D10C5S7H2'])
    expect(findMaxCard(cds1[0])).toEqual(new Card('D', 'Q', 10))
    expect(findMaxCard(cds1[1])).toEqual(new Card('D', '10', 10))

    const cds2 = parseCards(['HQSQC10C4D5', 'S10DKC8S2H3'])
    expect(findMaxCard(cds2[0])).toEqual(new Card('S', 'Q', 10))
    expect(findMaxCard(cds2[1])).toEqual(new Card('D', 'K', 10))
})

test('是否有重复牌', () => {
    expect(hasSameCard(['DQSJD8C4DA', 'H3C9H7DQS2'])).toBeTruthy()
    expect(hasSameCard(['D9DAD5H10C2', 'S2C5D5DKH9'])).toBeTruthy()
    expect(hasSameCard(['D5D8H8SQS9', 'S6C9H10DQD3'])).toBeFalsy()
    expect(hasSameCard(['H2CAH5S7D7', 'C8DAD8CQH3'])).toBeFalsy()
})

test('比较两张牌谁大', () => {
    expect(compare(new Card('S', '10', 10), new Card('D', '6', 6))).toBeTruthy()
    expect(compare(new Card('S', '10', 10), new Card('S', 'K', 10))).toBeFalsy()
    expect(compare(new Card('D', '10', 10), new Card('S', '10', 10))).toBeFalsy()
    expect(compare(new Card('S', 'Q', 10), new Card('D', 'Q', 10))).toBeTruthy()
    expect(compare(new Card('H', '3', 10), new Card('D', '6', 6))).toBeFalsy()
})

test('求和函数', () => {
    expect(sum([1, 2, 3])).toBe(6)
})
