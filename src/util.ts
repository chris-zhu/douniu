import { Card } from "./poker"

interface IObj {
    [key: string]: number
}
export const val2Score: IObj = {
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
}
export const cardValue: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
export const cardType: string[] = ['S', 'H', 'C', 'D']

/**
 * 解析手牌，解析成功返回手牌数组，不成功返回空数组
 * @param cds PJ-poker.txt的每一行手牌
 * @returns Card[][]
 */
export function parseCards(cds: string[]): Card[][] {
    const result: Card[][] = []
    const ResultReg = /([SHCD]([2-9AJQK]|10))/g
    if (isCard(cds[0]) && isCard(cds[1]) && !hasSameCard(cds)) {
        for (const cdStr of cds) {
            const arr: Card[] = []
            const tempArr = cdStr.match(ResultReg) as RegExpMatchArray
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

/**
 * 判断发牌时两副牌是否有重复牌  e.g. ['DQSJD8C4DA','H3C9H7DQS2'] // DQ 重复
 * @param cds card string
 */
export function hasSameCard(cds: string[]): boolean {
    const ResultReg = /([SHCD]([2-9AJQK]|10))/g
    const c1 = cds[0].match(ResultReg) as RegExpMatchArray
    const c2 = cds[1].match(ResultReg) as RegExpMatchArray
    const cdsSet = new Set([...c1, ...c2])
    return cdsSet.size !== 10
}

/** 判断卡牌是否符合规范 */
export function isCard(cd: string): boolean {
    const ResultReg = /([SHCD]([2-9AJQK]|10))/g
    const CheckCardReg = /^([SHCD]([2-9AJQK]|10)){5}$/
    if (CheckCardReg.test(cd)) {
        const cSet = new Set(cd.match(ResultReg))
        return cSet.size === 5
    }
    return false
}

export const sum = (arr: number[]) => arr.reduce((prev, next) => prev + next, 0)

/**
 * 找出最大的手牌
 * @param cards 手牌
 */
export function findMaxCard(cards: Card[]): Card {
    const valIndexs = cards.map((card: Card) => card.valIndex)
    const maxValIndex = Math.max(...valIndexs)
    const filterValArr = cards.filter((card: Card) => card.valIndex === maxValIndex)
    const typeIndexs = filterValArr.map((card: Card) => card.typeIndex)
    const minTypeIndex = Math.min(...typeIndexs)
    const index = typeIndexs.indexOf(minTypeIndex)
    return filterValArr[index]
}

/**
 * 比较两张牌谁大
 * @param c1 Card
 * @param c2 Card
 * @returns {boolean} true: c1 大， 反之亦然
 */
export function compare(c1: Card, c2: Card): boolean {
    if (c1.valIndex < c2.valIndex) return false
    if (c1.valIndex > c2.valIndex) return true
    return c1.typeIndex < c2.typeIndex //点数相同比较花色
}

export function checkCount(array: number[]): number {
    const len = array.length
    let score = 0
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            for (let k = j + 1; k < len; k++) {
                if ((array[i] + array[j] + array[k]) % 10 === 0) {
                    const scoreArr = Object.keys(array)
                        .filter(index => Number(index) !== i && Number(index) !== j && Number(index) !== k)
                        .map(index => array[Number(index)])
                    score = sum(scoreArr)
                    break
                }
            }
        }
    }
    return score > 10 ? score - 10 : score
}
