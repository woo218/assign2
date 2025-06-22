import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // JSON Body 직접 파싱 코드 추가
  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "잘못된 JSON 형식입니다." });
  }

  const { name, mbti } = body || {};

  if (!name || !mbti) {
    return res.status(400).json({ error: "이름(name)과 MBTI(mbti)가 필요합니다." });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    const prompt = `이름: ${name}
엠비티아이: ${mbti}
오늘 날짜: ${today}
위 정보를 바탕으로 오늘 하루에 어울리는 조언을 친근한 말투로 해줘.`;

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const text = response.text();

    res.status(200).json({ answer: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini API 오류 발생" });
  }
}




