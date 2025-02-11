import React from "react";
import { motion } from "framer-motion";

const MoreContent = ({ handleResponse }) => {
  return (
    <motion.div
      className="mt-6 bg-gradient-to-br from-pink-100 to-pink-300 p-6 rounded-2xl shadow-xl text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 📷 Imagen circular más grande */}
      <div className="flex justify-center">
        <img
          src="/foto1.jpg" // Asegúrate de que la imagen esté en /public/
          alt="Imagen especial"
          className="w-52 h-52 rounded-full shadow-xl border-4 border-white mb-4"
        />
      </div>

      <p className="text-gray-800 text-2xl font-bold mb-4">
        ¿Te gustaría ser mi Valentín? 💕
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => handleResponse("sí")}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 to-red-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Sí 💖
        </button>
        <button
          onClick={() => handleResponse("no")}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          No 💔
        </button>
      </div>
    </motion.div>
  );
};

export default MoreContent;