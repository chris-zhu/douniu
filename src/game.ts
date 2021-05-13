import { judyWin, leonWin } from './fs'
import Poker, { Card } from './poker'
import User from './user'
import { checkCount, compare, findMaxCard } from './util'

export enum MatchEnum {
    Win = -1,
    Lost,
    Same
}

export default class Game {
    private users: User[] = []
    private poker: Poker
    private lenoData = new Set<string>()
    private judyData = new Set<string>()

    constructor() {
        this.poker = new Poker()
        this.users = [new User('leno'), new User('judy')]
    }

    start() {
        const cds = this.poker.deal()
        if (!cds) return this.over()
        this.nextGame(cds)
    }

    private over() {
        leonWin(this.lenoData)
        judyWin(this.judyData)
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
        const data = `${this.users[0].cards.map(card => card.name).join('')};${this.users[1].cards.map(card => card.name).join('')}`
        switch (result) {
            case MatchEnum.Win: // leon win
                this.lenoData.add(data)
                break;
            case MatchEnum.Lost: // judy win
                this.judyData.add(data)
                break;
            case MatchEnum.Same: // leon === judy
                const leonMaxCard = findMaxCard(this.users[0].cards)
                const judyMaxCard = findMaxCard(this.users[1].cards)
                this.handleResult(compare(leonMaxCard, judyMaxCard) ? MatchEnum.Win : MatchEnum.Lost)
                break;
            default:
                break;
        }
    }

    /**
     * 比赛，判断两组数组谁获胜,前者向后者对比
     * @param one user1 的手牌
     * @param two user2 的手牌
     * @returns {number} MatchEnum  
     */
    private match(cds1: Card[], cds2: Card[]): number {
        const result1 = checkCount(cds1.map(cd => cd.score))
        const result2 = checkCount(cds2.map(cd => cd.score))
        if (result1 > result2) return MatchEnum.Win
        if (result1 < result2) return MatchEnum.Lost
        return MatchEnum.Same
    }
}
