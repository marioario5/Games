/*
Hi! I will give you instructions for how to play this game. First, you click restart and then IMPORTANT!!!!! click the screen where you play to give focus to the screen. then, try to collect the cristals. Change the number of cristals that fall with the variable cristalNumber. Coming soon: if you collect the red cristals, I have(not will have) a darth function that will make yoda DARTH YODA!
*/
//start
var RGBcolors=[];
RGBcolors.yellow =color(251, 255, 0);
RGBcolors.green =color(17, 255, 0);
RGBcolors.blue =color(0, 255, 251);
RGBcolors.purple =color(157, 0, 255);
RGBcolors.red =color(255, 0, 0);
var colors=['blue','green','yellow','purple','red'];

var cristalNumber=2; //Change for number of cristals
var Cristals = [];//array
//to make the yoda class
var Yoda = function(){
    this.x=200;
    this.y=303;
    this.eyecolor=color(0, 0, 0);
    this.HeadEarsFeetcolor=color(2,179,2);
    this.tuniccolor=color(148, 105, 49);
    this.isDarth=false;// DARTH YODA!!!!!!!
};
Yoda.prototype.colorDarth=function(){
    this.eyecolor=color(255, 234, 0);
    this.HeadEarsFeetcolor=color(255, 0, 0);
    this.tuniccolor=color(0, 0, 0);
};
Yoda.prototype.drawEyebrows=function(){//eyebrow method
    fill(0, 0, 0);
    strokeWeight(2);
    line(this.x+5,this.y+3,this.x+20,this.y+11);
    line(this.x+43,this.y+3,this.x+28,this.y+11); 
    strokeWeight(1);
};
//how to draw yoda
Yoda.prototype.draw  =function(){
    //head
    fill(this.HeadEarsFeetcolor);
    rect(this.x,this.y,50,35);
    fill(this.eyecolor);
    ellipse(this.x+13,this.y+13,8,8);
    ellipse(this.x+36,this.y+13,8,8);
    line(this.x+10,this.y+25,this.x+39,this.y+25);
    //ears
    fill(this.HeadEarsFeetcolor);
    triangle(this.x+-32,this.y+-12,this.x,this.y,this.x+-1,this.y+19);
    triangle(this.x+86,this.y-12,this.x+50,this.y,this.x+50,this.y+19);
    //tunic
    fill(this.tuniccolor);
    rect(this.x,this.y+35,50,35);
    triangle(this.x+0,this.y+34,this.x+-21,this.y+71,this.x+0,this.y+70);
    triangle(this.x+50,this.y+35,this.x+49,this.y+70,this.x+74,this.y+71);
    //feet
    fill(this.HeadEarsFeetcolor);
    rect(this.x,this.y+70,19,5);
    rect(this.x+31,this.y+70,19,5);
    //eyebrows
    strokeWeight(1);
    fill(17, 84, 0);//ground
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
    this.color=colors[round(random(0,colors.length-1))];
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

Cristal.prototype.isColliding=function(number){
    if(this.x>yoda.x &&this.x<yoda.x+50 &&this.y===yoda.y){
        Cristals.splice(number,1);
        playSound(getSound("retro/whistle2"));
    }    
};

//Note to self: for (start; how long; change)
//Make them
for (var num = 0; num < cristalNumber; num += 1) {
    var cristal = new Cristal();
    Cristals.push(cristal);
}

var draw = function() {
    background(57, 184, 204);
    //cristals
    for(var y=0;y<Cristals.length;y+=1){
        Cristals[y].draw(); 
        Cristals[y].move();
        Cristals[y].isColliding(y);
    }
    yoda.draw();
    if(yoda.isDarth){
        yoda.drawEyebrows(); 
        yoda.colorDarth();
    }
    fill(255, 0, 0);
    //make him move
    if (keyIsPressed && keyCode === RIGHT) {
        yoda.moveRight();
    }
    if (keyIsPressed && keyCode === LEFT) {
        yoda.moveLeft();
    }
};
