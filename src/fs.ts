import fs from 'fs'
import path from 'path'
import { debounce } from './util'

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

function existResult(filename: string, result: string) {
    fs.writeFileSync(path.resolve(aimPath, filename), result, { encoding: 'utf-8' })
}

export function getAllPoker() {
    let temp = fs.readFileSync(path.resolve('./public/LJ-poket.txt'), { encoding: 'utf-8' })
    const cards = temp.split('\r\n')
    return cards.map(el => el.split(';'))
}
