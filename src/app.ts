
import Game from './game';
import User from './user';

const Leon = new User('Leon')
const Judy = new User('Judy')

const game = new Game()
game.addUser(Leon)
game.addUser(Judy)

for (let i = 0; i < 1000; i++) {
    game.start()
}
