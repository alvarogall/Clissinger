import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { TutorialVisto, setTutorialVistoTrue } from './utils/TutorialTracker';
import { useEffect } from 'react';



function TutorialDriver() {

  useEffect(() => {
    const tutorialKey = 'tutorial_juego';

    if (!TutorialVisto(tutorialKey)) {
      startTutorial();
      setTutorialVistoTrue(tutorialKey);
    }
  }, []);

  const startTutorial = () => {
    const steps = [
      {
        element: '#juego-imagenes',
        popover: {
          title: 'IMÁGENES',
          description: 'Debes adivinar la palabra oculta a partir de estas imágenes.',
          position: 'bottom',
        },
        position: 'left-center',
      },
      {
        element: '#juego-letras',
        popover: {
          title: 'LETRAS',
          description: 'Tienes disponibles este total de letras. Si dispones de teclado puedes usarlo.',
          position: 'bottom',
        },
        position: 'left-center',
      },
      {
        element: '#juego-rayas',
        popover: {
          title: 'RAYAS',
          description: 'Estas rayas representan la longitud de la palabra oculta.',
          position: 'bottom',
        },
        position: 'left-center',
      },
      {
        element: '#juego-borrar',
        popover: {
          title: 'BORRAR',
          description: 'Si te equivocas puedes borrar las letras, no te preocupes 😉.',
          position: 'bottom',
        },
        position: 'left-center',
      },
      
      {
        element: '#juego-aciertos',
        popover: {
          title: 'ACIERTOS',
          description: 'Para pasarte esta temática debes completar el total de aciertos sin fallar 🏆.',
          position: 'bottom',
        },
        position: 'left-center',
      },
      {
        element: '#juego-fallos',
        popover: {
          title: 'INTENTOS',
          description: 'Tienes hasta 3 intentos a lo largo de la temática.',
          position: 'bottom',
        },
        position: 'left-center',
      },
      
      {
        element: '#juego-pista',
        popover: {
          title: 'PISTA',
          description: 'Si se complica mucho, tienes disponible una pista por nivel, hasta un total de 3 por temática 🧠.',
          position: 'bottom',
        },
        position: 'left-center',
      },
    ];

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

export default TutorialDriver;