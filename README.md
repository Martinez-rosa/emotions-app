# Emotions App 🎵

Una experiencia web interactiva diseñada para conectar tus emociones con la música perfecta.

## 🌟 Descripción

Emotions App no es solo un reproductor de música, es un viaje emocional. A través de un test interactivo y visualmente inmersivo, la aplicación detecta tu estado de ánimo actual y genera una playlist personalizada de 10 canciones que resuenan con lo que sientes o lo que necesitas en ese momento.

## ✨ Características Principales

-   **Test de Mood Interactivo**: Selecciona entre 6 estados de ánimo principales (Feliz, Triste, Enérgico, Tranquilo, Nostálgico, Motivado) y define tu necesidad específica (ej. "Quiero desahogarme", "Quiero bailar").
-   **Playlists Dinámicas**: Generación automática de listas de reproducción únicas en cada sesión. El algoritmo mezcla canciones para asegurar variedad.
-   **Integración Profunda con YouTube y Spotify**:
    -   **Smart YouTube Playlists**: Genera automáticamente una lista de reproducción continua ("Watch Queue") con los videos oficiales de las canciones seleccionadas.
    -   **Enlaces Directos**: Acceso inmediato a los videos y pistas oficiales.
-   **Arte Visual de Alta Calidad**: Portadas de álbumes oficiales en alta resolución (600x600) para una experiencia visual premium.
-   **Frases Poéticas Generativas**: Cada resultado viene acompañado de un título y una cita inspiradora única, generada algorítmicamente para conectar con tu estado emocional.
-   **Reproductor Lo-Fi Flotante**: Un compañero musical ambiental que te sigue por la aplicación, con controles animados y diseño minimalista.

## 🛠️ Tecnologías Utilizadas

-   **[React 19](https://react.dev/)**: Biblioteca principal para la interfaz de usuario.
-   **[Vite](https://vitejs.dev/)**: Entorno de desarrollo de próxima generación.
-   **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework de utilidad para un diseño rápido y responsivo.
-   **[Framer Motion](https://www.framer.com/motion/)**: Animaciones fluidas y transiciones de estado complejas.
-   **[React Router](https://reactrouter.com/)**: Enrutamiento dinámico para una experiencia SPA (Single Page Application).

## 🚀 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/Lpsolaress/emotions-app.git
    cd emotions-app
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

4.  **Abrir en tu navegador**:
    Visita `http://localhost:5173` para ver la aplicación en acción.

## 📂 Estructura del Proyecto

Los archivos clave del proyecto se organizan de la siguiente manera:

-   `src/pages/Mood.jsx`: Lógica central del test de emociones y visualización de resultados.
-   `src/data/songs.json`: Base de datos local con más de 60 canciones curadas, incluyendo IDs de YouTube y enlaces a portadas.
-   `src/utils/phraseGenerator.js`: Motor lógico para la generación aleatoria de títulos y frases inspiradoras.
-   `src/components/FloatingMoodPlayer.jsx`: Componente del reproductor flotante con persistencia de estado.

## 🤝 Contribución

Las contribuciones son bienvenidas. Si tienes ideas para nuevas emociones, canciones o funcionalidades:

1.  Haz un Fork del proyecto.
2.  Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`).
3.  Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

---

Desarrollado con ❤️ y mucha música.
