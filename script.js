const text = document.getElementById("text");

let prevValue = "";
let counter = 1;
let pressedDown = true;
let padSpace = 0;
let span;
let space = '';

let originalWidth = 0;
let width = 0;

let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");

let validInput = false;

document.addEventListener("keydown", (event) => {
    console.log(event.key);
    if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8 ) {
        validInput = true;
        if (pressedDown) {

            // TODO: if letter gets too long and need to go to next line,
            // need to start from the beginning of nextline instead of the padding

            let padSpaceSpan = document.createElement("span");
            space = '\u00A0'.repeat(Math.floor( ((width * padSpace - width) / context.measureText('\u00A0').width)));
            padSpaceSpan.textContent = space;
            prevValue = prevValue + padSpaceSpan.outerHTML;
            console.log("actual: "+Math.floor( (width * padSpace - width) / context.measureText('\u00A0').width));
            console.log("want: "+ (width * padSpace - width));

            span = document.createElement("span");
            span.style.transform = `scale(${counter}, 1)`;
            span.style.display = 'inline-block';
            span.style.transformOrigin = 'left';
            span.textContent = event.key;
            pressedDown = false;
            width = context.measureText(event.key).width;
        }
        span.style.transform = `scale(${counter}, 1)`;
        text.innerHTML = prevValue + span.outerHTML;
        counter += 0.2;
        // console.log(width * counter);
    }else{
        if(event.keyCode == 32){
            let spaceSpan = document.createElement("span");
            spaceSpan.textContent = '\u00A0';
            prevValue = text.innerHTML = prevValue + spaceSpan.outerHTML;
        }else if(event.keyCode == 13){
            let newLine = document.createElement("br");
            prevValue = text.innerHTML = prevValue + newLine.outerHTML;
        }else{
            validInput = false;
        }
    }
});

document.addEventListener("keyup", () => {
    if(validInput){
        pressedDown = true;
        prevValue = text.innerHTML = prevValue + span.outerHTML;
        padSpace = counter;
        counter = 1;
        validInput = false;
    }
});
