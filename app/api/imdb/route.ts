import { NextResponse } from "next/server";
import type { IMDBApiResponse } from "@/app/types/imdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 },
    );
  }

  try {
    const url = new URL(`https://${process.env.RAPIDAPI_HOST}/auto-complete`);
    url.searchParams.set("q", query);

    const response = await fetch(url.toString(), {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST!,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API request failed");
    }

    const data: IMDBApiResponse = await response.json();
    return NextResponse.json(data.d || []);
  } catch (error) {
    console.error("IMDb API Error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
