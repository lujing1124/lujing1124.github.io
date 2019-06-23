/*
 * @Author: Administrator
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
        //this.speed = speed;
        that = this;
    }

    Game.prototype.init = function () {
        this.food.init(this.map);
        this.snake.init(this.map);
        this.snakeRun(this.map, this.food);
        this.bindKey();
    };

    Game.prototype.snakeRun = function (map, food) {
        var timeId = setInterval(function () {
            this.snake.move(map, food);
            this.snake.init(map);

            var headX = this.snake.body[0].x * this.snake.width;
            var headY = this.snake.body[0].y * this.snake.height;
            //console.log(headX,food.x);
            //console.log(food);

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

            /*if(headX == food.x && headY == food.y){
             alert('get');
             }*/
        }.bind(that), 100);
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

        }.bind(that),false);

    }

    window.Game = Game;
}());