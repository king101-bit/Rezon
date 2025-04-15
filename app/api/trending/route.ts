import { NextResponse } from "next/server";

export async function GET() {
  const {
    RAPIDAPI_KEY,
    RAPIDAPI_HOST = "imdb236.p.rapidapi.com", // Default value as fallback
  } = process.env;

  // 2. Validate required environment variables
  if (!RAPIDAPI_KEY) {
    console.error("Missing RAPIDAPI_KEY environment variable");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  try {
    // 3. Construct URL using validated env vars
    const url = `https://${process.env.RAPIDAPI_HOST}/imdb/most-popular-movies`;

    // 4. Make the API request
    const response = await fetch(url.toString(), {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    // 5. Handle non-OK responses
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `API request failed with status ${response.status}`,
      );
    }

    // 6. Return the successful response
    const movies = await response.json();
    return NextResponse.json(movies);
  } catch (error) {
    // 7. Handle errors with proper logging
    console.error("Trending movies API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "API error",
        hint: "Check server logs for details",
      },
      { status: 500 },
    );
  }
}
