# momijitrip

## Conectar Supabase

1. Sirve el proyecto con Live Server u otro servidor local; no lo abras como `file://`. En Supabase, abre **Project Settings → API** y copia el **Project URL** y la clave **Publishable** (o la antigua clave `anon`).
2. Pega esos dos valores en `supabase-config.js`, en `supabaseUrl` y `supabasePublishableKey`. No uses nunca una clave `service_role` o `secret` en el navegador.
3. En Supabase, abre **SQL Editor**, pega el contenido de `supabase-schema.sql` y ejecútalo. La tabla usa Row Level Security para que cada cuenta solo pueda leer y cambiar sus propias notas.
4. Comprueba en **Authentication → Providers** que Email esté activado. En **Authentication → URL Configuration**, configura **Site URL** como `https://momijitrip.vercel.app` y añade `https://momijitrip.vercel.app/**` a **Redirect URLs**. Si también pruebas localmente, añade además el origen exacto que uses, por ejemplo `http://localhost:5500/**` o `http://127.0.0.1:5500/**`. La aplicación envía el enlace de confirmación a `dashboard.html`; si la URL no está permitida, Supabase puede usar la **Site URL** como alternativa.
5. Regístrate desde `https://momijitrip.vercel.app`, no desde `localhost`. Si cambias las URL permitidas después de pedir el correo, solicita un enlace de confirmación nuevo: los enlaces ya enviados conservan la redirección anterior.

El proyecto carga Supabase JS desde jsDelivr y no necesita instalar npm. La autenticación y las notas se guardan en Supabase; el progreso de las misiones sigue guardándose localmente en el navegador.
