
const wrapper = document.querySelector('#grid');
const numberOfBoxes = 16;

for (let i = 0; i<numberOfBoxes; i++){
    let row = document.createElement('div');
    row.className='row';
    for (let i = 0; i < numberOfBoxes; i++) {
        let box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = i;
        row.appendChild(box);
    }
    wrapper.appendChild(row);
}

const boxes = document.querySelectorAll('.box');

function onHover(e){
    this.style.backgroundColor="red";
}

boxes.forEach(box => box.addEventListener('mouseover', onHover) );