//start
var colors=[color(0, 255, 251),color(17, 255, 0),color(251, 255, 0),color(157, 0, 255)];
var cristalNumber=1; //Change for number of cristals
//to make the yoda class
var Yoda = function(){
    this.x=200;
    this.y=303;
};

//how to draw yoda
Yoda.prototype.draw  =function(){
    fill(2, 179, 2);
    rect(this.x,this.y,50,35);
    fill(0, 0, 0);
    ellipse(this.x+13,this.y+13,8,8);
    ellipse(this.x+36,this.y+13,8,8);
    line(this.x+10,this.y+25,this.x+39,this.y+25);
    fill(2, 179, 2);
    triangle(this.x+-32,this.y+-12,this.x,this.y,this.x+-1,this.y+19);
    triangle(this.x+86,this.y-12,this.x+50,this.y,this.x+50,this.y+19);
    fill(148, 105, 49);
    rect(this.x,this.y+35,50,35);
    triangle(this.x+0,this.y+34,this.x+-21,this.y+71,this.x+0,this.y+70);
    triangle(this.x+50,this.y+35,this.x+49,this.y+70,this.x+74,this.y+71);
    fill(2, 179, 2);
    rect(this.x,this.y+70,19,5);
    rect(this.x+31,this.y+70,19,5);
    fill(17, 84, 0);
    rect(0,378,400,98);
    
};
//move right
Yoda.prototype.moveRight=function(){
    this.x+=3;
};
Yoda.prototype.moveLeft=function(){
    this.x-=3;
};
var yoda = new Yoda();//make a new yoda


//cristal class
var Cristal=function(){
    this.x=random(30,370);
    this.y=30;
    this.color=colors[round(random(0,3))];
};

//draw the cristal
Cristal.prototype.draw=function(){
    fill(this.color);
    rect(this.x,this.y,8,19);
    triangle(this.x,this.y,this.x+8,this.y,this.x+3,this.y-18);
    triangle(this.x+1,this.y+21,this.x+8,this.y+21,this.x+3,this.y+43);
};

Cristal.prototype.move= function(){
    this.y+=3;    
};

Cristal.prototype.isColliding=function(){
    if(this.x>yoda.x &&this.x<yoda.x+50 &&this.y===yoda.y){
        println("hi");    
    }    
};

//Note to self: for (start; how long; change)
var Cristals = [];//array
//Make them
for (var num = 0; num < cristalNumber; num += 1) {
    var cristal = new Cristal();
    Cristals.push(cristal);
}

var draw = function() {
    background(57, 184, 204);
    //cristals
    for(var y=0;y<cristalNumber;y+=1){
        Cristals[y].draw(); 
        Cristals[y].move();
        Cristals[y].isColliding();
    }
    yoda.draw();
    //make him move
    if (keyIsPressed && keyCode === RIGHT) {
        yoda.moveRight();
    }
    if (keyIsPressed && keyCode === LEFT) {
        yoda.moveLeft();
    }
};
    

