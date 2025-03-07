import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { question } = await request.json();

    // Input validation
    if (!question || question.trim() === "") {
      return NextResponse.json(
        { error: "Необходимо указать вопрос" },
        { status: 400 }
      );
    }

    // Create prompt for GPT with specific instructions for Women's Day greeting card
    const prompt = `
      I need a beautiful, positive, and joyful prediction for a woman on International Women's Day.
      The user asked the following question about their future:
      "${question}"
      
      Please provide an optimistic, inspiring, and uplifting response that:
      - Is written in a warm, encouraging tone
      - Contains only positive predictions
      - Includes inspiring words for women
      - Is formatted like a beautiful greeting card
      - Adds brightness and charm suitable for Women's Day
      - Consists of 3-5 paragraphs
      - Ends with a warm greeting for International Women's Day
      
      Respond with only the text of the prediction, without explanations or introductions.
      
      The response should be in Russian.
    `;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a positive, insightful fortune teller who always sees a bright future ahead.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    // Extract the prediction from the response
    const prediction = completion.choices[0].message.content.trim();

    // Return the prediction
    return NextResponse.json({ prediction });
  } catch (error) {
    console.error("Error generating prediction:", error);

    return NextResponse.json(
      { error: "Не удалось сгенерировать предсказание" },
      { status: 500 }
    );
  }
}
