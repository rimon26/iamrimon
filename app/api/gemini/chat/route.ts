import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
// Adjust this path to wherever your GEMINI_SYSTEM_PROMPT is stored in your Next.js project
import { GEMINI_SYSTEM_PROMPT } from "@/app/data";

let aiInstance: GoogleGenAI | null = null;

// Lazy initialization of GoogleGenAI
function getGenAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY environment variable is required but is missing. Please add it to your .env.local file.",
      );
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

export async function POST(req: NextRequest) {
  try {
    // In Next.js, we parse the inbound JSON payload using req.json()
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "A message property is required in the request body." },
        { status: 400 },
      );
    }

    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: GEMINI_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const replyText =
      response.text || "I apologize, but I struggled to analyze that request.";

    return NextResponse.json({ response: replyText });
  } catch (err: any) {
    console.error("Next.js Gemini Gateway Failure:", err);
    return NextResponse.json(
      { error: err.message || "Internal server gateway crash." },
      { status: 500 },
    );
  }
}
