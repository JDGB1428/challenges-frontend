# BeKind Network – Admin Dashboard (React + Tailwind + Zustand)

Dashboard administrativo para gestionar **Categorías / Acciones** consumiendo endpoints de BeKind Network con:
- Listado paginado (dinámico)
- Creación de acción/categoría con **upload de imagen**
- Validación de datos con **Zod**
- Formularios con **React Hook Form**
- Estado global con **Zustand**
- Notificaciones con **React Toastify**

---

## ✅ Requisitos

- Node.js **18+** (recomendado 20+)
- npm **9+**
- Token válido para consumir la API

---

## 🚀 Correr el proyecto localmente

1) Instalar dependencias:
```bash
npm install
````

2. Ejecutar el proyecto
```bash
npm run dev
````

3. Direccionar
````
http://localhost:5173/auth/login
````

1) Listado (Paginación)

GET https://dev.api.bekindnetwork.com/api/v1/actions/admin-list?pageNumber=...&pageSize=...

El backend devuelve estructura:
````
{
  "data": {
    "pageSize": 10,
    "pageNumber": 1,
    "totalElements": 35,
    "totalPages": 4,
    "data": [ ... ]
  }
}
````

## ✅ Decisión técnica:

Se implementó paginación dinámica desde el store (Zustand) con:
````
setPage(pageUI)
setPageSize(size)
fetchActions(pageNumber, pageSize)
````

Nota importante sobre pageNumber
Se asumió que el backend trabaja con paginación 1-based (primera página = 1),
porque pageNumber=0 devolvía 400 Bad Request en pruebas.

2) Crear acción/categoría

POST https://dev.api.bekindnetwork.com/api/v1/actions/admin-add

Payload usado:
````
name: string
description: string
color: string (HEX)
status: 0 | 1 (1 = Activo, 0 = Inactivo)
icon: File
````

## ✅ Decisiones técnicas:

El formulario maneja status como boolean (checkbox) y se transforma a 0 | 1 al enviar.

Se implementa preview de la imagen con URL.createObjectURL.

## 🧠 Decisiones técnicas y arquitectura
## ✅ React + TypeScript

Se usó para tener tipado estricto en:

respuestas del backend

payloads

formularios

## ✅ TailwindCSS

Se usó para replicar la UI del dashboard rápidamente con estilos consistentes.

## ✅ Zustand (estado global)

Se usó para centralizar:

listado paginado (actions)

funciones de paginación (setPage, setPageSize)

creación de acciones (fetchAddAction)

Además, al crear una acción se refresca automáticamente el listado en la misma página.

## ✅ Axios

Se usó por facilidad para:
headers (Authorization)
params (pageNumber, pageSize)
manejo de errores HTTP

## ✅ Zod

Se usó para:
validar la respuesta del backend y evitar errores por contratos inconsistentes
inferir tipos con z.infer<>

✅ React Hook Form

Se usó por:
performance (inputs uncontrolled)
manejo simple de File upload y validaciones

✅ React Toastify

Se usó para:
mostrar éxito al crear una acción
mostrar error si falla (400/403 u otros)
Recomendación implementada/considerada:
Montar ToastContainer en el layout raíz (App.tsx) para evitar problemas al desmontar componentes.

## 📚 Librerías usadas

react / react-dom
typescript
tailwindcss
zustand
axios
zod
react-hook-form
react-toastify

## ✅ Supuestos tomados

El token se guarda en localStorage con key: TOKEN_KEY.
La paginación del backend se comporta como 1-based.

status:
UI: boolean (checkbox)

Backend: 0 | 1
El backend acepta icon como File para el endpoint admin-add.

El response del listado viene envuelto en { data: { ... } }.

## 🐞 Troubleshooting 403 Forbidden

 - Token inválido o sin permisos.
 - Verifica TOKEN_KEY en localStorage.
 - 400 Bad Request con paginación

Confirma si el backend requiere pageNumber iniciando en 1.

Prueba manual:
- pageNumber=1&pageSize=10
- Toastify error (removalReason)
- Montar ToastContainer en App.tsx (root) y no en componentes que se desmontan.
- Actualizar react-toastify a la última versión estable.

