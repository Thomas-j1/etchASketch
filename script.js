
const wrapper = document.querySelector('#grid');
let numberOfBoxes = 16;
const resetButton = document.querySelector('#reset');
const opacitySlider = document.querySelector('#opacitySlider');
const boxInputField = document.querySelector('#nBoxes');

let drawColor = 'rgba(0,0,0,0.5)';
let opacity = 0.5;

let boxes; 

function createBoxes(){
    for (let i = 0; i < numberOfBoxes; i++) {
        for (let i = 0; i < numberOfBoxes; i++) {
            let box = document.createElement('div');
            box.className = 'box';
            box.style.width = `${1 / numberOfBoxes * 100}%`;
            box.style.height = `${1 / numberOfBoxes * 100}%`;
            wrapper.appendChild(box);
        }
    }
    boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.addEventListener('mouseover', onHover));

}

createBoxes();
function onHover(e){
    let currentColor = getComputedStyle(this).backgroundColor;
    let newColor = blendColors(currentColor);
    this.style.backgroundColor=newColor;
}

function blendColors(currentColor){
    /*
    Short answer:
    if we want to overlay c0 over c1 both with some alpha then

    a01 = (1 - a0)·a1 + a0
    r01 = ((1 - a0)·a1·r1 + a0·r0) / a01
    g01 = ((1 - a0)·a1·g1 + a0·g0) / a01
    b01 = ((1 - a0)·a1·b1 + a0·b0) / a01

    Note that division by a01 in the formulas for the components of color. It's important.
*/

    let backgroundColorArray = rgbaValuesToArray(currentColor);
    let drawColorArray = rgbaValuesToArray(drawColor);

    r0 = parseFloat(drawColorArray[0]);
    g0 = parseFloat(drawColorArray[1]);
    b0 = parseFloat(drawColorArray[2]);
    a0 = parseFloat(drawColorArray[3]);

    r1 = parseFloat(backgroundColorArray[0]);
    g1 = parseFloat(backgroundColorArray[1]);
    b1 = parseFloat(backgroundColorArray[2]);
    a1 = parseFloat(backgroundColorArray[3]);

    if(isNaN(a1)){
        a1 = 1.0;
    }


    a01 = (1 - a0) *a1 + a0;
    r01 = ((1 - a0) *a1*r1 + a0*r0) / a01;
    g01 = ((1 - a0) *a1*g1 + a0*g0) / a01;
    b01 = ((1 - a0) *a1*b1 + a0*b0) / a01;

    let newColorArray = [r01, g01, b01, a01];
    let newColor = 'rgba(' + newColorArray.join() + ')';
    console.log(newColor);
    return newColor;
}


function reset(){
    boxes.forEach(box => box.style.backgroundColor = 'rgba(255, 255, 255, 255)');
}

resetButton.addEventListener('click', reset);

const colorButtons = document.querySelectorAll('.colorButton');
colorButtons.forEach(button => button.style.backgroundColor=button.id);


function changeColor(){
    let buttonColor = this.value;
    drawColor = buttonColor;
    updateOpacity(); //update to current opacity
}

colorButtons.forEach(button => button.addEventListener('click', changeColor));


opacitySlider.addEventListener('change', () => {
opacity = opacitySlider.value/100; 
updateOpacity();
});

//change drawColor value at index with new one
function changeRGBA(newValue, oldIndex){ 
    let currentColor = drawColor;
    let rgbaArray = rgbaValuesToArray(currentColor);
    rgbaArray[oldIndex] = newValue;
    let newColor = 'rgba(' + rgbaArray.join() + ')';
    drawColor = newColor;
}

function rgbaValuesToArray(rgbaValues) { //create array from RGBA values
    let values = rgbaValues.split('(')[1].split(')')[0];
    let toArray = values.split(',');
    return toArray;
}

function updateOpacity(){
    changeRGBA(opacity, 3);
}

boxInputField.addEventListener('change', changeBoxCount);

function changeBoxCount(){
    if(boxes){
        boxes.forEach(box => box.remove());
    }
    numberOfBoxes = boxInputField.value;
    if(numberOfBoxes<1){
        numberOfBoxes=1;
    }
    if(numberOfBoxes>100){
        numberOfBoxes= 100;
    }
    createBoxes();
}