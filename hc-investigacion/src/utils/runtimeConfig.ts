type Features = Record<string, boolean>;

export type RuntimeConfig = {
  BACKEND_URL: string;
  features: Features;
  authOptional?: boolean;
  mockUser?: string;
};

let cachedConfig: RuntimeConfig | null = null;

export async function getRuntimeConfig(): Promise<RuntimeConfig> {
  if (cachedConfig) return cachedConfig;
  const res = await fetch('/config.json?_=' + Date.now(), { cache: 'no-store' });
  const json = (await res.json()) as RuntimeConfig;
  cachedConfig = json;
  return json;
}

export async function isFeatureEnabled(key: string): Promise<boolean> {
  const cfg = await getRuntimeConfig();
  return !!cfg.features?.[key];
}


