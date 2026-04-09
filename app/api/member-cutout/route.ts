import { NextRequest, NextResponse } from "next/server";

import {
  getMemberCutout,
  getMemberCutoutCacheControl,
} from "@/lib/member-cutout";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");

  if (!src) {
    return new NextResponse("Missing src parameter", { status: 400 });
  }

  const cutout = await getMemberCutout(src);

  if (!cutout) {
    return NextResponse.redirect(src, {
      status: 307,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  return new NextResponse(cutout, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": getMemberCutoutCacheControl(),
    },
  });
}
