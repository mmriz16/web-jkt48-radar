import { NextResponse } from "next/server";

import { getLiveCards } from "@/lib/live-cards";

export async function GET() {
  const payload = await getLiveCards();

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
