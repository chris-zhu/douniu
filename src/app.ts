import Game from './game'
import { checkCount } from './util';

const game = new Game()
// game.start()

for (let i = 0; i < 10; i++) {
    const arr = [Math.floor(Math.random() * 9 + 1), Math.floor(Math.random() * 9 + 1), Math.floor(Math.random() * 9 + 1), Math.floor(Math.random() * 9 + 1), Math.floor(Math.random() * 9 + 1)]
    console.log(arr);
    console.log(checkCount(arr));
}
