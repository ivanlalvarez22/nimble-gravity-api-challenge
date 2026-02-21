# Nimble Gravity — Junior Fullstack Developer Challenge

## Objetivo

Crear una mini aplicación en React que se conecta a la API de Nimble Gravity para mostrar posiciones abiertas y enviar una postulación.

## BASE_URL

```
https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net
```

---

## Pasos

### Step 1 — Crear el repositorio en GitHub

- Crear un repositorio **público** en GitHub.
- Hacer al menos un **commit inicial**.
- Tener a mano la URL del repo (ej: `https://github.com/tu-usuario/tu-repo`).

### Step 2 — Obtener datos de candidato

**Request:**

```
GET {BASE_URL}/api/candidate/get-by-email?email=TU_EMAIL
```

**Response (200):**

```json
{
  "uuid": "a1b2c3d4-...",
  "candidateId": "a1b2c3d4",
  "applicationId": "a1b2c3d4",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com"
}
```

### Step 3 — Obtener la lista de posiciones abiertas

**Request:**

```
GET {BASE_URL}/api/jobs/get-list
```

**Response (200):**

```json
[
  { "id": "4416372005", "title": "Fullstack developer" },
  { "id": "9100000001", "title": "Head Chef" }
]
```

### Step 4 — Mostrar un listado de posiciones

Crear un componente en React que muestre un listado de las posiciones obtenidas. Cada item debe incluir:

- Título de la posición (`title`)
- Un campo de **input** donde ingresar la URL del repositorio de GitHub
- Un botón **"Submit"** para enviar la postulación a esa posición

### Step 5 — Enviar tu postulación

**Request:**

```
POST {BASE_URL}/api/candidate/apply-to-job
Content-Type: application/json
```

**Body:**

```json
{
  "uuid": "tu uuid (del Step 2)",
  "jobId": "id de la posición (del Step 3)",
  "candidateId": "tu candidateId (del Step 2)",
  "repoUrl": "https://github.com/tu-usuario/tu-repo"
}
```

| Campo         | Valor                                          |
| ------------- | ---------------------------------------------- |
| `uuid`        | Tu `uuid` obtenido en el Step 2                |
| `jobId`       | El `id` de la posición desde la que hacés submit |
| `candidateId` | Tu `candidateId` obtenido en el Step 2         |
| `repoUrl`     | URL de tu repositorio de GitHub                |

**Response exitosa (200):**

```json
{ "ok": true }
```

---

## Requisitos

- Usar **React** (cualquier versión).
- Mostrar un listado de posiciones obtenido de la API.
- Cada posición debe tener un campo de input para la URL del repo y un botón "Submit".
- El botón debe hacer el POST con el body correcto.
- Manejar **estados de carga y error** en la UI.

## Criterios de evaluación

| Criterio                | Qué se evalúa                                          |
| ----------------------- | ------------------------------------------------------- |
| Calidad de código       | Código limpio, legible, buenas convenciones de nombrado |
| Componentes             | Buena separación de componentes                         |
| Manejo de errores       | Manejo adecuado de errores de red y respuestas de API   |
| Presentación visual     | Componente prolijo (no hace falta nada fancy)           |
| Resolución de problemas | Cómo se manejan situaciones inesperadas                 |

## Tip

> Cuando algo no funcione, leé el body de la respuesta — la API devuelve mensajes de error descriptivos.

## Contacto

Dudas: ezequiel.dominguez@nimblegravity.com
