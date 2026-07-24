// src/app/api/health/route.ts

import { NextResponse } from "next/server";
import {
  getAppEnvironment,
  getDeploymentId,
  isSiteIndexingEnabled,
} from "@src/lib/runtime/environment";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      appEnvironment: getAppEnvironment(),
      deploymentId: getDeploymentId(),
      indexingEnabled: isSiteIndexingEnabled(),
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
