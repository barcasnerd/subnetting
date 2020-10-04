//import html2canvas from 'html2canvas.min.js';

const htmlTag = document.querySelector('html');
const bodyTag = document.querySelector('body');
const myNav = document.querySelector('nav');
const myElem = document.querySelector('nav li a');
var button = document.getElementById('responsiveButton');
var thElements = document.querySelectorAll('th');
var tdElements = document.querySelectorAll('td');
var color = document.getElementById('colorChooser');
var materia = document.getElementById('materia');
var content = document.getElementById('create');
var index = 0;
var id = 0;
var firstColor = true;

//Monitoring actions on color chooser
color.addEventListener('click', () => {
    firstColor = false;
});

//Adding event listener and first attributes to td elements
tdElements.forEach((item) => {
    if (index > 7) {
        item.setAttribute('style', 'background-color:#202020;');
        item.setAttribute('class', 'text-center lead');
        item.setAttribute('id', id++);
        item.setAttribute('status', '1');
        item.addEventListener('click', (ev) => {
            changeColor(item);
        });
    }
    index++;
});

//listen to actiosn on td elements
function changeColor(item) {
    let mate = materia.value;
    let colo = color.value;

    if (firstColor == true || mate.length == 0 || mate.includes('  ', 0)) {
        ruleModal.show();

    } else if (item.getAttribute('status') === '1') {
        if (colo.includes('#ff', 0)) {
            item.setAttribute('style', 'background-color:' + color.value + ';' + 'color:black;padding:0px;');
        } else {
            item.setAttribute('style', 'background-color:' + color.value + ';' + 'color:white;padding:0px;');
        }

        if (materia.value.length <= 9) {
            item.innerText = materia.value.toUpperCase();
        } else {
            item.innerText = materia.value.substring(0, 6).toUpperCase() + "...";
        }
        item.setAttribute('status', '2');
    } else {
        item.setAttribute('style', 'background-color:#202020;');
        item.innerText = ' ';
        item.setAttribute('status', '1');
    }

}

//addign style to  main th elements
thElements.forEach((item) => {
    item.setAttribute('class', 'bg-secondary border-secondary text-light text-center lead');
});

//instances the modals
var myModal = new bootstrap.Modal(document.getElementById('instructiveModal'), {
    keyboard: false
});

var ruleModal = new bootstrap.Modal(document.getElementById('ruleModal'), {
    keyboard: false
});

myModal.show();

//changing background while user is scrolling
let scrolled = () => {
    let dec = scrollY / (bodyTag.scrollHeight - innerHeight);
    return Math.floor(dec * 100);
}

addEventListener('scroll', () => {
    myNav.style.setProperty('background', scrolled() > 20 ? "var(--color2)" : "var(--color1");
});

button.addEventListener('click', () => {
    myNav.style.setProperty('background', "#000000");

});


// instance save and reset buttons
var save = document.getElementById('saveButton');
var reset = document.getElementById('resetButton');

//adding reset button actions
index = 0;
reset.addEventListener('click', () => {
    tdElements.forEach((item) => {
        if (index > 7) {
            item.setAttribute('style', 'background-color:#202020;');
            item.innerText = ' ';
        }
        index++;
    });
});

//adding save button actions
/*save.addEventListener('click',()=>{

});*/

