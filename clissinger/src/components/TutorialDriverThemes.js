import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

function TutorialDriver({ tematicasDesbloqueadas }) {
  const startTutorial = () => {

    //Temáticas desbloqueadas
    const steps = [
      {
        element: '#tema-paises',
        popover: { title: 'PAÍSES', description: 'Imágenes relacionadas con países, su cultura y costumbres típicas.', position: 'bottom' },
        position: 'left-center',
        
    },
      {
        element: '#tema-deportes',
        popover: { title: 'DEPORTES', description: 'Imágenes relacionadas con jugadores de distintos deportes.', position: 'bottom' },
        position: 'left-center',
    },
      {
        element: '#tema-historia',
        popover: { title: 'HISTORIA', description: 'Imágenes relacionadas con personajes y lugares históricos.', position: 'bottom' },
        position: 'left-center',
    },
    ];

    //Para temáticas bloqueadas/desbloqueadas
    if (tematicasDesbloqueadas.includes('videojuegos')) {
    steps.push({
        element: '#tema-videojuegos',
        popover: { title: 'VIDEOJUEGOS', description: 'Imágenes relacionadas con niveles, personajes y objetos de videojuegos.', position: 'bottom' }, 
    });
    }
    if (tematicasDesbloqueadas.includes('series')) {
    steps.push({
        element: '#tema-series',
        popover: { title: 'SERIES', description: 'Imágenes relacionadas con personajes, lugares y momentos icónicos de series.', position: 'bottom' },
       
    });
    }
    if (tematicasDesbloqueadas.includes('peliculas')) {
    steps.push({
        element: '#tema-peliculas',
        popover: { title: 'PELÍCULAS', description: 'Imágenes relacionadas con películas famosas.', position: 'bottom' },
    });
    }

    //Si hay alguna bloqueada
    const bloqueadas = ['videojuegos', 'series', 'peliculas'].filter(t => !tematicasDesbloqueadas.includes(t));
    if (bloqueadas.length > 0) {
    steps.push({
        element: '#tema-bloqueada',
        popover: {
        title: 'TEMÁTICA BLOQUEADA',
        description: `Debes desbloquear la tématica con los puntos que ganes en el juego.`,
        },
    });
    }

     const instance = driver({
      steps,
      animate: true,
      opacity: 0.75,
      padding: 10,
      doneBtnText: 'Finalizar',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      showProgress: true,

      onPopoverRender: (popover, { state }) => {
        const firstButton = document.createElement('button');
        firstButton.innerText = 'Inicio';
        firstButton.style.backgroundColor = '#1e2460';
        firstButton.style.color = 'white';
        firstButton.style.borderRadius = '5px';
        firstButton.style.padding = '8px 16px';
        firstButton.style.marginRight = '10px';
        firstButton.style.fontSize = '14px';
        firstButton.style.cursor = 'pointer';
        firstButton.style.transition = 'background-color 0.3s ease';
        firstButton.style.boxShadow = 'none';         // <- elimina sombra
        firstButton.style.textShadow = 'none';        // <- elimina sombra de texto
        firstButton.style.outline = 'none';           // <- evita bordes al enfocar
        firstButton.style.display = 'inline-block';
        

        firstButton.addEventListener('click', () => {
          instance.drive(0);
        });

        popover.footerButtons.prepend(firstButton);
      },
    });

    instance.drive();
  };

  return <button onClick={startTutorial}>Iniciar Tutorial</button>;
}

export default TutorialDriver