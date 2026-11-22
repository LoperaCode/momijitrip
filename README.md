# momijitrip

## Conectar Supabase

1. Sirve el proyecto con Live Server u otro servidor local; no lo abras como `file://`. En Supabase, abre **Project Settings → API** y copia el **Project URL** y la clave **Publishable** (o la antigua clave `anon`).
2. Pega esos dos valores en `supabase-config.js`, en `supabaseUrl` y `supabasePublishableKey`. No uses nunca una clave `service_role` o `secret` en el navegador.
3. En Supabase, abre **SQL Editor**, pega el contenido de `supabase-schema.sql` y ejecútalo. La tabla usa Row Level Security para que cada cuenta solo pueda leer y cambiar sus propias notas.
4. Comprueba en **Authentication → Providers** que Email esté activado. En **Authentication → URL Configuration**, configura la URL de tu web y añade sus rutas a las URLs permitidas. Para desarrollo local, añade la dirección que uses para abrir el proyecto, por ejemplo `http://localhost:5500/**`.
5. Abre `index.html`, elige **Crear cuenta** y regístrate con email y contraseña. Si Supabase pide confirmar el correo, usa el enlace que te envíe antes de iniciar sesión.

El proyecto carga Supabase JS desde jsDelivr y no necesita instalar npm. La autenticación y las notas se guardan en Supabase; el progreso de las misiones sigue guardándose localmente en el navegador.
