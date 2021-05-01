import { Card } from "./poker"

export default class User{
    public name: string
    public cards:Card[] = [] //当前用户的手牌

    constructor(name: string){
        this.name = name
    }

    /** 清空手牌 */
    clear = () => this.cards.length = 0
}