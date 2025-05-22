import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useEffect } from 'react';
import { TutorialVisto, setTutorialVistoTrue } from './utils/TutorialTracker';

function TutorialDriver({ tematicasDesbloqueadas }) {

  useEffect(() => {
    const tutorialKey = 'tutorial_tematicas';

    if (!TutorialVisto(tutorialKey)) {
      startTutorial();
      setTutorialVistoTrue(tutorialKey);
    }
  }, []);

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

     const stepsCount = steps.length;  
    const instance = driver({
      steps,
      animate: true,
      opacity: 0.75,
      padding: 10,
      doneBtnText: 'CERRAR',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      showProgress: true,
      allowClose: false,
      overlayClickNext: false,

      onPopoverRender: (popover, { state }) => {
        
        const ultimaDiapositiva = document.createElement('button');
        ultimaDiapositiva.innerText = 'Finalizar';
        
        Object.assign(ultimaDiapositiva.style, {
          backgroundColor: '#c62828',
          color: 'white',
          borderRadius: '5px',
          padding: '8px 16px',
          marginRight: '10px',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          boxShadow: 'none',
          textShadow: 'none',
          outline: 'none',
          display: 'inline-block',
        });

        ultimaDiapositiva.addEventListener('click', () => {
        instance.drive(stepsCount);
        });

        popover.footerButtons.prepend(ultimaDiapositiva);
      },
    });

    instance.drive();
  };

  return null;
}

export default TutorialDriver