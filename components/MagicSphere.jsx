"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MagicSphere({ size = "lg", color = "primary" }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Определяем размеры на основе размера сферы
  const sphereSizes = {
    sm: {
      sphere: "w-32 h-32",
      container: "w-48 h-48",
      particleCount: 20,
    },
    md: {
      sphere: "w-48 h-48",
      container: "w-64 h-64",
      particleCount: 30,
    },
    lg: {
      sphere: "w-64 h-64",
      container: "w-80 h-80",
      particleCount: 40,
    },
  };

  // Определяем цветовые схемы
  const colorSchemes = {
    primary: {
      main: "from-pink-300 via-purple-500 to-indigo-400",
      glow: "bg-pink-500",
      particles: ["#FF69B4", "#9370DB", "#8A2BE2"],
    },
    blue: {
      main: "from-cyan-300 via-blue-500 to-indigo-400",
      glow: "bg-blue-500",
      particles: ["#00BFFF", "#1E90FF", "#0000FF"],
    },
    green: {
      main: "from-green-300 via-emerald-500 to-teal-400",
      glow: "bg-emerald-500",
      particles: ["#00FA9A", "#00CED1", "#20B2AA"],
    },
    golden: {
      main: "from-amber-200 via-yellow-400 to-orange-300",
      glow: "bg-yellow-400",
      particles: ["#FFD700", "#FFA500", "#FF8C00"],
    },
  };

  // Получаем настройки на основе пропсов
  const sizeConfig = sphereSizes[size] || sphereSizes.lg;
  const colorConfig = colorSchemes[color] || colorSchemes.primary;

  // Хук для создания и анимации частиц
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const containerRect = canvas.getBoundingClientRect();

    // Устанавливаем размер canvas как 2x физического размера для ретина дисплеев
    canvas.width = containerRect.width * 2;
    canvas.height = containerRect.height * 2;

    // Создаем частицы
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const particles = [];

    for (let i = 0; i < sizeConfig.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 60; // Расстояние от центра

      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: 2 + Math.random() * 4,
        speedX: Math.cos(angle) * 0.3,
        speedY: Math.sin(angle) * 0.3,
        color:
          colorConfig.particles[
            Math.floor(Math.random() * colorConfig.particles.length)
          ],
        angle: 0,
        orbitSpeed: 0.005 + Math.random() * 0.01,
        orbitDistance: distance,
        orbitCenter: { x: centerX, y: centerY },
      });
    }

    particlesRef.current = particles;

    // Функция анимации
    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Рисуем частицы
      particles.forEach((particle) => {
        // Обновляем положение по орбите
        particle.angle += particle.orbitSpeed;
        particle.x =
          particle.orbitCenter.x +
          Math.cos(particle.angle) * particle.orbitDistance;
        particle.y =
          particle.orbitCenter.y +
          Math.sin(particle.angle) * particle.orbitDistance;

        // Добавляем немного случайности
        particle.x += (Math.random() - 0.5) * 0.5;
        particle.y += (Math.random() - 0.5) * 0.5;

        // Рисуем частицу
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Добавляем свечение
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Очистка
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [size, color, sizeConfig.particleCount]);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`relative ${sizeConfig.container} flex items-center justify-center`}
      >
        {/* Внешнее свечение */}
        <div
          className={`absolute ${sizeConfig.sphere} rounded-full opacity-10 blur-3xl ${colorConfig.glow} animate-pulse`}
        ></div>

        {/* Частицы с Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute ${sizeConfig.container} z-10`}
          style={{ width: "100%", height: "100%" }}
        />

        {/* Сфера */}
        <motion.div
          className={`${sizeConfig.sphere} rounded-full bg-gradient-radial ${colorConfig.main} z-20 relative overflow-hidden backdrop-blur-sm bg-opacity-80`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1, 0.95, 1],
            opacity: 1,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {/* Внутреннее свечение */}
          <div className="absolute inset-4 rounded-full bg-white bg-opacity-20 blur-md"></div>

          {/* Эффект стекла */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute -inset-full top-3/4 bg-white bg-opacity-20 rotate-45 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Пульсирующий центр */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-1/4 h-1/4 rounded-full bg-white"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ transform: "translate(-50%, -50%)" }}
          ></motion.div>
        </motion.div>

        {/* Кольца вокруг сферы */}
        <motion.div
          className={`absolute ${sizeConfig.sphere} border-2 border-white border-opacity-10 rounded-full`}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>

        <motion.div
          className={`absolute ${sizeConfig.sphere} border border-white border-opacity-5 rounded-full`}
          style={{
            width: `calc(${sizeConfig.sphere.split(" ")[0]} * 1.2)`,
            height: `calc(${sizeConfig.sphere.split(" ")[1]} * 1.2)`,
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
      </div>
    </div>
  );
}
