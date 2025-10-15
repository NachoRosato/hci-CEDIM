# Módulos y Feature Flags

- Los módulos se controlan desde `public/config.json` en la clave `features`.
- Helper: `isModuleEnabled(module)` en `src/config/modules.ts`.

## Ejemplo de config
```json
{
  "features": {
    "auth": true,
    "laboratorio": true,
    "auditoria": false
  }
}
```

## Uso
```ts
import { isModuleEnabled } from '@/config/modules';
const laboratorioActivo = await isModuleEnabled('laboratorio');
```
