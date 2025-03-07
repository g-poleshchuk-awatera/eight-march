"use client";

import { motion } from "framer-motion";

export default function GreetingCard({ prediction }) {
  if (!prediction) return null;

  return (
    <motion.div
      className="relative max-w-3xl mx-auto my-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative bg-white rounded-3xl p-10 card-shadow overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-secondary to-primary opacity-20"></div>
        <div
          className="absolute -top-8 -left-8 flower-decoration"
          style={{
            backgroundImage: "url('/flower3.png')",
            width: "100px",
            height: "100px",
          }}
        />
        <div
          className="absolute -bottom-8 -right-8 flower-decoration"
          style={{
            backgroundImage: "url('/flower4.png')",
            width: "100px",
            height: "100px",
          }}
        />

        {/* Card content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-lobster text-center text-accent mb-6">
            Ваше будущее ждёт
          </h2>

          <div className="border-3 border-dashed border-secondary rounded-xl p-8 bg-background bg-opacity-70">
            <p className="text-xl text-center font-lobster mb-4">Ваш вопрос:</p>
            <p className="italic text-gray-700 mb-8 text-center text-lg font-roboto">
              {prediction.question}
            </p>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

            <p className="text-xl text-center font-lobster mb-4">
              Ваше будущее:
            </p>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg font-roboto">
              {prediction.answer}
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-primary font-lobster text-3xl">
              С Международным женским днём!
            </p>
            <p className="text-sm text-gray-500 mt-3 font-roboto">
              С любовью, ваш личный предсказатель будущего 💖
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
