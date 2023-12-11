'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/

let moon = document.getElementById('moon');
let chronoDom = document.querySelector("span");
let launch = document.getElementById('firing-button');
let cancel = document.createElement('img');
let reset = document.createElement('img');
let rocket = document.getElementById('rocket');
let path = "images/";
let updateSpeed = 1000;

let timerID = null;
const chrono = {
    secondes : 10
}


/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

function createCancelBtn() {
    cancel.src = path + "cancel-button.png" // bouton d'annulation de mise à feu
    cancel.id ="cancel-button" // Ajout de l'id "cancel-button"
    cancel.title = "Annulation";
    cancel.style.bottom = "200px";
    cancel.style.position = "absolute";
    cancel.style.left= "100px";
    cancel.style.width= "75px";
    cancel.style.height= "75px";
    cancel.style.cursor= "default";
    cancel.classList.add("disabled")
    launch.after(cancel)
}

function createResetBtn() {
    reset.src = path + "firing-button.png" // bouton d'annulation de mise à feu
    reset.id ="reset-button" // Ajout de l'id "reset-button"
    reset.title = "Réinitialisation";
    reset.style.bottom = "300px";
    reset.style.position = "absolute";
    reset.style.left= "100px";
    reset.style.width= "75px";
    reset.style.height= "75px";
    reset.style.cursor= "default";
    reset.classList.add("disabled")
    cancel.after(reset)
}

/** Affiche les valeurs dans le HTML */
function updateDisplay() {
    // on met à jour l'affichage
    chronoDom.innerText = `${(chrono.secondes < 10) ? '0' + chrono.secondes : chrono.secondes}`;
}

function updateChrono() {
    if(chrono.secondes !== 0) {
        chrono.secondes--;
        console.log(chrono.secondes);
        cancel.addEventListener("click", rocketCanceller, true)
    }

    if(chrono.secondes < 1) {
        cancel.removeEventListener("click", rocketCanceller, true)
        cancel.classList.add("disabled");
        cancel.style.cursor = "default";
        rocket.src = path + "rocket3.gif" // décollage de la fusée
    }

    if(chrono.secondes === 0 ) {
        rocket.classList.add('tookOff') // départ pour l'espace
        reset.classList.remove("disabled");
        reset.style.cursor = "pointer";
        rocketResetter();
    }

    updateDisplay();
}

function timer() {
    if (timerID === null) {
        rocket.src = path + "rocket2.gif" // allumage de la fusée
        timerID = window.setInterval(updateChrono, updateSpeed, chronoDom)
    }
}

function rocketLauncher() {
    launch.title ="Décollage";
    launch.addEventListener("click", () => {
        launch.style.cursor = "default"
        launch.classList.add("disabled")
        cancel.classList.remove("disabled");
        cancel.style.cursor = "pointer"

        // On initialise l'affichage à 10
        updateDisplay();
        timer()
    })
}

function rocketCanceller() {
    clearInterval(timerID);
    rocket.src = path + "rocket1.png"
    reset.classList.remove("disabled");
    reset.style.cursor = "pointer";
    rocketResetter();
}

function rocketResetter() {
    reset.addEventListener("click", () => {
        location.reload()
    })
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createStars() {
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const sizeClass = getRandomSizeClass();
        star.classList.add(sizeClass);

        const xPos = getRandomInteger(0, window.innerWidth);
        const yPos = getRandomInteger(0, window.innerHeight);

        star.style.left = `${xPos}px`;
        star.style.top = `${yPos}px`;

        document.body.appendChild(star);
    }
}

function getRandomSizeClass() {
    const sizeClasses = ['tiny', 'normal', 'big'];
    const randomIndex = getRandomInteger(0, sizeClasses.length - 1);
    return sizeClasses[randomIndex];
}


    /************************************************************************************/
    /* ******************************** CODE PRINCIPAL **********************************/
    /************************************************************************************/

document.addEventListener("DOMContentLoaded", () => {
    createCancelBtn()
    createResetBtn()
    rocketLauncher()
    createStars()
})