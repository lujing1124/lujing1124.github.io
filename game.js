/*
 * @Author: jenny
 * @Date:   2019-06-03 01:25:52
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-06-11 22:06:12
 */

//蛇动起来
(function () {
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        this.speed = 1000;
        that = this;
    }

    Game.prototype.init = function () {
        this.food.init(this.map);
        this.snake.init(this.map);

        this.snakeRun(this.map, this.food, this.speed);
        this.bindKey();
    };

    Game.prototype.snakeRun = function (map, food, speed) {
        //即使速度传参数，但是有改变的时候，定时器不识别
        var timeId = setInterval(function () {
            this.snake.move(map, food);
            this.snake.init(map);

            var headX = this.snake.body[0].x * this.snake.width;
            var headY = this.snake.body[0].y * this.snake.height;

            //碰壁，撞死
            if (headX < 0 || headX >= map.offsetWidth || headY < 0 || headY >= map.offsetHeight) {
                alert('game over');
                clearInterval(timeId);
            }
            //碰到自己了，死
            for (var i = 1; i < this.snake.body.length; i++) {
                if (this.snake.body[0].x == this.snake.body[i].x && this.snake.body[0].y == this.snake.body[i].y) {
                    alert('game over');
                    clearInterval(timeId);
                }
            }

        }.bind(that),speed);
    };

    Game.prototype.bindKey = function () {

        /*addEventListener('keydown', function (e) {
            //console.log('ok');
            switch (e.keyCode) {
                case 37 :
                    this.snake.direction = 'left';
                    break;
                case 38 :
                    this.snake.direction = 'top';
                    break;
                case 39 :
                    this.snake.direction = 'right';
                    break;
                case 40 :
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false);*/
        //限制不能反方向跑
        addEventListener('keydown',function (e) {
            var preDirection = this.snake.direction;
            if(e.keyCode == 37 && preDirection == 'right'){
                this.snake.direction = preDirection;
            }else if(e.keyCode == 37) {
                this.snake.direction = 'left';
            }

            if(e.keyCode == 38 && preDirection == 'bottom'){
                this.snake.direction = preDirection;
            }else if(e.keyCode == 38){
                this.snake.direction = 'top';
            }

            if(e.keyCode == 39 && preDirection == 'left'){
                this.snake.direction = preDirection;
            }else if(e.keyCode == 39){
                this.snake.direction = 'right';
            }

            if(e.keyCode == 40 && preDirection == 'top'){
                this.snake.direction = preDirection;
            }else if(e.keyCode == 40){
                this.snake.direction = 'bottom';
            }
            //控制蛇跑的速度，每次换个速度，就会导致多一条蛇，然后越跑越快，哪怕换回慢的速度，也慢不下来
            if(e.keyCode == 49 || e.keyCode == 97){
                this.speed = 1000;
                console.log(this.speed);
                //this.snakeRun(this.map, this.food, this.speed);
            }else if(e.keyCode == 50 || e.keyCode == 98){
                this.speed = 500;
                console.log(this.speed);
                //this.snakeRun(this.map, this.food, this.speed);
            }else if(e.keyCode == 51 || e.keyCode == 99){
                this.speed = 300;
                console.log(this.speed);
                //this.snakeRun(this.map, this.food, this.speed);
            }else if(e.keyCode == 52 || e.keyCode == 100){
                this.speed = 200;
                console.log(this.speed);
                //this.snakeRun(this.map, this.food, this.speed);
            }else if(e.keyCode == 53 || e.keyCode == 101){
                this.speed = 100;
                console.log(this.speed);
                // this.snakeRun(this.map, this.food, this.speed);
            }

        }.bind(that),false);

    }
    window.Game = Game;
}());