import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Card = ({ message, showMore }) => {
  const [typedMessage, setTypedMessage] = useState([]);
  const [typingFinished, setTypingFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estructura de la carta
  const messageParts = [
    "Querido Andy,", // Encabezado de la carta
    "Desde que te conocí, todo tiene más luz ✨",
    "Tus risas son mi canción favorita 🎶",
    "Cada momento contigo es especial 💖",
    "Solo quiero preguntarte algo importante... 💌",
    "Con mucho amor, Dylan 💕" // Firma
  ];

  useEffect(() => {
    if (currentIndex < messageParts.length) {
      const timeout = setTimeout(() => {
        setTypedMessage((prev) => [...prev, messageParts[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 1200); // Ahora los mensajes aparecen más rápido (1.2s en lugar de 2s)

      return () => clearTimeout(timeout);
    } else {
      setTypingFinished(true);
    }
  }, [currentIndex]);

  return (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-lg mt-6 border-2 border-red-400 max-w-md mx-auto relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ fontFamily: "'Great Vibes', cursive" }} // Tipografía manuscrita romántica
    >
      {/* Encabezado de la carta */}
      <div className="text-left mb-4 text-gray-700">
        <p className="text-lg font-semibold font-serif">📍 De: Dylan</p>
        <p className="text-lg font-semibold font-serif">💌 Para: Andy</p>
      </div>

      {/* Renderiza los fragmentos de texto progresivamente */}
      {typedMessage.map((part, index) => (
        <motion.p
          key={index}
          className="text-gray-700 text-lg leading-relaxed font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }} // Transición más rápida
        >
          {part}
        </motion.p>
      ))}

      {/* Simulación de cursor de escritura */}
      {!typingFinished && <span className="text-red-500 text-2xl animate-pulse">|</span>}

      {/* Botón solo aparece cuando termina la animación */}
      {typingFinished && (
        <motion.button
          onClick={showMore}
          className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
        Click Aquí
        </motion.button>
      )}
    </motion.div>
  );
};

export default Card;