"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PredictionForm({ onSubmit, isLoading }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="🪄"
            required
            className="w-full h-40 p-6 rounded-3xl bg-white border-2 border-primary focus:border-accent focus:ring-2 focus:ring-accent focus:outline-none transition duration-200 resize-none text-lg font-roboto"
            disabled={isLoading}
          />
          <div
            className="absolute -top-4 -left-4 flower-decoration"
            style={{ backgroundImage: "url('/flower1.png')" }}
          />
          <div
            className="absolute -bottom-4 -right-4 flower-decoration"
            style={{ backgroundImage: "url('/flower2.png')" }}
          />
        </div>

        <motion.button
          type="submit"
          className="w-full py-4 px-8 bg-accent hover:bg-opacity-90 text-white text-xl font-bold rounded-full transition duration-200 shadow-lg font-roboto"
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Пока думаем...
            </span>
          ) : (
            "Что-там у нас? ✨"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
