// src/services/openaiService.js

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (conversationHistory = []) => {
  try {
    const messages = [
      {
        role: "system",
        content:
          "You are a professional WhatsApp business assistant. Be short, polite, and helpful.",
      },
      ...conversationHistory.map((c) => ({
        role: c.role === "assistant" ? "assistant" : "user",
        content: c.message,
      })),
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.5,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    return "Sorry, I’m facing some issues right now. Please try again later 🙏";
  }
};
