import Phaser from 'phaser';
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';

import Player from './Player.js';
import Magic from './Magic.js';
//import Enemies from './Enemies.js';
// import Enemy from './Enemy.js';
// import pinktilesheet from '../assets/maps/pinktilesheet.png';
// import largermap from '../../../../public/largermap.json';
// import catspritesheet from '../assets/images/catspritesheet.png';
// import magicb from '../assets/images/magicb.png';
// import enemyspritesheet from '../assets/images/enemyspritesheet.png';
// import fireflyspritesheet from '../assets/images/fireflyspritesheet.png';


class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'GameScene'
        })
        // this.player; 
        // this.cursors;
        // this.pointer;
        // this.enemies;
        // this.fireflies;
        // this.magics;     
    }

    init () {
        this.attack = 0;
        this.collectff = 0;
        this.gameFF = 0;
        this.gameEnemies = 0;
    }

    preload(){ 
        this.load.image('tiles', 'pinktilesheet.png');
        this.load.tilemapTiledJSON('map', 'largermap.json');
        this.load.spritesheet('player', 'catspritesheet.png', { frameWidth: 35, frameHeight: 32 });
        this.load.image('magic', '/magicb.png');
        this.load.spritesheet('enemy', 'enemyspritesheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('firefly', 'fireflyspritesheet.png', { frameWidth: 17, frameHeight: 17 });

        // this adds the joystick, see below for todos
        // should tech (I think be able to add this in a more traditional way since installed)
        // var url;
        // url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        // this.load.plugin('rexvirtualjoystickplugin', url, true);
    }

    create(){
        console.log('window contain touch.name??: ', window.TouchEvent)
        
        const isTouch = window.TouchEvent ? true : false;

        //create map
        this.map = this.make.tilemap({key: 'map'});
        this.tiles = this.map.addTilesetImage('pinktilesheet', 'tiles');
        this.layer_background = this.map.createLayer('background', this.tiles, 0, 0);
        this.layer_background.setOrigin(0,0);
        this.layer_roads = this.map.createLayer('roads', this.tiles, 0, 0);
        this.layer_roads.setOrigin(0,0);
        this.layer_collision = this.map.createLayer('buildings-trees', this.tiles, 0, 0);
        this.layer_collision.setOrigin(0,0);
        this.layer_collision.setCollisionByExclusion([-1], true, this);
        this.physics.world.setBounds(0, 0, 960, 640);

        //create player from Tiled definitions
        this.map.findObject('objects', (obj) => {
            if (obj.type === 'player'){
                this.player = new Player(this, obj.x, obj.y)
            }  
        });

        //add enemies group for now
        this.enemies = this.physics.add.group({
            key: 'enemy',
            repeat: Phaser.Math.Between(9, 19),
          
        });

        this.gameEnemies = this.enemies.children.entries.length

        //add enemy functions here for now
        this.enemies.children.iterate(function (enemy) {
            enemy.x = Phaser.Math.Between(100, 600);
            enemy.y = Phaser.Math.Between(100, 300)
            enemy.setCollideWorldBounds(true);
            enemy.setBounce(1);
            enemy.setVelocity(Phaser.Math.Between(20, 60), Phaser.Math.Between(20, 60));
            enemy.health = 3;
        });

        //add enemy animations here for now
        //+ remember actual animation occurs in update
        this.anims.create({
            //changed from left to walking to apply flipX
            key: 'enemy-walk',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
          });

        //add fireflies group
        this.fireflies = this.physics.add.group({
            key:'firefly',
            repeat: Phaser.Math.Between(9, 19),  
          });

        this.gameFF = this.fireflies.children.entries.length;
          
        this.anims.create({
            //changed from left to walking to apply flipX
            key: 'firefly-float',
            frames: this.anims.generateFrameNumbers('firefly', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.fireflies.children.iterate(function (firefly){
            firefly.x = Phaser.Math.Between(100, 600);
            firefly.y = Phaser.Math.Between(100, 300)
            firefly.setCollideWorldBounds(true);
            firefly.setBounce(1);
            firefly.setVelocity(Phaser.Math.Between(20, 60), Phaser.Math.Between(20, 60));
        });

        this.physics.add.collider(this.enemies, this.goals);
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.player, this.layer_collision); 
        this.physics.add.collider(this.enemies, this.layer_collision);
        this.physics.add.overlap(this.player, this.fireflies, this.collectFirefly, null, this);

        //create magic
        this.magics = this.physics.add.group({ classType: Magic, runChildUpdate: true });
        this.physics.world.enable(this.magics);
      
        // create cameras
        // will want to adjust this, or maybe works well enough with line startFollow
        // this.cameras.main.setSize(800, 600);
        let cameraBoundsWidth = 960;
        let cameraBoundsHeight = 640;

        if (window.innerWidth < 400){
          cameraBoundsWidth = 400
        }
        
        this.camera = this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-200, 100);
        this.cameras.main.setBounds(0, 0, cameraBoundsWidth, 640);
        



    
        this.attackText = this.add.text(400, 0, `Enemies banished: ${this.attack}`, { fontSize: '25px', fill: '#000',  backgroundColor: '#cebff5'});
        this.collectText = this.add.text(0, 0, `Fireflies collected: ${this.collectff}`, { fontSize: '25px', fill: '#000',  backgroundColor: '#cebff5'});
        // this.scoreText = this.add.text(12, 12, `Score: `, { fontSize: '32px', fill: '#fff' });
        this.events.on('attack', () => {
            this.attack++;
            this.attackText.setText(`Enemies banished: ${this.attack}`);
        });

        this.events.on('collectff', () => {
          this.collectff++;
          this.collectText.setText(`Fireflies collected: ${this.collectff}`);
      })

        // create input - todo moved, make sure this doesn't make a difference
        // also prob remove pointer if joystick is successful
        if (isTouch) {
                    // todo, adds mobile joystick approx as expected
            // but need to make sure always bottom left corner
            // need to add a 'fire' button
            // need to hookup to cat
            // also shouldn't necessarily have to preload in the method in this preload since
            // installed
            // this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                // x: 50,
                // y: 300,
                // radius: 100,
                // base: this.add.circle(0, 0, 50, 0x888888),
                // thumb: this.add.circle(0, 0, 20, 0xcccccc),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            // })
            // this.cursors = this.joystick.createCursorKeys();

            this.joystick = new VirtualJoystick(this, {
                x: 50, 
                y: 300,
                radius: 100,
                base: this.add.circle(0, 0, 50, 0x888888),
                thumb: this.add.circle(0, 0, 20, 0xcccccc),
                // dir: '8dir',
                // forceMin: 16,
                // fixed: true,
                // enable: true
            });

            this.cursors = this.joystick.createCursorKeys();
        } else {
            // this.pointer = this.input.activePointer;
            this.cursors = this.input.keyboard.createCursorKeys();
        }

    }

    update(){
        //if(this.isTerminating) return;
        //keyboard movement called from Player class
     
        //mouse/touch event added in case mobile
        // if(this.pointer.isDown){
        //     this.player.x += (this.pointer.x - this.player.x) * 0.05;
        //     this.player.y += (this.pointer.y - this.player.y) * 0.05;
        // }

        this.player.update(this.cursors, this, this.enemies);

        //update enemy animations
        this.enemies.children.iterate(function (child){
            child.setVelocity = 150;
            child.anims.play('enemy-walk', true);       
        });

        this.fireflies.children.iterate(function(child){
            child.setVelocity = 75;
            child.anims.play('firefly-float', true);
    
        });
  
        this.attackText.setX(this.camera.midPoint.x + 100);
        this.attackText.setY(this.camera.midPoint.y - 300);
        this.collectText.setX(this.camera.midPoint.x - 375);
        this.collectText.setY(this.camera.midPoint.y - 300);

        if (this.attack === this.gameEnemies && this.collectff === this.gameFF){
            return this.gameOver();
        };               
    }

    gameOver() {
        // initiated game over sequence 
        this.isTerminating = true;

        // fade out
        this.cameras.main.fade(500);    
        this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
          //will prob need to change this to a gameOver Scene, and allow new game to be made based on current user and call to adapter
          this.scene.start('TitleScene');
        }, this);
    };

    collectFirefly(player, fireflies){
        fireflies.disableBody(true, true); //remove from screen  
        this.events.emit('collectff');     
    };

}

export default GameScene