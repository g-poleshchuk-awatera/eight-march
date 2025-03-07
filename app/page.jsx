"use client";

import { useState } from "react";
import PredictionForm from "../components/PredictionForm";
import GreetingCard from "../components/GreetingCard";
import { motion } from "framer-motion";
import MagicSphere from "../components/MagicSphere";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (question) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data = await response.json();
      setPrediction({
        question,
        answer: data.prediction,
      });
    } catch (error) {
      console.error("Error getting prediction:", error);
      alert("Извините, что-то пошло не так. Пожалуйста, попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-6 py-16 relative min-h-screen overflow-hidden">
      {/* Background decorations */}
      <div className="fixed -top-20 -left-20 w-60 h-60 rounded-full bg-secondary bg-opacity-20 blur-3xl"></div>
      <div className="fixed -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary bg-opacity-20 blur-3xl"></div>

      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MagicSphere size="md" color="primary" />
        <h1 className="text-5xl md:text-6xl font-lobster text-accent mb-3">
          Мэджик-шар наколдует предсказание
        </h1>
        <p className="text-xl text-gray-600 font-roboto">
          Можно даже спросить про спикас! 🌸
        </p>
      </motion.div>

      {/* Form or Card */}
      {prediction ? (
        <div>
          <GreetingCard prediction={prediction} />
          <div className="text-center mt-10">
            <motion.button
              onClick={() => setPrediction(null)}
              className="px-8 py-3 bg-secondary text-accent text-lg font-semibold rounded-full hover:bg-opacity-80 transition duration-200 font-roboto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Спросить еще разок
            </motion.button>
          </div>
        </div>
      ) : (
        <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}

      {/* Footer */}
      <footer className="text-center mt-20 text-sm text-gray-500 font-roboto">
        <p>Создано пацанами с 💖 для девочек</p>
      </footer>
    </main>
  );
}
