import fs from 'fs'
import path from 'path'

const aimPath = path.resolve('./result')
const exist = fs.existsSync(aimPath)
if (!exist) fs.mkdirSync(aimPath)

function writeFile(filename: string, result: Set<string>) {
    const items = Array.from(result)
    const data = items.join('\r\n') + '\r\n'
    fs.writeFileSync(path.resolve(aimPath, filename), data, { encoding: 'utf-8' })
}

export const leonWin = (data: Set<string>) => {
    writeFile('leno.txt', data)
}

export const judyWin = (data: Set<string>) => {
    writeFile('judy.txt', data)
}

export function getAllPoker() {
    let temp = fs.readFileSync(path.resolve('./public/LJ-poket.txt'), { encoding: 'utf-8' })
    const cards = temp.split('\r\n')
    return cards.map(el => el.split(';'))
}
