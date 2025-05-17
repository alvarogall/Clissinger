import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

function TutorialDriver({ tematicasDesbloqueadas }) {
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
            <strong>Relámpago</strong><br />Es un modo contrarreloj con elección de temática.<br />
            <strong>Normal</strong><br />Es un modo clásico tranquilo con temáticas aleatorias.<br />
            <strong>Ruleta</strong><br />No tengo claro que vamos a hacer 3=D.
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
        Object.assign(firstButton.style, {
          backgroundColor: '#1e2460',
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

        firstButton.addEventListener('click', () => {
          instance.drive(0);
        });

        popover.footerButtons.prepend(firstButton);
      },
    });

    instance.drive();
  };

  return (
    <button
      onClick={startTutorial}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Iniciar Tutorial
    </button>
  );
}

export default TutorialDriver;