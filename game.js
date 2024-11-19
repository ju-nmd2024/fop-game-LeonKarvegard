function startScreen(){ //setting up the startscreen
background(111,168,220);

push();                //The picture of the startScreen
noStroke();
fill(34, 139, 34);
ellipse(200, 500, 700, 200);
pop();

fill(255);          //Creating starting text message
textSize(24);
text("Press to start", 120, 250);
}


function gameScreen(){ //setting up the gameScreen
    background(111,168,220);


    fill(255);          //During game message
    textSize(24);
    text ("Play", 180, 50);

    push();                 //Hill during game
    fill(34, 139, 34);
    ellipse(200, 500, 700, 200);
    pop();

                            //Apply gravity
    if (keyIsDown(32)) {
        acc = -0.9;             //moves upwards when "Spacebar" is pressed
    } else {
        acc = +0.5 + 0.5*1.2;   //the pig falls when "Spacebar" is not pressed
    }

    velocity += acc;                //making velocity and acceleration work together and setting limits for velocity
    velocity = constrain(velocity, -10,15); 
    y += velocity; 

    pig(200, y, 0.4);
}
function LosingScreen(){ //setting up the resultScreen in case of a lost game
    background(135,206,235);

    push ();
    fill(0,150,0);
    rect (0,500,400,100);
    fill (249,215,28);

    
    pop ();
    text("The pig hit the ground to hard",45,250);
    
}

function WinningScreen(){ //setting up the resultScreen in case of a won game
    background(135,206,235);


    push ();                //The image showned when game is won
    fill(0,150,0);
    rect (0,500,400,100);
    pop();


    pig(200,430,0.5);
    text("Succesfully landed",100,250);
    
}
let y = 0;              //starting values for pig in y direction, velocity and the acceleration
let velocity = 0; 
let acc = 0; 

function pig(x, y, s){ //setting up the character for the game
     //legs
     function leg(a) {
        fill(0, 0, 0);
        rect(a, y, 30*s, 150*s);
        fill(255, 0, 150);
        rect(a, y, 30*s, 120*s);
        fill(50);
        push();
        noStroke();
        triangle(a+12*s, y+151*s, a+18*s, y+151*s, a+15*s, y+140*s);
        pop();
    }
    leg(x+50*s);
    leg(x-80*s);
    
    //Body
    
    
    fill(255, 0, 150);
    ellipse(x, y, 250*s, 200*s);
    
    
    
    //ears
    triangle(x, y-30*s, x-40*s, y-60*s, x-45*s, y-10*s);
    triangle(x, y-30*s, x+40*s, y-60*s, x+45*s, y-10*s);
    
    push();
    fill(255, 150, 210);
    triangle(x, y-25*s, x-38*s, y-55*s, x-42*s, y-10*s);
    triangle(x, y-25*s, x+38*s, y-55*s, x+42*s, y-10*s);
    pop();
    
    //Head
    ellipse(x, y, 100*s, 100*s);
    
    //mouth
    strokeWeight(3*s);
    arc(x, y, 80*s, 80*s, 1.2, 2.5);
    
    //eyes
    function eye(a) {
        strokeWeight(1*s);
        fill(255);
        circle(a, y-20*s, 20*s);
        fill(0);
        circle(a, y-20*s, 10*s);
    }
    eye(x-20*s);
    eye(x+20*s);
    
    //Nose
    fill(255, 0, 150);
    ellipse(x, y+10*s, 40*s, 15*s);
    
    
    function nose(a){
        fill(0);
        circle(a, y+10*s, 10*s);
    }
    nose(x-7*s);
    nose(x+7*s);

    }

function setup(){
    createCanvas(400, 500);
}
let state = "start";        //when game is first started the start game will show

function draw(){                //making an if, to make sure that the gamescreen starts
    if (state === "start") {
        startScreen();
    } else if (state === "game") { 
        gameScreen();
        
        
        
        if (y >= 430 && velocity > 5) {         //Under what circomstances you win or lose
            state = "resultLoss";
        }  else if (y >= 430 && velocity <= 5) {
            state = "resultWin";
        }  
           


        

    } else if (state === "resultLoss") {            //making sure you get to the lossScreen when you lose the game
        LosingScreen();
        y = 1;
        velocity = 0;
        acc = 0;

    } else if (state === "resultWin") {             //making sure you get to the winScreen when you Win the game
        WinningScreen();
        y = 1;
        velocity = 0;
        acc = 0;

    }
    
}

function mouseClicked(){                    //Combinding the differents screens works with a mouse click
   if (state === "start"){
    state = "game";
   }  else if (state === "resultLoss"){
    state = "game";
   }else if (state === "resultWin"){
    state = "game";
   }
}
