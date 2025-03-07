import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const { question } = await request.json();

    // Input validation
    if (!question || question.trim() === '') {
      return NextResponse.json(
        { error: 'Необходимо указать вопрос' },
        { status: 400 }
      );
    }

    // Create prompt for GPT with specific instructions for Women's Day greeting card
    const prompt = `
      Мне нужно красивое, позитивное и радостное предсказание для женщины на Международный женский день.
      Пользователь задал следующий вопрос о своём будущем:
      "${question}"
      
      Пожалуйста, предоставьте оптимистичный, вдохновляющий и поднимающий настроение ответ, который:
      - Написан теплым, ободряющим тоном
      - Содержит только положительные предсказания
      - Включает вдохновляющие слова для женщин
      - Оформлен как красивое поздравление на открытке
      - Добавляет яркости и очарования, подходящего для Женского дня
      - Составляет 3-5 абзацев
      - Заканчивается теплым поздравлением с Международным женским днём
      
      Ответьте только текстом предсказания, без объяснений или вступлений.
      
      Ответ должен быть на русском языке.
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Вы позитивный, проницательный предсказатель будущего, который всегда видит светлое будущее впереди." },
        { role: "user", content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    // Extract the prediction from the response
    const prediction = completion.choices[0].message.content.trim();

    // Return the prediction
    return NextResponse.json({ prediction });
  } catch (error) {
    console.error('Error generating prediction:', error);
    
    return NextResponse.json(
      { error: 'Не удалось сгенерировать предсказание' },
      { status: 500 }
    );
  }
}