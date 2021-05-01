
import { judyWin, leonWin } from './fs';
import Poker, { IDealOption, OrderType, Card, cardType, cardValue } from './poker'
import User from './user';

enum MatchEnum {
    Win = -1,
    Draw,
    Lost,
    Same
}

export default class Game {

    private users: User[] = []
    private poker: Poker
    constructor() {
        this.poker = Poker.getCards(false)
    }

    addUser(user: User) {
        if (this.users.length * 5 < cardValue.length * cardType.length) {
            this.users.push(user)
            return
        }
        console.log('房间人数已满');
    }

    showUsers() {
        return this.users
    }

    start() {
        if (this.users.length < 2) return
        this.users.forEach(user => user.clear())
        this.poker.shuffle()
        const option: IDealOption = {
            userNum: this.users.length,
            total: 5,
            type: OrderType.two
        }
        const userCards = this.poker.deal(option) as Card[][]
        userCards.forEach((arr, i) => {
            this.users[i].cards = arr
        });
        const result = this.match(this.users[0].cards, this.users[1].cards)
        this.handleResult(result)
    }

    /**
     * 处理比较结果   // TODO  可优化  扩展多人玩法 可优化
     * @param result number
     */
    private handleResult(result: number) {
        switch (result) {
            // leon win
            case MatchEnum.Win:
                leonWin(`${this.users[0].cards.map(card => card.name).join('')};${this.users[1].cards.map(card => card.name).join('')}`)
                break;
            // judy win
            case MatchEnum.Lost:
                judyWin(`${this.users[1].cards.map(card => card.name).join('')};${this.users[0].cards.map(card => card.name).join('')}`)
                break;
            // leon === judy
            case MatchEnum.Same:
                const leonMaxCard = this.findMaxCard(this.users[0].cards)
                const judyMaxCard = this.findMaxCard(this.users[1].cards)
                const res = this.compare(leonMaxCard, judyMaxCard)
                if (res) this.handleResult(MatchEnum.Win)
                else this.handleResult(MatchEnum.Lost)
                break;
            // 都没有牛
            case MatchEnum.Draw:
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
    private checkCount(cards: Card[]) {
        let total = 0;
        let dict: any = {};
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            total += card.score;
            dict[card.score] = dict[card.score] === undefined ? 1 : dict[card.score] + 1;
        }
        let point = total % 10;
        if (total === cards.length * 10) {
            return point
        }
        let exists = false;
        for (let i in dict) {
            let other = (10 + point - Number(i)) % 10;
            if (dict[other]) {
                if ((Number(other) == Number(i) && dict[other] >= 2) || (Number(other) != Number(i) && dict[other] >= 1)) {
                    exists = true;
                    break;
                }
            }
        }
        return exists ? point : -1;
    }

    /**
     * 比赛，判断两组数组谁获胜,前者向后者对比  // TODO 可优化，这里只比较了两个人，可以扩展多人玩法  ...cards: Card[][]
     * @param one user1 的手牌
     * @param two user2 的手牌
     * @returns {number} MatchEnum  
     */
    // private match(...cards: Card[][]): number {
    //     const results = cards.map(cds => this.checkCount(cds))

    //     const result1 = this.checkCount(cds1)
    //     const result2 = this.checkCount(cds2)
    //     if (result1 === -1 && result2 === -1) return MatchEnum.Draw // 都无牛
    //     else if (result1 > result2) return MatchEnum.Win // 前者胜
    //     else if (result1 < result2) return MatchEnum.Lost // 后者胜
    //     return MatchEnum.Same // 都有牛，但是相同
    // }
    private match(cds1: Card[], cds2: Card[]): number {
        const result1 = this.checkCount(cds1)
        const result2 = this.checkCount(cds2)
        if (result1 === -1 && result2 === -1) return MatchEnum.Draw // 都无牛
        else if (result1 > result2) return MatchEnum.Win // 前者胜
        else if (result1 < result2) return MatchEnum.Lost // 后者胜
        return MatchEnum.Same // 都有牛，但是相同
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
     * 比较两个牌谁大
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






