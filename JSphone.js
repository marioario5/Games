/**
  Update Log:
  
  1.0:A 400 by 400 screen, leading to a smal phone with only one
  app.
  
  1.1: A 600 by 600 screen, with two apps, one final and the other   ready to implement.
  
  1.2: Fully functioning Yoda game.
  
  1.3: Coming soon! Expected to have Yoda game part two ready to     implement.
  
  1.4: Coming soon! Expected to have Yoda game part two fully        intagraded.
  
  1.5: Coming soon! Expected to have app store to be able to         download past apps
  
  1.6: Coming soon! Expected to have app store and basic phone 
  apps.
**/
var cristalColor=color(255, 255, 255);
var cristalColors=[color(251,255,0)/*Yellow*/,color(17,225,0),/* green */color(0,225,221)/*blue*/,color(157,0,251)/*Purple*/,color(255, 0, 0)/*red*/];
var Button=function(config){//constructer
    this.x=config.x||200;
    this.y=config.y||200;
    this.size=config.size||40;
    this.color=config.color||color(255, 0, 0);
    this.textColor=config.textColor||color(60, 255, 0);
    this.label=config.label||"click";
    this.onClick=config.onClick||function(){};
};
Button.prototype.handleMouseClick=function(){
    this.onClick();       
};
var App=function(config){//constructer
    Button.call(this,config);
    this.textSize=16;
};
App.prototype = Object.create(Button.prototype);
App.prototype.draw=function(){//the draw meoathod
    noStroke();
    fill(this.color);
    textSize(62);
    rect(this.x,this.y,this.size,this.size,10);
    fill(this.textColor);
    textSize(this.textSize);
    text(this.label,this.x-5,this.y+this.size+18);
};
App.prototype.isInside=function(){
    return mouseX>this.x && mouseX<this.x+this.size &&
    mouseY>this.y && mouseY<this.y+this.size;
};
var HomeButton=function(config){
    Button.call(this,config);
    this.r=config.r||0;
};
HomeButton.prototype = Object.create(Button.prototype);
HomeButton.prototype.draw= function() {
    fill(this.textColor);
    ellipse(this.x,this.y,this.r+10,this.r+10);
    fill(this.color);
    ellipse(this.x,this.y,this.r,this.r);
};
HomeButton.prototype.isInside=function(){
    return sq(this.x-mouseX)+sq(this.y-mouseY)<=sq(this.r);
};
HomeButton.prototype.handleMouseClick=function(){
    this.onClick();    
};

var drawBackground=function(){
    noStroke();
    background(0, 0, 0);
    var r = 281;
    var g = 65;
    var b = 340;
    fill(r, g, b);

    for(var x=0;x<360;x+=30){
        fill(r,g,b);
        r-=20;//change these for different colors on the phone.
        g+=2;
        b+=20;
        pushMatrix();
        translate(305,276);
        rotate(x);
        rect(0, 0,145,280);
        popMatrix(); 
    }
};

var drawPhone= function(x,y,color){//the draw phone
    noStroke();
    drawBackground();
    fill(54, 54, 54);
    fill(color);
    fill(69, 66, 53);
    rect(x+8,y+434,262,33,10);
    rect(x,y,14,468,10);
    rect(x+4,y,267,14,10);
    rect(x+264,y,14,466,10);
    fill(255, 0, 0);
    textSize(25);
    text("JS Phone",x+88,y+36);
    fill(0,225,204);
    rect(0,0,600,62);//background rects
    rect(0,529.3,600,95);
    rect(0,0,165,600);
    rect(440,0,280,600);
    
};


var phoneColor=color(0, 0, 0);
var drawEnterprise=function(x,y){
    noStroke();
    var ellipseWidth = 80;
    var ellipseHeight =ellipseWidth;
    
    fill(143, 136, 136);
    ellipse(x,y+27,ellipseWidth,ellipseHeight);//sauser section

    ellipse(x+4/270*ellipseWidth,y+ 45/34*ellipseHeight,2/2*ellipseWidth,ellipseHeight+31       );//#2 hull

    fill(255, 0, 0);
    //left warp
    ellipse(x-1/1.4*ellipseWidth,y+2/1.8*ellipseHeight,1/2*ellipseWidth,1/2*ellipseHeight);
    //right warp
    ellipse(x+26/35*ellipseWidth,y+2/1.8*ellipseHeight,1/2*ellipseWidth,1/2*ellipseHeight);

    fill(5, 60, 255);
    rect(x-2/2.1*ellipseWidth,y+29/26*ellipseHeight,1/2*ellipseWidth,ellipseHeight);
    rect(x+1/2.1*ellipseWidth,y+29/26*ellipseHeight,1/2*ellipseWidth,ellipseHeight);
};
    var drawAppStarTrekBadge= function(x,y) {
    var ellipseWidth=30;
    var ellipseHeight=0.65*ellipseWidth;

    var cvp1x=11*ellipseWidth/200;
    var cvp2x=102*ellipseWidth/200;
    var cvp3x=29*ellipseWidth/200;
    var cvp4x=-71*ellipseWidth/200;

    var cvp1y=-153*ellipseHeight/130;
    var cvp2y=36*ellipseHeight/130;
    var cvp3y=-49*ellipseHeight/130;
    var cvp4y=36*ellipseHeight/130;
    strokeWeight(0.6);
    fill(196, 182, 57);
    ellipse(x,y,ellipseWidth,ellipseHeight);
    fill(181, 170, 170);
    pushMatrix();
    translate(x-5*ellipseWidth/200,y+50*ellipseWidth/200);
    beginShape();
    curveVertex(cvp1x,cvp1y); curveVertex(cvp2x,cvp2y); curveVertex(cvp3x,cvp3y); curveVertex    (cvp4x,cvp4y); curveVertex(cvp1x,cvp1y); curveVertex(cvp2x,cvp2y); curveVertex(cvp3x,cvp3y);
endShape();
popMatrix();
};
var drawLightsaberCristal= function(x,y) {
    stroke(0, 0, 0);
    strokeWeight(1);
    fill(cristalColor);
    rect(x,y,6,10);
    triangle(x,y,x+7,y,x+3,y-15);
    triangle(x,y+11,x+7,y+11,x+3,y+27);
    noStroke();
};
//main program
noStroke();
drawPhone(163,62,phoneColor);
var cristalNumber=floor(random(0,5));
var starTrek= new App({
    x:207,
    y:131,
    color:color(51, 222, 188),
    textColor:color(9, 9, 227),
    label:"Star Trek",
    onClick:function(){
        drawPhone(163,62,phoneColor);
        fill(0, 0, 0);
        noStroke();
        drawEnterprise(300,212);
    }    
});

var yodaGame= new App({
    x:340,
    y:131,
    color:color(51, 222, 188),
    textColor:color(9, 9, 227),
    label:"Yoda part 1",
    onClick:function(){
        drawPhone(163,62,phoneColor);
        fill(0, 0, 0);
        noStroke();
        fill(82, 81, 81);
        textSize(15);
        text("Please rotate your phone \n to the horizontal position",219,163); 
        textSize(20);
        fill(0, 255, 17);
    }
});
var home= new HomeButton({
    x:307,    
    y:513,
    r:20,
    color:color(0, 0, 0),
    textColor:color(104, 107, 104),
    onClick:function(){
        drawPhone(163,62,phoneColor);
        starTrek.draw();
        drawAppStarTrekBadge(starTrek.x+20,starTrek.y+20);
        yodaGame.draw();
        drawLightsaberCristal(yodaGame.x+17,yodaGame.y+15);
        home.draw();
    }
});
cristalColor=cristalColors[cristalNumber];
yodaGame.textSize=13;
starTrek.draw();
yodaGame.draw();
drawLightsaberCristal(yodaGame.x+17,yodaGame.y+15);
drawAppStarTrekBadge(starTrek.x+20,starTrek.y+20);
home.draw();
mouseClicked=function(){
    if(starTrek.isInside()){
        starTrek.handleMouseClick();
        home.draw();
    }else if(home.isInside()){
        home.handleMouseClick();    
    }else if(yodaGame.isInside()){
        yodaGame.handleMouseClick();
        home.draw();
    }
};
