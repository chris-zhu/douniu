
import { judyWin, leonWin } from './fs'
import Poker, { Card } from './poker'
import User from './user'
import { permute, sum } from './util'

export enum MatchEnum {
    Win = -1,
    Draw,
    Lost,
    Same
}

export default class Game {
    private users: User[] = []
    private poker: Poker
    constructor() {
        this.poker = Poker.getInstance()
        this.users = [new User('leno'), new User('judy')]
    }

    start() {
        const cds = this.poker.deal()
        if(!cds.length) return
        this.nextGame(cds)
    }

    private nextGame(cdsArr: Card[][]) {
        this.users.forEach((user, i) => {
            user.clear()
            user.cards = cdsArr[i]
        })
        const result = this.match(this.users[0].cards, this.users[1].cards)
        this.handleResult(result)
        this.start()
    }

    /**
     * 处理比较结果
     * @param result number
     */
    private handleResult(result: number) {
        switch (result) {
            case MatchEnum.Win: // leon win
                leonWin(`${this.users[0].cards.map(card => card.name).join('')};${this.users[1].cards.map(card => card.name).join('')}`)
                break;
            case MatchEnum.Lost: // judy win
                judyWin(`${this.users[0].cards.map(card => card.name).join('')};${this.users[1].cards.map(card => card.name).join('')}`)
                break;
            case MatchEnum.Same: // leon === judy
                const leonMaxCard = this.findMaxCard(this.users[0].cards)
                const judyMaxCard = this.findMaxCard(this.users[1].cards)
                const res = this.compare(leonMaxCard, judyMaxCard)
                if (res) this.handleResult(MatchEnum.Win)
                else this.handleResult(MatchEnum.Lost)
                break;
            case MatchEnum.Draw: // 都没有牛
                this.handleResult(MatchEnum.Same)
                break;
            default:
                break;
        }
    }

    /**
     * 判断当前数组是否有牛
     * @param cards 牌
     * @returns number -1: 没有  0：牛牛  {number}: 牛{number}
     */
    static checkCount(cards: Card[]) {
        const scoreArr = cards.map(cd => cd.score)
        const temp = permute(scoreArr)
        const result = []
        for (let i = 0; i < temp.length; i++) {
            const prev = temp[i].slice(0, 3) as number[]
            const next = temp[i].slice(3) as number[]
            const sumA = sum(prev)
            const sumB = sum(next)
            if (sumA % 10 === 0) {
                result.push(sumB % 10)
            }
        }
        return result.length === 0 ? -1 : Math.max(...result)
    }

    /**
     * 比赛，判断两组数组谁获胜,前者向后者对比
     * @param one user1 的手牌
     * @param two user2 的手牌
     * @returns {number} MatchEnum  
     */
    private match(cds1: Card[], cds2: Card[]): number {
        const result1 = Game.checkCount(cds1)
        const result2 = Game.checkCount(cds2)
        if (result1 === -1 && result2 === -1) return MatchEnum.Draw
        else if (result1 > result2) return MatchEnum.Win
        else if (result1 < result2) return MatchEnum.Lost
        return MatchEnum.Same
    }

    /**
     * 找出最大的手牌
     * @param cards 手牌
     */
    private findMaxCard(cards: Card[]): Card {
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
    private compare(c1: Card, c2: Card): boolean {
        if (c1.valIndex < c2.valIndex) return false
        else if (c1.valIndex > c2.valIndex) return true
        else { // 点数相同比较花色
            if (c1.typeIndex < c2.typeIndex) return true
            return false
        }
    }
}
