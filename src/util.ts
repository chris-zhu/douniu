import { Card } from "./poker"
import { IObj } from "./type"

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
export function parseCards(cds: string[]) {
    const result: Card[][] = []
    if (isCard(cds[0]) && isCard(cds[1])) {
        const ResultReg = /([SHCD]([2-9AJQK]|10))/g
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

/** 判断卡牌是否符合规范 */
export function isCard(cd: string): boolean {
    const ResultReg = /([SHCD]([2-9AJQK]|10))/g
    const CheckCardReg = /([SHCD]([2-9AJQK10?]|10)){5}/
    if (CheckCardReg.test(cd)) {
        const cSet = new Set(cd.match(ResultReg))
        return cSet.size === 5
    }
    return false
}

export function debounce(fn: (arg: string) => void, delay: number) {
    let timer: any = null
    let resultSet = new Set()
    return function (newStr: string) {
        resultSet.add(newStr)
        clearTimeout(timer)
        timer = setTimeout(() => {
            const items = Array.from(resultSet)
            fn(items.join('\r\n'))
        }, delay);
    }
}

export const sum = (arr: number[]) => arr.reduce((prev, next) => prev + next, 0)

/**
 * 对数组进行排列
 * @param input 
 * @returns number[][]
 */
export function permute(input: number[]) {
    var permArr: number[][] = [],
        usedChars: number[] = [];
    function main(input: number[]) {
        var i, ch;
        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length == 0) {
                permArr.push(usedChars.slice());
            }
            main(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        }
        return permArr
    }
    return main(input);
}
