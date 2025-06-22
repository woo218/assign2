import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  
  const { mbti } = req.body;

  if (!mbti) {
    return res.status(400).json({ error: "MBTI 유형이 필요합니다." });
  }

  const today = new Date().toISOString().slice(0, 10);

  const prompt = `
오늘 날짜: ${today}
MBTI 유형: ${mbti}

이 사용자의 MBTI 성향을 기반으로 오늘 하루를 기분 좋게 시작할 수 있도록 따뜻한 조언을 150자 이내로 작성해줘.
`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-pro",
      contents: [{ role: "user", parts: [prompt] }],
      generationConfig: {
        temperature: 0.7,
      },
      systemInstruction:
        "당신은 성격 심리 상담사이며, 사용자의 MBTI 유형에 따라 하루를 기분 좋게 시작할 수 있는 따뜻한 조언을 제공합니다. 조언은 짧고 응원하는 말투로 150자 이내로 작성하세요.",
    });

    res.status(200).json({ answer: result.response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini API 호출 중 오류가 발생했습니다." });
  }
}
