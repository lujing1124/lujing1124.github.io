/*
* @Author: Administrator
* @Date:   2019-06-03 01:24:50
* @Last Modified by:   Administrator
* @Last Modified time: 2019-06-03 01:25:19
*/

//蛇
(function(){
    var elements = [];//用于删除蛇
    function Snake(){
        this.width = 20;
        this.height = 20;
        //this.color = #999;
        this.direction = 'right';
        this.body = [
            {x:4,y:0,color:'black'}, //head
            {x:3,y:0,color:'gray'},   //body
            {x:2,y:0,color:'gray'},    //body
            {x:1,y:0,color:'gray'},
            {x:0,y:0,color:'gray'}
            
        ];

    }

    Snake.prototype.init = function(map){
        //删除上一次渲染的蛇
        removeSnake();
        for(var i = this.body.length - 1; i>=0; i--){
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.left = this.body[i].x * this.width + 'px';
            div.style.top = this.body[i].y * this.height + 'px';
            div.style.backgroundColor = this.body[i].color;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            map.appendChild(div);
            elements.push(div);
        }
    };

    function removeSnake(){
        for(var i = elements.length - 1; i>=0; i--){
            var el = elements[i];
            //console.log(el);
            
            el.parentNode.removeChild(el);
            elements.splice(i,1);
        }
    }

    Snake.prototype.move = function(map,food){
        //把蛇身前一个赋给后一个
        for(var i = this.body.length - 1; i > 0; i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }

        switch (this.direction){
            case 'right' : this.body[0].x += 1;break;
            case 'left' : this.body[0].x -= 1;break;
            case 'top' : this.body[0].y -= 1;break;
            case 'bottom' : this.body[0].y += 1;break;
        }

        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        
        //吃食物
        if(headX == food.left && headY == food.top){
            //alert('get');
            var last = this.body[this.body.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            
            // TODO 食物不能出现在蛇身体内
            food.init(map);
            var reInit = false;
            for(var i=0;i<this.body.length;i++){
                if(food.left == this.body[i].x && food.top == this.body[i].y){
                    reInit = true;
                }
            }
            while(reInit){
                food.init(map);
            }
            /*do{food.init(map);}
            while (
                for(var i=0;i<this.body.length;i++){
                food.left == this.body[i].x && food.top == this.body[i].y}
                ){
                food.init(map);
            }*/
            /*for(var i=0;i<this.body.length;i++){
                if(food.left == this.body[i].x && food.top == this.body[i].y){

                }
            }*/

        }
    }

    window.Snake = Snake;
}());