/*
* @Author: Administrator
* @Date:   2019-06-03 01:23:01
* @Last Modified by:   Administrator
* @Last Modified time: 2019-06-03 01:23:32
*/

//食物随机出现
(function(){
    var elements = [];
    function Food(width,height,color){
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || 'black';
        this.left = 0;
        this.top = 0;
    }

    Food.prototype.init = function(map){
        //删除上一次渲染的食物
        removeFood();
        var div = document.createElement('div'); 
        map.appendChild(div);
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
        div.style.position = 'absolute';                       
       
        this.left = Math.floor(Math.random()*map.offsetWidth/this.width)*this.width;
        div.style.left = this.left + 'px';
        this.top = Math.floor(Math.random()*map.offsetHeight/this.height)*this.height;
        div.style.top = this.top + 'px';
        
        elements.push(div);
        //TODO 食物第一次出现不能在蛇身体内
    }

    function removeFood(){
        for(var i = 0;i < elements.length; i++){
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }                        
    }

    window.Food = Food;
}());
