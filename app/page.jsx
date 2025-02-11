"use client";
import { useState, useRef, useEffect } from "react";
import Card from "./components/Card";
import Envelope from "./components/Envelope";
import MoreContent from "./components/Response";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [response, setResponse] = useState(null);
  const [visibleImages, setVisibleImages] = useState([]);

  const audioRef = useRef(null);

  // Rutas de imágenes desde /public
  const images = [
    "/foto9.jpg",
    "/foto6.jpg",
    "/foto8.jpg",
    "/foto3.jpg",
    "/foto10.jpg",
    "/foto1.jpg",
    "/foto5.jpg",
    "/foto2.jpg",
    "/foto4.jpg",
  ];

  const openEnvelope = () => setShowIntro(true);
  const handleShowMessage = () => setIsOpened(true);
  const handleShowMore = () => setShowMore(true);

  const handleResponse = (answer) => {
    setResponse(answer);
    if (answer === "sí") {
      startImageReveal();
    }
  };

  const getRandomPosition = () => {
    const minX = 5;
    const maxX = 90;
    const minY = 10;
    const maxY = 85;

    let top, left;

    do {
      top = Math.random() * (maxY - minY) + minY;
      left = Math.random() * (maxX - minX) + minX;
    } while (
      (top > 40 && top < 60 && left > 40 && left < 60) // Evita el centro
    );

    return { top: `${top}%`, left: `${left}%` };
  };

  const startImageReveal = () => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < images.length) {
        setVisibleImages((prev) => [...prev, { src: images[i], id: Math.random(), position: getRandomPosition() }]);

        setTimeout(() => {
          setVisibleImages((prev) => prev.filter((img) => img.id !== images[i]));
        }, 5000);

        i++;
      } else {
        i = 0; // Reinicia el índice para que el loop siga sin pausas
      }
    }, 1200);
  };

  useEffect(() => {
    if (response === "sí" && audioRef.current) {
      audioRef.current.play().catch((error) => console.log("Reproducción bloqueada:", error));
    }
  }, [response]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="bg-pink-100 flex items-center justify-center min-h-screen p-6 relative">
      <div className="text-center z-10">
        {!isOpened && !showIntro && <Envelope openEnvelope={openEnvelope} />}
        {showIntro && !isOpened && (
          <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-fadeIn">
            <p className="text-gray-800 text-2xl font-bold">Hey Andy, tienes un nuevo mensaje 💌</p>
            <button
              onClick={handleShowMessage}
              className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Ver mensaje
            </button>
          </div>
        )}

        {isOpened && !showMore && (
          <Card
            message="Desde que te conocí, cada día tiene un poquito más de luz, más risas y más momentos que quiero atesorar. 
            No importa si es un día común o una fecha especial, siempre encuentro una razón para sonreír cuando estoy contigo."
            showMore={handleShowMore}
          />
        )}

        {showMore && response === null && <MoreContent handleResponse={handleResponse} />}

        {response && (
          <div className="mt-6 bg-white p-4 rounded-md shadow-lg">
            <p className="text-gray-700 text-lg font-semibold">
              {response === "sí" ? " Te amo mi pedacito de cielo 💘" : "Siga participando"}
            </p>
            {response === "sí" && (
              <>
                <img
                  src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGQ2Y254amVxcTVycmJrYnF0d2hiOWdlanYxbnM1djg1YWR6bzlrbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9QQgttLmAzpZK/giphy.gif"
                  alt="GIF de amor"
                  className="w-60 mx-auto mt-4"
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* 🔹 Imágenes dispersas por la pantalla */}
      {visibleImages.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt="Foto especial"
          className="absolute w-40 h-40 rounded-full transition-opacity duration-5000 ease-in-out opacity-0"
          style={{
            top: image.position.top,
            left: image.position.left,
            transform: `translate(-50%, -50%)`,
            animation: `fadeInOut 5s ease-in-out forwards`,
          }}
        />
      ))}

      {/* 🔹 Audio de fondo */}
      <audio ref={audioRef} loop>
        <source src="/billie-eilish-birds-of-a-feather.mp3" type="audio/mp3" />
        Tu navegador no soporta el audio.
      </audio>

      {/* 🔹 Animaciones en CSS */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.5); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.2); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}