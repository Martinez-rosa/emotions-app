// Utility to generate random, non-repetitive phrases for the Mood experience

// Helper to get random item from array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// History management to avoid repetition
const HISTORY_KEY = 'emotions_phrase_history';
const MAX_HISTORY = 50;

const getHistory = () => {
  try {
    return JSON.parse(sessionStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
};

const addToHistory = (phrase) => {
  const history = getHistory();
  const newHistory = [phrase, ...history].slice(0, MAX_HISTORY);
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
};

const isRepeated = (phrase) => {
  return getHistory().includes(phrase);
};

// Word Banks for Titles (Short, poetic)
const titleBanks = {
  triste: {
    nouns: ['Lluvia', 'Silencio', 'Eco', 'Niebla', 'Cristal', 'Lamento', 'Susurro', 'Gris', 'Noche', 'Océano', 'Reflejo', 'Sombra', 'Lágrima', 'Invierno', 'Melancolía'],
    contexts: ['de Medianoche', 'del Alma', 'sin Fin', 'en la Oscuridad', 'de Invierno', 'bajo el Agua', 'en el Viento', 'sin Nombre', 'de Cristal', 'en la Distancia', 'Eterno', 'Profundo']
  },
  feliz: {
    nouns: ['Sol', 'Risa', 'Luz', 'Chispa', 'Danza', 'Color', 'Cielo', 'Verano', 'Melodía', 'Brisa', 'Destello', 'Fiesta', 'Magia', 'Amanecer', 'Alegría'],
    contexts: ['de la Mañana', 'sin Fin', 'de Oro', 'en Libertad', 'del Corazón', 'de Verano', 'Bajo el Sol', 'con Amigos', 'de Colores', 'sin Límites', 'Radiante', 'Brillante']
  },
  energico: {
    nouns: ['Rayo', 'Trueno', 'Volcán', 'Fuego', 'Tormenta', 'Pulso', 'Motor', 'Ritmo', 'Explosión', 'Llama', 'Fuerza', 'Impulso', 'Salto', 'Energía'],
    contexts: ['en Movimiento', 'a Toda Velocidad', 'sin Frenos', 'del Futuro', 'en Llamas', 'de Alto Voltaje', 'Indomable', 'Total', 'Máximo', 'Vital', 'Eléctrico']
  },
  tranquilo: {
    nouns: ['Lago', 'Brisa', 'Hoja', 'Nube', 'Jardín', 'Río', 'Bosque', 'Luna', 'Calma', 'Suspiro', 'Horizonte', 'Bambú', 'Arena', 'Olas', 'Paz'],
    contexts: ['en Calma', 'de Paz', 'al Atardecer', 'del Bosque', 'en Silencio', 'de Cristal', 'bajo la Luna', 'sin Tiempo', 'Fluyendo', 'en Equilibrio', 'Sereno', 'Suave']
  },
  nostalgico: {
    nouns: ['Recuerdo', 'Álbum', 'Foto', 'Carta', 'Perfume', 'Huella', 'Ecos', 'Atardecer', 'Infancia', 'Ayer', 'Memoria', 'Viento', 'Estación', 'Nostalgia'],
    contexts: ['del Pasado', 'en el Tiempo', 'de Ayer', 'que Vuelve', 'en la Memoria', 'sin Olvido', 'de Otra Vida', 'en el Corazón', 'Dormido', 'Lejano', 'Eterno']
  },
  motivado: {
    nouns: ['Cima', 'Meta', 'Camino', 'Fuego', 'Logro', 'Éxito', 'Cumbre', 'Horizonte', 'Visión', 'Paso', 'Salto', 'Victoria', 'Conquista', 'Ambición'],
    contexts: ['hacia Arriba', 'sin Límites', 'del Mañana', 'hacia la Meta', 'con Pasión', 'sin Miedo', 'de Campeones', 'Personal', 'Constante', 'Imparable', 'Firme']
  }
};

// Curated Quotes (Grammatically correct and poetic)
const quotes = {
  triste: [
    "La tristeza es un muro entre dos jardines.",
    "A veces, llorar es la única forma de que tus ojos vean con claridad.",
    "El silencio también es una respuesta, y a veces, la más honesta.",
    "Permítete sentir la lluvia para poder apreciar el sol cuando vuelva.",
    "No hay noche que no acabe, ni pena que no se transforme.",
    "Las lágrimas limpian el alma y riegan el jardín de la esperanza.",
    "En la profundidad de la tristeza, a menudo encontramos nuestra verdadera fuerza.",
    "Está bien no estar bien todo el tiempo. Tómate tu tiempo para sanar.",
    "La melancolía es la felicidad de estar triste.",
    "Escucha lo que tu corazón necesita decirte en este silencio."
  ],
  feliz: [
    "La felicidad no es un destino, es la forma de viajar.",
    "Tu sonrisa es el mejor accesorio que puedes llevar hoy.",
    "La alegría es contagiosa; pásala.",
    "Hoy es un día perfecto para empezar algo nuevo.",
    "Celebra las pequeñas victorias, porque son la esencia de la vida.",
    "Brilla con luz propia y deja que el mundo se ilumine contigo.",
    "La vida es un eco; si no te gusta lo que recibes, fíjate en lo que emites.",
    "No cuentes los días, haz que los días cuenten.",
    "La felicidad se multiplica cuando se comparte.",
    "Siente la música, baila con la vida y ríe sin miedo."
  ],
  energico: [
    "La energía que necesitas está dentro de ti, ¡despiértala!",
    "No te detengas hasta que te sientas orgulloso.",
    "El único límite es tu mente. ¡Rompe las barreras!",
    "Convierte esa adrenalina en tu combustible para el éxito.",
    "Hoy es el día para mover montañas.",
    "Tu actitud determina tu dirección. ¡Ve con todo!",
    "La vida es movimiento; no te quedes quieto.",
    "Siente el ritmo de tu corazón y síguelo.",
    "Eres una fuerza de la naturaleza. ¡Demuéstralo!",
    "La pasión es energía. Siente el poder que viene de concentrarte en lo que te excita."
  ],
  tranquilo: [
    "La paz viene de adentro. No la busques fuera.",
    "Respira. Todo está en el orden perfecto.",
    "La calma es el superpoder de la mente.",
    "En el silencio encontrarás las respuestas que buscas.",
    "Fluye como el agua, adáptate y sigue tu camino.",
    "Tómate un momento para apreciar lo que tienes ahora.",
    "La serenidad no es la ausencia de tormenta, sino la paz en medio de ella.",
    "Desconecta para reconectar contigo mismo.",
    "La naturaleza no se apresura, y sin embargo, todo se logra.",
    "Deja que tus pensamientos floten como nubes en el cielo."
  ],
  nostalgico: [
    "Recordar es fácil para quien tiene memoria, olvidar es difícil para quien tiene corazón.",
    "La nostalgia es el archivo que guarda nuestros mejores momentos.",
    "No llores porque terminó, sonríe porque sucedió.",
    "A veces, mirar atrás nos ayuda a ver hacia dónde vamos.",
    "Los recuerdos son el perfume del alma.",
    "Cada recuerdo es un ladrillo en la construcción de quien eres hoy.",
    "Honra tu pasado, pero vive tu presente.",
    "La música tiene el poder de traernos de vuelta momentos olvidados.",
    "Hay lugares y canciones que siempre serán un hogar para el corazón.",
    "El tiempo pasa, pero los sentimientos verdaderos permanecen."
  ],
  motivado: [
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No sueñes tu vida, vive tu sueño.",
    "Cree en ti y todo será posible.",
    "El futuro pertenece a quienes creen en la belleza de sus sueños.",
    "La disciplina es el puente entre metas y logros.",
    "Tu único límite eres tú mismo. ¡Supérate!",
    "Hazlo con pasión o no lo hagas.",
    "El momento para empezar es ahora.",
    "Transforma los obstáculos en escalones hacia tu meta.",
    "Eres el arquitecto de tu propio destino."
  ]
};

export const generatePoeticTitle = (mood) => {
  const bank = titleBanks[mood] || titleBanks['feliz'];
  
  let phrase = "";
  
  // Try generating up to 5 times to avoid duplicates
  for (let i = 0; i < 5; i++) {
    const noun = getRandom(bank.nouns);
    const context = getRandom(bank.contexts);
    
    // Simple Noun + Context structure is safe and poetic in Spanish
    // E.g. "Lluvia de Medianoche", "Sol Radiante" (if context is adj), "Rayo de Energía"
    phrase = `${noun} ${context}`;
    
    if (!isRepeated(phrase)) {
      addToHistory(phrase);
      return phrase;
    }
  }
  return phrase;
};

export const generateQuote = (mood) => {
  const moodQuotes = quotes[mood] || quotes['feliz'];
  
  // Pick a random quote from the curated list
  let phrase = "";
  
  for (let i = 0; i < 5; i++) {
    phrase = getRandom(moodQuotes);
    
    if (!isRepeated(phrase)) {
      addToHistory(phrase);
      return phrase;
    }
  }
  
  return phrase;
};
