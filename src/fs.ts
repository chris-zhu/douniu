import fs from 'fs'
import path from 'path'


export const leonWin = debounce(function (result: string) {
    fs.writeFileSync(path.resolve('./result/leno.txt'), result, {
        encoding: 'utf-8'
    })
}, 1000)

export const judyWin = debounce(function (result: string) {
    fs.writeFileSync(path.resolve('./result/judy.txt'), result, {
        encoding: 'utf-8'
    })
}, 1000)

function debounce(fn: (arg: string) => void, delay: number) {
    let timer: any = null
    let str = ``
    return function (newStr: string) {
        newStr += '\n'
        str += newStr
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(str)
        }, delay);
    }
}