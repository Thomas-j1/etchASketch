
const wrapper = document.querySelector('#grid');
const numberOfBoxes = 16;
const resetButton = document.querySelector('#reset');
const opacitySlider = document.querySelector('#opacitySlider');

let drawColor = 'rgba(0,0,0,0)';
let opacity = 0.5;

for (let i = 0; i<numberOfBoxes; i++){
    let row = document.createElement('div');
    row.className='row';
    for (let i = 0; i < numberOfBoxes; i++) {
        let box = document.createElement('div');
        box.className = 'box';
        row.appendChild(box);
    }
    wrapper.appendChild(row);
}

const boxes = document.querySelectorAll('.box');

function onHover(e){
    let currentColor = this.style.backgroundColor;
    console.log(currentColor);
    this.style.backgroundColor=drawColor;
}

/* XT + (1 - X)(YM + (1 - Y)B)=W

X = the opacity of the top layer, scalar 0...1

T = the RGB color vector of the top layer

Y = the opacity of the middle layer

M = the RGB color vector of the middle layer

B = the RGB color vector of the bottom layer

W = the RGB color vector of the wanted mixing result */

boxes.forEach(box => box.addEventListener('mouseover', onHover) );

function reset(){
    boxes.forEach(box => box.style.backgroundColor='white');
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
console.log(opacity);
});

//change drawColor value at index with new one
function changeRGBA(newValue, oldIndex){ 
    let currentColor = drawColor;
    let rgbaArray = rgbaValuesToArray(currentColor);
    rgbaArray[oldIndex] = newValue;
    console.log(rgbaArray);
    let newColor = 'rgba(' + rgbaArray.join() + ')';
    console.log(newColor);
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