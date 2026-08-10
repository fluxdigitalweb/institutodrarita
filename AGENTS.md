# Instituto Dra. Rita — notas para agentes

- Stack: TanStack Start (SSR) + Vite + Tailwind v4 + shadcn/ui, empaquetado con Nitro.
- Rutas por archivo en `src/routes/`; `src/routeTree.gen.ts` es autogenerado, no editarlo a mano.
- `npm run dev` levanta el dev server en el puerto 8080.
- `npm run build` genera el bundle de Vercel (Build Output API) en `.vercel/output`.
  Para otro target, exportar `NITRO_PRESET` (por ejemplo `node-server`).
- Deploy: Vercel, conectado a la rama `main` de este repo.
