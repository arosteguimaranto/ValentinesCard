"use client";
import { useState, useRef, useEffect } from "react";
import Card from "./components/Card";
import Envelope from "./components/Envelope";
import MoreContent from "./components/Response"; // Asegúrate de que este es el archivo correcto

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [response, setResponse] = useState(null);
  
  // Referencia al audio para controlarlo manualmente
  const audioRef = useRef(null);

  const openEnvelope = () => setIsOpened(true);
  const handleShowMore = () => setShowMore(true);

  const handleResponse = (answer) => {
    setResponse(answer);
  };

  // Efecto para reproducir el audio cuando la respuesta es "sí"
  useEffect(() => {
    if (response === "sí" && audioRef.current) {
      audioRef.current.play().catch(error => console.log("Reproducción bloqueada:", error));
    }
  }, [response]);

  // Detener el audio cuando la pestaña no esté activa
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
    <div className="bg-pink-100 flex items-center justify-center min-h-screen p-6">
      <div className="text-center">
        {!isOpened && <Envelope openEnvelope={openEnvelope} />}
        {isOpened && !showMore && (
          <Card
            message=" Desde que te conocí, cada día tiene un poquito más de luz, más risas y más momentos que quiero atesorar. 
            No importa si es un día común o una fecha especial, siempre encuentro una razón para sonreír cuando estoy contigo  "
            showMore={handleShowMore}
          />
        )}

        {/* Solo se muestra si showMore es true y aún no hay respuesta */}
        {showMore && response === null && <MoreContent handleResponse={handleResponse} />}

        {/* Mostrar resultado final cuando el usuario responde */}
        {response && (
          <div className="mt-6 bg-white p-4 rounded-md shadow-lg">
            <p className="text-gray-700 text-lg font-semibold">
              {response === "sí" ? "Te amo Andy 💘" : "Siga participando"}
            </p>
            {response === "sí" && (
              <>
                <img 
                  src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExanRhcHM5bGR0bHBicnp1dnlicml4Y3hkZnl6bWo4d29hOTRqenR2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WtcWaXm0vS3Ic/giphy.gif" 
                  alt="GIF de amor"
                  className="w-60 mx-auto mt-4"
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* Audio siempre en el DOM, pero solo se activa si response === "sí" */}
      <audio ref={audioRef} loop>
        <source src="/billie-eilish-birds-of-a-feather.mp3" type="audio/mp3" />
        Tu navegador no soporta el audio.
      </audio>
    </div>
  );
}