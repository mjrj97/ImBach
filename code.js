// Interfaces
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var player = new Audio();

// Classes
class Button {
    constructor(rect, text, fontSize = 36, call) {
        this.rect = rect;
        this.text = text;
        this.fontSize = fontSize;
        this.call = call;
    }

    draw() {
        ctx.fillStyle = "gray";
        ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        ctx.strokeStyle = "black";
        ctx.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = 'bold ' + this.fontSize + 'px Allegretto';
        ctx.fillText(this.text, this.rect.x + this.rect.width/2, this.rect.y + (this.rect.height+this.fontSize)/2.25);
    }
}

// Constants
const notes = ["a3", "b3", "c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5", "d5", "e5", "f5", "g5", "a5", "b5", "c6"];

// Values
let distance = 15;
let correct = localStorage.getItem("correct") == null ? 0 : localStorage.getItem("correct");
let total = localStorage.getItem("total") == null ? 0 : localStorage.getItem("total");
let currentNote = random(0,notes.length-1);
let currentMenu = "Main";
let buttons = [];

// Images
var gclef = new Image();
gclef.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/GClef.svg/1200px-GClef.svg.png";
gclef.onload = function() {  
    gclef.width = 30;
    gclef.height = 82;      
}

var note = new Image();
note.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/WholeNote.svg/2560px-WholeNote.svg.png";

// Input
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    for (let i = 0; i < buttons.length; i++) {
        if (isInside(mousePos, buttons[i].rect)) {
            buttons[i].call();
        }
    }
}, false);

function keyUpHandler(e) {
    handleInput(e.key);
}

function handleInput(e) {
    wasGuess = false;
    for (let i = 0; i < notes.length; i++) {
        if (e == notes[i][0])
            wasGuess = true;
    }

    if(e == notes[currentNote][0]) {
        player.src = "audio/" + notes[currentNote] + ".mp3";
        player.play();
        currentNote = random(0,notes.length-1);
        correct++;
      	localStorage.setItem("correct", correct);
    }

    if (wasGuess)
    {
        total++;
        localStorage.setItem("total", total);
    }
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Utility
function random(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

// UI
function navigateTo(menu) {
    currentMenu = menu;
}

function drawSheet() {
    ctx.drawImage(gclef, 0, canvas.height/2 - (gclef.height/2 * distance/10), gclef.width * distance/10, gclef.height * distance/10);
    ctx.drawImage(note, 100 * distance/10, canvas.height/2+distance*3.5-currentNote*(distance/2),17 * distance/10,10 * distance/10);

    ctx.textAlign = "start";
    ctx.fillStyle = "black";
    ctx.font = 'bold ' + 30*distance/10 + 'px Allegretto';
    ctx.fillText(4, (gclef.width + 10) * distance/10, canvas.height/2);
    ctx.fillText(4, (gclef.width + 10) * distance/10, canvas.height/2 + distance * distance/10 + distance/2);

    if (currentNote > 13) {
        ctx.moveTo(90 * distance/10, canvas.height/2 - distance * 3);
        ctx.lineTo(127 * distance/10, canvas.height/2 - distance * 3);
    }
    if (currentNote > 15) {
        ctx.moveTo(90 * distance/10, canvas.height/2 - distance * 4);
        ctx.lineTo(127 * distance/10, canvas.height/2 - distance * 4);
    }
    if (currentNote < 3) {
        ctx.moveTo(90 * distance/10, canvas.height/2 + distance * 3);
        ctx.lineTo(127 * distance/10, canvas.height/2 + distance * 3);
    }
    if (currentNote < 1) {
        ctx.moveTo(90 * distance/10, canvas.height/2 + distance * 4);
        ctx.lineTo(127 * distance/10, canvas.height/2 + distance * 4);
    }

    for (let i = 0; i < 5; i++) {
        ctx.moveTo(0, canvas.height/2 - distance * 2 + distance * i);
        ctx.lineTo(canvas.width, canvas.height/2 - distance * 2 + distance * i);
    }
}

function drawPoints() {
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = 'bold 36px Allegretto';
    ctx.fillText(correct + "/" + total, canvas.width/2, 50);
}

function noteMenu() {
    drawSheet();
    drawPoints();

    buttons = [
        new Button(rect = {x: canvas.width / 2 - 60 * 3 - 25, y:canvas.height - 60, width:50, height:50},"C", 36,function() {handleInput("c");}),
        new Button(rect = {x: canvas.width / 2 - 60 * 2 - 25, y:canvas.height - 60, width:50, height:50},"D", 36,function() {handleInput("d");}),
        new Button(rect = {x: canvas.width / 2 - 60 * 1 - 25, y:canvas.height - 60, width:50, height:50},"E", 36,function() {handleInput("e");}),
        new Button(rect = {x: canvas.width / 2 - 25, y:canvas.height - 60, width:50, height:50}         ,"F", 36,function() {handleInput("f");}),
        new Button(rect = {x: canvas.width / 2 + 60 * 1 - 25, y:canvas.height - 60, width:50, height:50},"G", 36,function() {handleInput("g");}),
        new Button(rect = {x: canvas.width / 2 + 60 * 2 - 25, y:canvas.height - 60, width:50, height:50},"A", 36,function() {handleInput("a");}),
        new Button(rect = {x: canvas.width / 2 + 60 * 3 - 25, y:canvas.height - 60, width:50, height:50},"B", 36,function() {handleInput("b");}),
        new Button(rect = {x: 5, y: 5, width:75, height:25},"Back", 20,function() {navigateTo("Main");})
    ];
}

function mainMenu() {
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = 'bold 36px Allegretto';
    ctx.fillText("Mini games", canvas.width/2, 50);

    buttons = [
        new Button(rect = {x: canvas.width / 2 - 100, y:canvas.height / 2 - 50, width:200, height:50},"Notes on sheet", 24,function() {navigateTo("Note");})
    ];
}

function onGUI() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (currentMenu == "Note")
        noteMenu();
    else if (currentMenu == "Main")
        mainMenu();
  
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].draw();
    }

    ctx.stroke();
}

setInterval(onGUI, 10);