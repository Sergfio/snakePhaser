import Phaser from './lib/phaser.js';
import Game from './scenes/Game.js';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    scene: Game,
    physics: {
        default: 'arcade'
    }

});