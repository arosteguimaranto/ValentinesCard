import React from "react";
import { motion } from "framer-motion";

const Envelope = ({ openEnvelope }) => {
  return (
    <motion.div
      className="relative w-48 h-32 bg-gradient-to-b from-red-500 to-pink-400 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={openEnvelope}
    >
      {/* Solapa del sobre */}
      <motion.div
        className="absolute top-0 left-0 w-48 h-24 bg-red-700 rounded-t-lg transform -translate-y-10 rotate-45 origin-bottom-left"
        whileHover={{ y: -4 }}
      ></motion.div>

      {/* Icono del corazón */}
      <p className="absolute top-10 left-16 text-white text-3xl font-bold">💌</p>

      {/* Animación de corazones flotantes */}
      <div className="absolute -top-4 -left-4">
        <motion.div
          className="text-pink-300 text-2xl"
          animate={{ y: [-10, 10, -10], opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ❤️
        </motion.div>
      </div>
      <div className="absolute -top-6 right-0">
        <motion.div
          className="text-red-300 text-xl"
          animate={{ y: [10, -10, 10], opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          💕
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Envelope;