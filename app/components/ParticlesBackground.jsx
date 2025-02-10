
import Particles from "react-tsparticles";
import { loadFont } from "tsparticles-engine";

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadFont(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          number: { value: 50 },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 5 },
          move: { enable: true, speed: 1 },
        },
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticlesBackground;