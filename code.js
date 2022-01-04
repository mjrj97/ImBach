// Interfaces
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var player = new Audio();

// Classes
class Button {
    constructor(rect, text) {
        this.rect = rect;
        this.text = text;
    }
}

// Constants
const notes = ["a3", "b3", "c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5", "d5", "e5", "f5", "g5", "a5", "b5", "c6"];
const buttons = [
    new Button(rect = {x: canvas.width / 2 - 60 * 3 - 25, y:canvas.height - 60, width:50, height:50},"C"),
    new Button(rect = {x: canvas.width / 2 - 60 * 2 - 25, y:canvas.height - 60, width:50, height:50},"D"),
    new Button(rect = {x: canvas.width / 2 - 60 * 1 - 25, y:canvas.height - 60, width:50, height:50},"E"),
    new Button(rect = {x: canvas.width / 2 - 25, y:canvas.height - 60, width:50, height:50},"F"),
    new Button(rect = {x: canvas.width / 2 + 60 * 1 - 25, y:canvas.height - 60, width:50, height:50},"G"),
    new Button(rect = {x: canvas.width / 2 + 60 * 2 - 25, y:canvas.height - 60, width:50, height:50},"A"),
    new Button(rect = {x: canvas.width / 2 + 60 * 3 - 25, y:canvas.height - 60, width:50, height:50},"B")
];

// Values
let distance = 15;
let correct = localStorage.getItem("correct") == null ? 0 : localStorage.getItem("correct");
let total = localStorage.getItem("total") == null ? 0 : localStorage.getItem("total");
let currentNote = random(0,notes.length-1);

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
            buttonHandler(buttons[i].text.toLowerCase());
        }
    }
}, false);

function keyUpHandler(e) {
    handleInput(e.key);
}

function buttonHandler(e) {
    handleInput(e);
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
function drawSheet() {
    ctx.drawImage(gclef, 0, canvas.height/2 - (gclef.height/2 * distance/10), gclef.width * distance/10, gclef.height * distance/10);
    ctx.drawImage(note, 100 * distance/10, canvas.height/2+distance*3.5-currentNote*(distance/2),17 * distance/10,10 * distance/10);

    ctx.textAlign = "start";
    ctx.fillStyle = "black";
    ctx.font = 'bold ' + 30*distance/10 + 'px Allegretto';
    ctx.fillText(4, (gclef.width + 10) * distance/10, canvas.height/2);
    ctx.fillText(4, (gclef.width + 10) * distance/10, canvas.height/2 + distance * distance/10 + distance/2);

    ctx.beginPath();

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
    ctx.stroke();
}

function drawPoints() {
    ctx.textAlign = "start";
    ctx.fillStyle = "black";
    ctx.font = 'bold 36px Allegretto';
    ctx.fillText(correct + "/" + total, 20, 50);
}

function drawButtons() {
    ctx.beginPath();
    for (let i = 0; i < buttons.length; i++) {
        ctx.fillStyle = "gray";
        ctx.fillRect(buttons[i].rect.x, buttons[i].rect.y, buttons[i].rect.width, buttons[i].rect.height);
        ctx.strokeStyle = "black";
        ctx.rect(buttons[i].rect.x, buttons[i].rect.y, buttons[i].rect.width, buttons[i].rect.height);
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = 'bold 36px Allegretto';
        ctx.fillText(buttons[i].text, buttons[i].rect.x + buttons[i].rect.width/2, buttons[i].rect.y+buttons[i].rect.height - 12);
    }
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSheet();
    drawPoints();
    drawButtons();
}

setInterval(draw, 10);