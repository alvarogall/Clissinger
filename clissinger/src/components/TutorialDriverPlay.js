import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { TutorialVisto, setTutorialVistoTrue } from './utils/TutorialTracker';
import { useEffect } from 'react';



function TutorialDriver() {

  useEffect(() => {
    const tutorialKey = 'tutorial_inicio';

    if (!TutorialVisto(tutorialKey)) {
      startTutorial();
      setTutorialVistoTrue(tutorialKey);
    }
  }, []);
  const startTutorial = () => {
    const steps = [
      {
        element: '#inicio-bienvenida',
        popover: {
          title: '¡BIENVENIDO!',
          description: '¡Bienvenido a Clissinger! En estos tutoriales aprenderás lo necesario para jugar.',
          position: 'bottom',
        },
      },
      {
        element: '#inicio-ajustes',
        popover: {
          title: 'AJUSTES',
          description: 'En esta pestaña puedes configurar tu perfil.',
          position: 'bottom',
        },
        position: 'left-center',
      },
      {
        element: '#inicio-cerrar-sesion',
        popover: {
          title: 'CERRAR SESIÓN',
          description: 'Pulsar SOLO en caso de querer cerrar sesión y volver al inicio de la página.',
          position: 'bottom',
        },
        position: 'left-center',
      },
      {
        element: '#inicio-seleccion-modo',
        popover: {
          title: 'MODO DE JUEGO',
          description: `
            Puedes elegir entre 3 modos de juego distintos:<br />
            <strong>Relámpago</strong><br />Es un modo contrarreloj en el que la rapidez es clave.<br />
            <strong>Normal</strong><br />Es el modo clásico y tranquilo de Clissinger.<br />
            <strong>Ruleta</strong><br />Gira la ruleta para responder un nivel de una categoría aleatoria.
          `,
          position: 'bottom',
        },
        position: 'left-center',
      },
      {
        element: '#inicio-puntos',
        popover: {
          title: 'PUNTOS',
          description: 'Estos son tus puntos. Se consiguen pasando niveles y sirven para desbloquear nuevas temáticas.',
          position: 'bottom',
        },
        position: 'left-center',
      },
      {
        element: '#inicio-jugar',
        popover: {
          title: 'JUGAR',
          description: 'Aquí puedes ver el logo del modo seleccionado y el botón JUGAR. Prueba a intentar pasarte algún nivel 🎮.',
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
          backgroundColor: '#ff3838',
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