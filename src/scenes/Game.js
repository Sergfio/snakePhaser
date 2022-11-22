import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
    }

    preload() {
        this.load.image('snake', '/assets/moreenemiesanimations/Enemy sprites/snake.png');
        this.load.image('essen', '/assets/moreenemiesanimations/Enemy sprites/frog.png');
    }

    create() {
        this.add.image(100, 100, 'snake');
        this.physics.add.image(350, 350, 'essen').setScale(0.5);

        const foods = this.physics.add.staticGroup();

        for (let i = 0; i < 2; ++i) {
            const x = Phaser.Math.Between(450, 100);
            const y = window.innerHeight * i;

            /** @type {Phaser.Physics.Arcade.Sprite} */
            const food = foods.create(x, y, 'essen');
            food.scale = 0.5;

            /** @type {Phaser.Physics.Arcade.StaticBody} */
            const body = food.body;
            body.updateFromGameObject();
        }
    }
}