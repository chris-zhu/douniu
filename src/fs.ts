import fs from 'fs'
import path from 'path'

const aimPath = path.resolve('./result')
const exist = fs.existsSync(aimPath)
if (!exist) fs.mkdirSync(aimPath)

export const leonWin = debounce(function (result: string) {
    existResult('leno.txt', result)
}, 1000)

export const judyWin = debounce(function (result: string) {
    existResult('judy.txt', result)
}, 1000)

export const errorCard = debounce(function (result: string) {
    existResult('error.txt', result)
}, 1000)

function debounce(fn: (arg: string) => void, delay: number) {
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

function existResult(filename: string, result: string) {
    fs.writeFileSync(path.resolve(aimPath, filename), result, { encoding: 'utf-8' })
}

export function getLJPoker() {
    let temp = fs.readFileSync(path.resolve('./public/LJ-poket.txt'), { encoding: 'utf-8' })
    const cards = temp.split('\r\n')
    return cards.map(el => el.split(';'))
}