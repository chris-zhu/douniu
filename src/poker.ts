
export enum OrderType {
    one = 'I', // 一人摸一张
    two = 'II' // 一人摸几张
}

export interface IDealOption {
    userNum: number // 人数
    total: number // 发几张牌
    type: true | OrderType.one | OrderType.two
    // random: boolean // 是否随机从牌堆里面抽牌
    // type: OrderType.one | OrderType.two
}

export class Card {
    public name: string
    public score: number
    public type: string
    public value: string
    public typeIndex: number
    public valIndex: number

    constructor(type: string, value: string, score: number) {
        this.name = type + value
        this.type = type
        this.value = value
        this.score = score
        this.typeIndex = cardType.indexOf(type)
        this.valIndex = cardValue.indexOf(type)
    }
}

export const cardValue: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
export const cardType: string[] = ['S', 'H', 'C', 'D']

export default class Poker {

    private static instance: Poker
    public cards: Card[] = []

    private constructor(isShuffle: boolean) {
        this.initPoker(isShuffle)
    }

    /**
     * 是否洗牌，默认洗牌
     * @param isShuffle 默认 true
     * @returns 
     */
    public static getCards(isShuffle = true) {
        if (!Poker.instance) {
            Poker.instance = new Poker(isShuffle)
        }
        return Poker.instance
    }

    // 初始化牌堆
    private initPoker(isShuffle: boolean) {
        let num = 0
        for (let i = 0, typeLen = cardType.length; i < typeLen; i++) {
            for (let j = 0, valLen = cardValue.length; j < valLen; j++) {
                let socre = 10
                if (num % 13 < 10) {
                    socre = num % 13 + 1
                }
                num++
                this.cards.push(new Card(cardType[i], cardValue[j], socre));
            }
        }
        isShuffle && this.shuffle()
    }

    /**
     * 洗牌，打乱当前牌堆
     * @returns 
     */
    shuffle = () => {
        if (this.cards.length !== cardType.length * cardValue.length) {
            this.cards.length = 0
            this.initPoker(true)
        } else {
            this.cards.sort(() => Math.random() - 0.5)
        }
    }

    /**
     * 发牌
     * @param option IDealOption
     * @returns Card[][]
     */
    deal = (option: IDealOption) => {
        if (option.userNum * option.total > this.cards.length) return null
        const result: Card[][] = []
        const orderType = { ...OrderType }

        if (option.type === true) { // 随机抽牌
            for (let i = 0; i < option.userNum; i++) {
                const cards: Card[] = []
                for (let j = 0; j < option.total; j++) {
                    const index = Math.floor(Math.random() * this.cards.length)
                    cards.push(...this.cards.splice(index, 1))
                }
                result.push(cards)
            }
        } else if (option.type === orderType.one) { // 顺序抽牌
            for (let i = 0; i < option.userNum; i++) {
                result.push([])
            }
            for (let i = 0, len = this.cards.length; i < len; i++) {
                let index = i % option.userNum
                result[index].push(...this.cards.splice(0, 1))
                if (option.userNum * option.total === i + 1) break
            }
        } else if (option.type === orderType.two) {
            for (let i = 0; i < option.userNum; i++) {
                result.push(this.cards.splice(0, option.total))
            }
        }

        return result
    }
}







