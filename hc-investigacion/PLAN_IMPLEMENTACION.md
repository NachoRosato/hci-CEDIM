# Plan de Implementacion - ABM Dinamico + Backend MongoDB

## Resumen
Agregar 3 paginas ABM + backend con Next.js API Routes + MongoDB (Mongoose).
Deploy: Vercel (front+API) + MongoDB Atlas (DB).

---

## PASO 1: Instalar dependencias
```bash
# Dependencias de produccion (una por una)
npm install mongoose
npm install bcryptjs
npm install jsonwebtoken

# Tipos para TypeScript
npm install -D @types/bcryptjs
npm install -D @types/jsonwebtoken
```

---

## PASO 2: Configurar conexion MongoDB
- Crear `src/lib/mongodb/connection.ts` (singleton serverless)
- Crear `.env.local` con MONGODB_URI y JWT_SECRET
- Verificar que `.env.local` esta en `.gitignore` (ya esta)

---

## PASO 3: Crear modelos Mongoose
- `src/lib/mongodb/models/Protocolo.ts`
- `src/lib/mongodb/models/TipoProtocolo.ts`
- `src/lib/mongodb/models/FormularioDinamico.ts`
- `src/lib/mongodb/models/Usuario.ts`

---

## PASO 4: Crear middleware de auth + API Routes de auth
- `src/lib/mongodb/authMiddleware.ts`
- `app/api/login/route.ts`
- `app/api/ping/route.ts`
- `app/api/seed/route.ts`

---

## PASO 5: Crear API Routes CRUD - Protocolos
- `app/api/protocolos/route.ts` (GET, POST)
- `app/api/protocolos/[id]/route.ts` (PUT, DELETE)

---

## PASO 6: Crear API Routes CRUD - TipoProtocolo
- `app/api/tipos-protocolo/route.ts` (GET, POST)
- `app/api/tipos-protocolo/[id]/route.ts` (PUT, DELETE)

---

## PASO 7: Crear API Routes CRUD - FormularioDinamico
- `app/api/formulario-dinamico/route.ts` (GET, POST)
- `app/api/formulario-dinamico/[id]/route.ts` (PUT, DELETE)

---

## PASO 8: Crear componentes compartidos ABM
- `src/components/abm/ABMTable.tsx`
- `src/components/abm/ABMModal.tsx`
- `src/components/abm/ABMPageLayout.tsx`
- `src/components/abm/ConfirmDialog.tsx`

---

## PASO 9: Crear pagina ABM Protocolos
- `app/protected/abm/protocolos/page.tsx`

---

## PASO 10: Crear pagina ABM Tipos Protocolo
- `app/protected/abm/tipos-protocolo/page.tsx`

---

## PASO 11: Crear pagina ABM Formulario Dinamico
- `app/protected/abm/formulario-dinamico/page.tsx`

---

## PASO 12: Agregar links ABM al Sidebar
- Modificar `src/components/layout/Sidebar.tsx`

---

## PASO 13: Configurar deploy
- Actualizar `public/config.json` para deploy
- Preparar variables de entorno para Vercel
- Configurar MongoDB Atlas

---

## Estado de ejecucion

| Paso | Descripcion                          | Estado      |
|------|--------------------------------------|-------------|
| 1    | Instalar dependencias                | COMPLETADO  |
| 2    | Conexion MongoDB                     | COMPLETADO  |
| 3    | Modelos Mongoose                     | COMPLETADO  |
| 4    | Auth middleware + API auth           | COMPLETADO  |
| 5    | API CRUD Protocolos                  | COMPLETADO  |
| 6    | API CRUD TipoProtocolo              | COMPLETADO  |
| 7    | API CRUD FormularioDinamico          | COMPLETADO  |
| 8    | Componentes compartidos ABM          | COMPLETADO  |
| 9    | Pagina ABM Protocolos                | COMPLETADO  |
| 10   | Pagina ABM Tipos Protocolo           | COMPLETADO  |
| 11   | Pagina ABM Formulario Dinamico       | COMPLETADO  |
| 12   | Links ABM en Sidebar                 | COMPLETADO  |
| 13   | Configurar deploy                    | COMPLETADO  |
