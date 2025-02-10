import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Card = ({ message, showMore }) => {
  const [typedMessage, setTypedMessage] = useState("");
  const [typingFinished, setTypingFinished] = useState(false); // Estado para controlar cuando termina la animación

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        setTypedMessage(message.slice(0, i + 1)); // Actualiza el texto completo hasta el índice actual
        i++;
      } else {
        clearInterval(interval);
        setTypingFinished(true); // Marcar como terminado cuando acabe el mensaje
      }
    }, 30); // Velocidad de la escritura

    return () => clearInterval(interval);
  }, [message]);

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-gray-700 text-lg font-semibold leading-relaxed">{typedMessage}</p>
      {typingFinished && (
        <motion.button
  onClick={showMore}
  className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  Así que quiero preguntarte, con todo mi cariño.
</motion.button>
      )}
    </motion.div>
  );
};

export default Card;