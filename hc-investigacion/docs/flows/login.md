# Flujo de Login

## Endpoints (legacy)
- POST `/login` body `{ usuario, clave }` => token en `data.value.token`
- POST `/login/encriptado` body: token encriptado => token

## UI/Validación
- Zod + React Hook Form (mín 3 chars por campo)
- Errores del backend: `error.errorMessage`

## Token y navegación
- Guardado en `sessionStorage`
- Query `?t=...` dispara login por token encriptado
- Éxito: redirect a `/`
