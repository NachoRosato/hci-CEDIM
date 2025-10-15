export type ModuleKey = 'auth' | 'auditoria' | 'evolucion' | 'laboratorio' | (string & {});

export type ModuleFlags = Record<ModuleKey, boolean>;

export async function isModuleEnabled(module: ModuleKey): Promise<boolean> {
  const res = await fetch('/config.json?_=' + Date.now(), { cache: 'no-store' });
  const json = await res.json();
  return Boolean(json?.features?.[module]);
}


