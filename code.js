var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = '48px serif';

distance = 10;

document.addEventListener("keydown", keyDownHandler, false);

const notes = ["a", "b", "c", "d", "e", "f", "g", "a", "b", "c", "d", "e", "f", "g", "a", "b", "c"];
currentNote = 0;

var gclef = new Image();
gclef.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/GClef.svg/1200px-GClef.svg.png";
gclef.onload = function() {  
    gclef.width = 30;
    gclef.height = 82;      
}

var note = new Image();
note.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/WholeNote.svg/2560px-WholeNote.svg.png";

function keyDownHandler(e) {
    if(e.key == notes[currentNote]) {
        currentNote = random(0,notes.length-1);
    }
}

function random(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawSheet() {
    ctx.drawImage(gclef, 0, canvas.height/2 - (gclef.height/2 * distance/10), gclef.width * distance/10, gclef.height * distance/10);
    ctx.drawImage(note, 100, canvas.height/2+distance*3.5-currentNote*(distance/2),17 * distance/10,10 * distance/10);

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        ctx.moveTo(0, canvas.height/2 - distance * 2 + distance * i);
        ctx.lineTo(canvas.width, canvas.height/2 - distance * 2 + distance * i);
    }
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSheet();
}

setInterval(draw, 10);