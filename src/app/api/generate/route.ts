import { NextResponse } from "next/server";

const PRO_MODEL = "bytedance-seed/seedream-4.5";
const DRAFT_MODEL = "black-forest-labs/flux.2-klein-4b";

const STUDIO_PROMPT_PREFIX =
  "3d product render, cinematic lighting, photorealistic, highly detailed, octane render, unreal engine 5, professional studio photography, ";

export async function POST(req: Request) {
  try {
    const { prompt, draft } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    const model = draft ? DRAFT_MODEL : PRO_MODEL;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://populique.com",
        "X-Title": "Populique",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "user",
            content: `${STUDIO_PROMPT_PREFIX}${prompt}`,
          },
        ],
        modalities: ["image"],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        { error: `OpenRouter error (${response.status}): ${detail}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const images = data.choices?.[0]?.message?.images;

    if (!images?.[0]?.image_url?.url) {
      return NextResponse.json(
        { error: "No image returned from OpenRouter" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      imageUrl: images[0].image_url.url,
      model,
    });
  } catch (error: unknown) {
    console.error("OpenRouter API Error:", error);
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
