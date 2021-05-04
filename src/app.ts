
import Game from './game';
import User from './user';

const Leon = new User('Leon')
const Judy = new User('Judy')

const game = new Game()
game.addUser(Leon)
game.addUser(Judy)

// 比赛开始 玩 100000
for (let i = 0; i < 100000; i++) {
    game.start()
}
