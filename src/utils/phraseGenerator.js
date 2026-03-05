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

// Word Banks
const banks = {
  triste: {
    nouns: ['Lluvia', 'Silencio', 'Eco', 'Niebla', 'Cristal', 'Lamento', 'Susurro', 'Gris', 'Noche', 'Océano', 'Reflejo', 'Sombra', 'Lágrima', 'Invierno'],
    adjectives: ['Eterno', 'Roto', 'Profundo', 'Olvidado', 'Lejano', 'Invisible', 'Frío', 'Nostálgico', 'Solitario', 'Melancólico', 'Silencioso', 'Azul'],
    contexts: ['de Medianoche', 'del Alma', 'sin Fin', 'en la Oscuridad', 'de Invierno', 'bajo el Agua', 'en el Viento', 'sin Nombre', 'de Cristal', 'en la Distancia']
  },
  feliz: {
    nouns: ['Sol', 'Risa', 'Luz', 'Chispa', 'Danza', 'Color', 'Cielo', 'Verano', 'Melodía', 'Brisa', 'Destello', 'Fiesta', 'Magia', 'Amanecer'],
    adjectives: ['Radiante', 'Eterno', 'Brillante', 'Dorado', 'Infinito', 'Dulce', 'Mágico', 'Vibrante', 'Cálido', 'Alegre', 'Luminoso', 'Festivo'],
    contexts: ['de la Mañana', 'sin Fin', 'de Oro', 'en Libertad', 'del Corazón', 'de Verano', 'Bajo el Sol', 'con Amigos', 'de Colores', 'sin Límites']
  },
  energico: {
    nouns: ['Rayo', 'Trueno', 'Volcán', 'Fuego', 'Tormenta', 'Pulso', 'Motor', 'Ritmo', 'Explosión', 'Llama', 'Fuerza', 'Impulso', 'Salto'],
    adjectives: ['Eléctrico', 'Imparable', 'Fuerte', 'Veloz', 'Ardiente', 'Poderoso', 'Intenso', 'Salvaje', 'Dinámico', 'Vital', 'Activo'],
    contexts: ['de Energía', 'en Movimiento', 'a Toda Velocidad', 'sin Frenos', 'del Futuro', 'en Llamas', 'de Alto Voltaje', 'Indomable', 'Total', 'Máximo']
  },
  tranquilo: {
    nouns: ['Lago', 'Brisa', 'Hoja', 'Nube', 'Jardín', 'Río', 'Bosque', 'Luna', 'Calma', 'Suspiro', 'Horizonte', 'Bambú', 'Arena', 'Olas'],
    adjectives: ['Sereno', 'Suave', 'Lento', 'Flotante', 'Quieto', 'Pacífico', 'Armónico', 'Sutil', 'Zen', 'Natural', 'Fresco', 'Leve'],
    contexts: ['en Calma', 'de Paz', 'al Atardecer', 'del Bosque', 'en Silencio', 'de Cristal', 'bajo la Luna', 'sin Tiempo', 'Fluyendo', 'en Equilibrio']
  },
  nostalgico: {
    nouns: ['Recuerdo', 'Álbum', 'Foto', 'Carta', 'Perfume', 'Huella', 'Ecos', 'Atardecer', 'Infancia', 'Ayer', 'Memoria', 'Viento', 'Estación'],
    adjectives: ['Sepia', 'Lejano', 'Dulce', 'Antiguo', 'Perdido', 'Eterno', 'Dorado', 'Suave', 'Querido', 'Inolvidable', 'Pasado', 'Añorado'],
    contexts: ['del Pasado', 'en el Tiempo', 'de Ayer', 'que Vuelve', 'en la Memoria', 'sin Olvido', 'de Otra Vida', 'en el Corazón', 'Dormido']
  },
  motivado: {
    nouns: ['Cima', 'Meta', 'Camino', 'Fuego', 'Logro', 'Éxito', 'Cumbre', 'Horizonte', 'Visión', 'Paso', 'Salto', 'Victoria', 'Conquista'],
    adjectives: ['Imparable', 'Grande', 'Firme', 'Claro', 'Audaz', 'Valiente', 'Nuevo', 'Positivo', 'Fuerte', 'Decidido', 'Constante', 'Heroico'],
    contexts: ['hacia Arriba', 'sin Límites', 'del Mañana', 'hacia la Meta', 'con Pasión', 'sin Miedo', 'de Campeones', 'Personal', 'Constante']
  }
};

const quoteTemplates = {
  triste: [
    "La tristeza es un {noun} que nos enseña a valorar la {noun2}.",
    "A veces, un {noun} {adj} dice más que mil palabras.",
    "En el fondo de todo {noun}, siempre hay una {noun2} esperando.",
    "Permítete sentir este {noun} {adj}, es parte del camino.",
    "Hasta el {noun} más {adj} termina viendo el sol."
  ],
  feliz: [
    "Tu alegría es como un {noun} {adj} que ilumina todo.",
    "Celebra cada {noun}, porque la vida es un {noun2}.",
    "Hoy es un día {adj} para compartir tu {noun}.",
    "La felicidad se encuentra en cada pequeño {noun}.",
    "Deja que tu {noun} {adj} contagie al mundo."
  ],
  energico: [
    "Eres un {noun} {adj} capaz de todo.",
    "Convierte tu energía en un {noun} {adj}.",
    "Nada detiene a un {noun} en pleno movimiento.",
    "Tu fuerza es como un {noun} {adj} que rompe barreras.",
    "Hoy conquista tu {noun} con espíritu {adj}."
  ],
  tranquilo: [
    "La paz es un {noun} {adj} donde descansa el alma.",
    "Respira como si fueras un {noun} {adj}.",
    "En la calma de un {noun}, encontrarás tu {noun2}.",
    "Sé tan {adj} como un {noun} al amanecer.",
    "El silencio es el {noun} más {adj}."
  ],
  nostalgico: [
    "Cada {noun} es un puente hacia un {noun2} {adj}.",
    "La nostalgia es el {noun} dulce de lo que fue.",
    "Recordar es volver a vivir ese {noun} {adj}.",
    "Guarda este {noun} como un tesoro {adj}.",
    "El tiempo pasa, pero el {noun} permanece."
  ],
  motivado: [
    "Cada paso es un {noun} hacia tu {noun2}.",
    "Tu potencial es un {noun} {adj} esperando despertar.",
    "El éxito es la suma de cada pequeño {noun} {adj}.",
    "Sube a la cima como un {noun} {adj}.",
    "Hoy es el día para construir tu {noun}."
  ]
};

const fillers = {
  noun2: ['luz', 'verdad', 'calma', 'esperanza', 'fuerza', 'alegría', 'magia', 'paz', 'historia', 'vida']
};

export const generatePoeticTitle = (mood) => {
  const bank = banks[mood] || banks['feliz']; // Fallback
  
  // Strategies:
  // 1. Noun + Context (e.g. "Lluvia de Medianoche")
  // 2. Noun + Adjective (e.g. "Silencio Eterno")
  // 3. Adjective + Noun (e.g. "Dulce Melodía")
  
  const strategy = Math.floor(Math.random() * 3);
  let phrase = "";
  
  // Try generating up to 5 times to avoid duplicates
  for (let i = 0; i < 5; i++) {
    const noun = getRandom(bank.nouns);
    const adj = getRandom(bank.adjectives);
    const ctx = getRandom(bank.contexts);
    
    if (strategy === 0) phrase = `${noun} ${ctx}`;
    else if (strategy === 1) phrase = `${noun} ${adj}`;
    else phrase = `${adj} ${noun}`; // Grammar check: In Spanish Adjective-Noun is poetic but tricky with gender. 
                                   // Let's stick to Noun + Adjective mostly for safety, or ensure gender neutrality.
                                   // Actually, let's simplify to mostly Noun + Context or Noun + Adjective to avoid gender issues in simple logic.
                                   // "Eterno Lluvia" is wrong. "Lluvia Eterna" is right.
                                   // To avoid complexity, let's use: Noun + Context OR Noun + " " + Adjective (assuming masc default or checking?)
                                   // Spanish gender is hard to automate without metadata.
                                   // Let's rely on "Context" which is gender-safe ("de ...") 
                                   // and carefully curated Adjectives that match or are neutral, OR use Noun + Context mostly.
    
    // Let's refine the strategy to be safer with Spanish grammar
    if (Math.random() > 0.4) {
      phrase = `${noun} ${ctx}`; // Safe: "Lluvia de Medianoche"
    } else {
      // For Noun + Adjective, we risk gender mismatch. 
      // Let's use a "Title" structure: "El [Noun] [Adjective]" or just "[Noun] [Adjective]" 
      // assuming we curate nouns/adjs to be mostly matching or neutral?
      // Or we can just use Noun + Context which is very poetic.
      // Let's stick to Noun + Context for 70% and maybe just Noun for minimal vibes?
      // Or "Noun" + " " + "Connector" + " " + "Noun2"
      
      const noun2 = getRandom(bank.nouns);
      phrase = `${noun} y ${noun2}`; // "Lluvia y Silencio" - Safe and poetic
    }
    
    if (!isRepeated(phrase)) {
      addToHistory(phrase);
      return phrase;
    }
  }
  return phrase;
};

export const generateQuote = (mood) => {
  const templates = quoteTemplates[mood] || quoteTemplates['feliz'];
  const bank = banks[mood] || banks['feliz'];
  
  let phrase = "";
  
  for (let i = 0; i < 5; i++) {
    const template = getRandom(templates);
    const noun = getRandom(bank.nouns).toLowerCase();
    const adj = getRandom(bank.adjectives).toLowerCase();
    const noun2 = getRandom(fillers.noun2);
    const verb = "transforma"; // Simplified for now
    
    phrase = template
      .replace('{noun}', noun)
      .replace('{noun2}', noun2)
      .replace('{adj}', adj)
      .replace('{verb}', verb);
      
    // Capitalize first letter
    phrase = phrase.charAt(0).toUpperCase() + phrase.slice(1);
    
    if (!isRepeated(phrase)) {
      addToHistory(phrase);
      return phrase;
    }
  }
  return phrase;
};
