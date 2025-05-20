const KEY = 'tematicas_desbloqueadas';

export const getTematicasDesbloqueadas = () => {
  const stored = localStorage.getItem(KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const setTematicasDesbloqueadas = (tematicas) => {
  localStorage.setItem(KEY, JSON.stringify(tematicas));
};

export const agregarTematicaDesbloqueada = (nombre) => {
  const actuales = getTematicasDesbloqueadas();
  if (!actuales.includes(nombre)) {
    const nuevas = [...actuales, nombre];
    setTematicasDesbloqueadas(nuevas);
    return nuevas;
  }
  return actuales;
};