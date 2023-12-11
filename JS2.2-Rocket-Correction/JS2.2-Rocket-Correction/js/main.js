'use strict';

/***********************************************************************************/
/* ******************************* DONNEES GLOBALES ********************************/
/***********************************************************************************/
const IMG_PATH = 'images/';
const START = 9;

let timer;
let count;

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

// Gestionnaire d'événement au clic sur le bouton de mise à feu
function onClickFiringButton()
{
    // Une fois que la mise à feu lancée, on désactive le bouton de mise à feu
    firingButton.removeEventListener('click', onClickFiringButton);
    firingButton.classList.add('disabled');

    // Programmation du décollage de la fusée à la fin du compte à rebours
    scheduleTakeOff();
    
    // Affichage initial du compte à rebours
    countDown();
    
    // Lancement du compte à rebours
    timer = window.setInterval(countDown, 1000);
    
    // On change la source de l'image de la fusée
    updateRocket('rocket2.gif');
}

/**
 * Programme le décollage de la fusée à la fin du compte à rebours
 */
function scheduleTakeOff()
{
    // Programmation du décollage pour dans x secondes
    setTimeout(function(){

        // On change la source de l'image de la fusée
        updateRocket('rocket3.gif');

        // On fait décoller la fusée en lui donnant la classe 'tookOff', la transition CSS fera le reste
        rocket.classList.add('tookOff');

    }, count * 1000);
}

// Gestion du compte à rebours
function countDown()
{
    // Affichage sur le panneau du compte à rebours
    billboard.textContent = count;
    
    // On décrémente le compteur
    count--;
    
    // Si le compteur arrive à -1, on stoppe le chronomètre
    if( count == -1 ){
        
        window.clearInterval(timer);
    }
}

/**
 * Met à jour l'image de la fusée
 */
function updateRocket(filename)
{
    rocket.src = IMG_PATH + filename;
}

/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/

// Initialisation des variables globales
count = 10;

// Sélection des différents éléments du DOM sur lesquels nous allons agir
const rocket = document.getElementById('rocket');
const billboard = document.querySelector('#billboard span');
const firingButton = document.getElementById('firing-button');

// Installation du gestionnaire d'événement au clic sur le bouton de mise à feu
firingButton.addEventListener('click', onClickFiringButton);