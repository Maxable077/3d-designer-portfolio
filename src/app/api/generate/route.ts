import { NextResponse } from "next/server";
import Replicate from "replicate";

// Initialize Replicate API client
// It automatically uses process.env.REPLICATE_API_TOKEN
const replicate = new Replicate();

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Replicate API token is not configured in .env.local" },
        { status: 500 }
      );
    }

    // Run the hyper-realistic FLUX 1.1 Pro model
    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro",
      {
        input: {
          prompt: `3d product render, ${prompt}, cinematic lighting, photorealistic, 8k resolution, highly detailed, octane render, unreal engine 5, professional studio photography`,
          aspect_ratio: "16:9",
          output_format: "webp",
          output_quality: 90,
        }
      }
    );

    // FLUX 1.1 Pro usually returns a single URL string or a stream.
    // If it's a stream, we can't easily JSON it, but replicate.run usually resolves to the final output.
    
    let imageUrl = output;
    
    // Sometimes it's wrapped in an array
    if (Array.isArray(output)) {
      imageUrl = output[0];
    }

    return NextResponse.json({ imageUrl });

  } catch (error: unknown) {
    console.error("Replicate API Error:", error);
    const message = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
