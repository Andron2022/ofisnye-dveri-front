// src/lib/runtime/environment.ts

export type AppEnvironment = "development" | "staging" | "production";

export function getAppEnvironment(): AppEnvironment {
  const value = process.env.APP_ENV?.trim().toLowerCase();
  if (value === "staging" || value === "production") return value;
  return "development";
}

export function isSiteIndexingEnabled(): boolean {
  return process.env.SITE_INDEXING_ENABLED?.trim().toLowerCase() === "true";
}

export function getDeploymentId(): string | null {
  return process.env.DEPLOYMENT_ID?.trim() || null;
}
