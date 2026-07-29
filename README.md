# Posada

Sitio web de reservas para un hostel, construido con Next.js (App Router),
Supabase (Auth + Postgres) y Tailwind CSS. Incluye un área pública, un área
de cliente y un área de administración protegida por rol.

## Stack

- **Next.js 16** (App Router, Server Actions)
- **Supabase**: Auth (email/password) + Postgres + Row Level Security
- **Tailwind CSS 4**
- **Zod** para validación de formularios

## Estructura de carpetas

```
src/
  app/
    (public)/            Home, habitaciones, contacto (layout con navbar/footer)
    (auth)/               login, registro, recuperar/actualizar contraseña
    (client)/             dashboard, reservas, perfil — requiere sesión
    (admin)/admin/         panel, habitaciones, reservas, usuarios — requiere rol admin
    api/auth/callback/     intercambia el código de confirmación de Supabase por sesión
    layout.tsx             layout raíz
  middleware.ts           refresca la sesión y protege /admin y el área de cliente
  components/
    ui/                    button, input, label, card
    auth/                  formularios de login/registro/reset
    layout/                navbars, sidebars, botón de logout
    admin/                 formularios y controles del panel admin
    reservations/          formulario de nueva reserva
    profile/               formulario de perfil
  lib/
    supabase/              clientes de browser, server y helper de middleware
    actions/                Server Actions (auth, reservas, habitaciones, admin, perfil)
    validations/            esquemas Zod
  types/                   tipos de la base (Database, Profile, Room, Reservation)
supabase/
  schema.sql               tablas, RLS y trigger para crear el perfil al registrarse
```

## Puesta en marcha

1. Creá un proyecto en [supabase.com](https://supabase.com).
2. En el **SQL Editor** del proyecto, ejecutá el contenido de
   [`supabase/schema.sql`](supabase/schema.sql). Esto crea las tablas
   `profiles`, `rooms` y `reservations`, el trigger que crea un perfil
   automáticamente al registrarse, y las políticas de RLS.
3. Copiá `.env.local.example` a `.env.local` y completá con las credenciales
   de tu proyecto (Project Settings → API):

   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Instalá dependencias y levantá el servidor:

   ```bash
   npm install
   npm run dev
   ```

5. Registrate desde `/registro`. Por defecto todo usuario nuevo queda con
   rol `client`. Para convertir tu usuario en administrador, corré en el SQL
   Editor de Supabase:

   ```sql
   update public.profiles set role = 'admin' where id = '<tu-user-uuid>';
   ```

   El UUID lo encontrás en Authentication → Users.

## Roles y protección de rutas

- El **middleware** (`src/middleware.ts`) refresca la sesión en cada
  request y redirige:
  - a `/login` si no hay sesión y se intenta acceder a `/dashboard`,
    `/reservas`, `/perfil` o `/admin`;
  - a `/dashboard` si un usuario sin rol `admin` intenta entrar a `/admin`;
  - a `/dashboard` si un usuario ya logueado visita una página de auth.
- Los layouts de `(client)` y `(admin)` repiten la verificación del lado del
  servidor como defensa en profundidad.
- Las políticas de RLS en Postgres son la última línea de defensa: incluso
  si una ruta quedara mal protegida, la base de datos igual filtra qué filas
  puede leer o escribir cada usuario según su rol.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — sirve el build de producción
- `npm run lint` — ESLint
