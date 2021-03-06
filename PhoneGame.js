/*
Hi! I will give you instructions for how to play this game. First, you click restart and then IMPORTANT!!!!! click the screen where you play to give focus to the screen. then, try to collect the cristals. Change the number of cristals that fall with the variable cristalNumber. Good luck!
*/
/**
 * DISCAMER:
 * I DO NOT OWN ANY OF THE STAR WARS ICONS, SUCH AS THE LIGHTSABER 
 * OR YODA. ALL RIGHTS GO TO THE STAR WARS COMPANY
 * **/

//start

//RGB vars
var RGBcolors=[];
RGBcolors.yellow =color(251, 255, 0);//RGB of colors
RGBcolors.green =color(17, 255, 0);
RGBcolors.blue =color(0, 255, 251);
RGBcolors.purple =color(157, 0, 255);
RGBcolors.red =color(255, 0, 0);
//RGB glow vars
var RGBGlowcolors=[];
RGBGlowcolors.yellow =color(255, 252, 64);//RGB of colors
RGBGlowcolors.green =color(143, 255, 135);
RGBGlowcolors.blue =color(135, 255, 253);
RGBGlowcolors.purple =color(207, 135, 255);
RGBGlowcolors.red =color(255, 122, 122);

//configuration vars
var cristalNumber=5; //Change for number of cristals
var saberX=30;//x of saber
var saberY=48;//y of saber
var colors=['green',"purple","red","blue","yellow"];//string form

//fixed vars
var Cristals = [];//cristal array
var saber=[];//saber aray
var shouldDrawRotatedSaber=false;
var shouldKillSabers=false;
var shouldSwish=false;

var drawGround=function(){
    fill(17, 84, 0);//ground
    rect(0,542,4600,131);
};
var Yoda = function(){//to make the yoda class
    this.x=300;
    this.y=466;
    this.eyecolor=color(0, 0, 0);
    this.HeadEarsFeetcolor=color(2,179,2);
    this.tuniccolor=color(148, 105, 49);
    this.isDarth=false;// DARTH YODA!!!!!!!
    this.canJump=false;
    this.isTouchingGround=true;
    this.saberCollor=null;
    this.timeInMouthExpression=0;
    this.mouthExpression="N";
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
Yoda.prototype.drawMouth=function(){
    if(this.mouthExpression==="N"){
        this.timeInMouthExpression=second();
        line(this.x+10,this.y+25,this.x+39,this.y+25);    
    }else if(this.mouthExpression==="S"){
        noFill();
        arc(this.x+24,this.y+27,28,10,0,180); 
        if((second()-this.timeInMouthExpression)>0){
            this.mouthExpression="N";    
        }
    }else if(this.mouthExpression==="M"){
        noFill();
        arc(this.x+24,this.y+27,28,10,180,360);  
        if((second()-this.timeInMouthExpression)>0){
            this.mouthExpression="N";    
        }
    }
};
//how to draw yoda
Yoda.prototype.draw=function(){
    stroke(0,0,0);
    //head
    fill(this.HeadEarsFeetcolor);
    rect(this.x,this.y,50,35);
    fill(this.eyecolor);//eyes
    ellipse(this.x+13,this.y+13,8,8);
    ellipse(this.x+36,this.y+13,8,8);
    this.drawMouth();
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
};
//move right
Yoda.prototype.moveRight=function(){
    this.x+=3;
};
Yoda.prototype.moveLeft=function(){
    this.x-=3;
};
Yoda.prototype.jump=function(){
   this.y-=3;
   this.isTouchingGround=false;
};
Yoda.prototype.fall=function(){
   this.y+=3;
   if(this.y>466){
        this.isTouchingGround=true;
        this.y=466;    
   }
};
var yoda = new Yoda();//make a new yoda

// SABER START
var Lightsaber= function(x,lightsabercolor){
    this.x=x;
    this.y=saberY;
    this.lightsabercolor=RGBcolors[lightsabercolor];
    this.lightsaberglow=RGBGlowcolors[lightsabercolor];
    this.height=24;
    this.shouldGlow=false;
};
Lightsaber.prototype.glow=function(){
    fill(this.lightsaberglow);
    rect(this.x-2.6,this.y+2,10,this.height-31);//glow    
};
Lightsaber.prototype.draw= function() {
    noStroke();
    if(this.shouldGlow){
        this.glow();    
    }
    fill(0, 0, 0);
    rect(this.x,this.y,5,14);//handle
    fill(this.lightsabercolor);
    rect(this.x,this.y,5,this.height-24); //saber
};
Lightsaber.prototype.grow=function(){
    this.height-=5;
    if(this.height===-16){
        this.glow(); 
        this.shouldGlow=true;
        yoda.canJump=true;
    }
};
// SABER END
var RotatedLightsaber= function(){
    this.x=279;
    this.y=466;
    this.lightsaberglow=RGBGlowcolors.purple;
    this.lightsabercolor=RGBcolors.purple;
    this.height=-45;
    this.shouldGlow=true;
    this.rotateAngle=30;
    this.timeInAngle=millis();
    this.isDeactivated=false;
};

RotatedLightsaber.prototype.draw= function() {
        pushMatrix();
            noStroke();
            rotate(this.rotateAngle);
            if(this.shouldGlow){
                fill(this.lightsaberglow);
                rect(this.x-2.6,this.y+2,10,this.height-11);//glow
            }
            fill(0, 0, 0);
            rect(this.x,this.y,5,14);//handle
            fill(this.lightsabercolor);
            rect(this.x,this.y,5,this.height); //saber
        popMatrix();
};

RotatedLightsaber.prototype.rotate=function(){
    this.draw();
        
    this.x=(yoda.x-32)*cos(this.rotateAngle)+(yoda.y+100)*sin(this.rotateAngle);
    
    this.y=-(yoda.x-32)*sin(this.rotateAngle)+(yoda.y+100)*cos(this.rotateAngle);
    
    this.rotateAngle-=10;
};

RotatedLightsaber.prototype.deactivate=function(){
    this.shouldGlow=false;
    this.isDeactivated=true;
    if(this.height<0){
        this.height+=2;
        this.draw();
    }
};

var rotatedLightsaber = new RotatedLightsaber();
//cristal class
var Cristal=function(){
    this.x=random(30,570);
    this.y=random(20,20);
    this.colorName=colors[round(random(0,colors.length-1))];
    this.color=RGBcolors[this.colorName];
    this.glowColor=RGBGlowcolors[this.colorName];
};

//draw the cristal
Cristal.prototype.draw=function(){
    stroke(0,0,0);
    fill(this.color);
    rect(this.x,this.y,8,19);
    triangle(this.x,this.y,this.x+8,this.y,this.x+3,this.y-18);
    triangle(this.x+1,this.y+21,this.x+8,this.y+21,this.x+3,this.y+43);
};

Cristal.prototype.move= function(){
    this.y+=3;    
};

Cristal.prototype.isCristalColliding=function(number){
    if(this.x > yoda.x && this.x < yoda.x+50 && this.y> yoda.y && this.y < yoda.y+35 ){
        Cristals.splice(number,1);
        playSound(getSound("retro/whistle2"));
        if(!saber[this.colorName].shouldGlow){
            saber[this.colorName].grow();
        }
        var cristal = new Cristal();
        Cristals.push(cristal);
        if(this.colorName==="red"){
            yoda.mouthExpression="M";
        }else{
            yoda.mouthExpression="S";    
        }
    }    
};
Cristal.prototype.isHittingGround=function(number){
    if(this.y>542&&this.y<547){
        Cristals.splice(number,1);
        var cristal=new Cristal();
        Cristals.push(cristal);
    }
};
var TalkingPerson=function(){
    this.text="";
    this.textWidth=0;
    this.textHight=19;
    this.isTalking=false;
    this.timeInBubble=0;
};

TalkingPerson.prototype.draw= function(objectX,objectY){
    noStroke();
    textSize(this.textHight);
    this.textWidth=textWidth(this.text);
    fill(255, 255, 255);
    ellipse(objectX,objectY,this.textWidth+88,this.textHight*2);
    fill(0, 0, 0);
    text(this.text,objectX-this.textWidth/2,objectY+this.textHight/4);
};
var talkBallon=new TalkingPerson();

//Make cristals
for (var num = 0; num < cristalNumber; num += 1) {
    var cristal = new Cristal();
    Cristals.push(cristal);
}

// SABER START
for (var num=0;num<colors.length;num+=1) {
    saber[colors[num]]=new Lightsaber(saberX,colors[num]);
    saberX+=134;
}
// SABER 

Yoda.prototype.isSaberColliding=function(){
    if(this.y<saberY){
        for(var num=0;num<colors.length;num+=1){
            if(this.x<saber[colors[num]].x && this.x+50>saber[colors[num]].x && saber[colors[num]].shouldGlow){
                var saberColor=colors[num];
                rotatedLightsaber.lightsabercolor=RGBcolors[saberColor];
                rotatedLightsaber.lightsaberglow=RGBGlowcolors[saberColor];
                this.saberCollor=saber[colors[num]];
                if(colors[num]==="red"){
                    yoda.isDarth=true;
                }
                shouldDrawRotatedSaber=true;
                
            }    
        }   
    }
};
var draw = function(){
    background(40, 205, 224);
    if(!shouldKillSabers){
        //lightsabers
        for(var num=0;num<colors.length;num+=1){
            saber[colors[num]].draw();    
        }
        //cristals
        for(var y=0;y<Cristals.length;y+=1){
            Cristals[y].draw(); 
            Cristals[y].move();
            Cristals[y].isCristalColliding(y);
            Cristals[y].isHittingGround(y);
        }
    }        
    yoda.draw();
    drawGround();
    if(talkBallon.isTalking&& yoda.isDarth===false){
        talkBallon.draw(300,111);
        if(talkBallon.timeInBubble===0){
            talkBallon.text="Hello";
            talkBallon.timeInBubble=second();
        }
        if((second()-talkBallon.timeInBubble)>2){
            talkBallon.text="You have done well";
        }
        if((second()-talkBallon.timeInBubble)>4){
            talkBallon.text="But now you must pass the greatest test of all";    
        }
        if((second()-talkBallon.timeInBubble)>6){
            talkBallon.text="Stay tuned for part two of the Yoda Series!";
        }
        if((second()-talkBallon.timeInBubble)>8){
            background(40, 205, 224);
            talkBallon.isTalking=false;
            yoda.draw();
            drawGround();
            shouldSwish=true;    
        }
    }
    if(yoda.isDarth){
        yoda.colorDarth();
        yoda.drawEyebrows();
        if(talkBallon.isTalking){
            talkBallon.draw(300,111);
            if(talkBallon.timeInBubble===0){
                talkBallon.text="So you gave into temptation didn't you?";
                talkBallon.timeInBubble=second();
            }
            if((second()-talkBallon.timeInBubble)>3){
                talkBallon.textHight=30;
                talkBallon.text="HAHAHAHAHAHAHA";
                shouldSwish=true;
            }
        }
    }
    //make him move
    if(shouldKillSabers){
        if(yoda.x>300){
            yoda.moveLeft();    
        }else if(yoda.x<300){
            yoda.moveRight();    
        }
        if(yoda.isTouchingGround && !shouldSwish){
            talkBallon.isTalking=true;
        }
        yoda.canJump=false;
        yoda.fall();
        rotatedLightsaber.draw(); 
    }else{
        if (keyIsPressed && keyCode === RIGHT) {//Entering if area
            yoda.moveRight();
        }
        if (keyIsPressed && keyCode === LEFT) {
            yoda.moveLeft();
        }
    }
    if(yoda.canJump){
        if(keyIsPressed && keyCode === UP){
            yoda.jump();
        }else{
            yoda.fall();
        }
        if(!shouldKillSabers){
            yoda.isSaberColliding();
        }
        if(shouldDrawRotatedSaber){
            shouldKillSabers=true;
            rotatedLightsaber.draw(); 
        }
    }
    if(shouldSwish){
        if(rotatedLightsaber.rotateAngle>-360){
            rotatedLightsaber.rotate();
        }else{
            rotatedLightsaber.deactivate();
        }    
    }
    if(shouldDrawRotatedSaber&&!shouldSwish){
        rotatedLightsaber.height=-45;
        rotatedLightsaber.shouldGlow=true;
        rotatedLightsaber.rotateAngle=30;
        rotatedLightsaber.x=yoda.x*cos(rotatedLightsaber.rotateAngle)+yoda.y*sin(rotatedLightsaber.rotateAngle)+77;
    
        rotatedLightsaber.y=-yoda.x*sin(rotatedLightsaber.rotateAngle)+yoda.y*cos(rotatedLightsaber.rotateAngle)+11;
    }
};  
