# Nimble Gravity API Challenge

Mini aplicación en React + TypeScript que consume la API de Nimble Gravity para listar posiciones abiertas y enviar postulaciones.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** como bundler y dev server

## Estructura del proyecto

```
src/
├── types/index.ts            # Interfaces TypeScript
├── services/api.ts           # Capa de servicios (GET/POST + manejo de errores)
├── hooks/
│   ├── useCandidate.ts       # Hook para obtener datos del candidato
│   └── useJobs.ts            # Hook para obtener lista de posiciones
├── components/
│   ├── Spinner.tsx            # Indicador de carga
│   ├── ErrorMessage.tsx       # Componente de error
│   ├── JobCard.tsx            # Card individual por posición (input + submit)
│   └── JobList.tsx            # Lista de JobCards
├── App.tsx                    # Componente principal
├── main.tsx                   # Entry point
└── index.css                  # Variables CSS y estilos globales
```

## Getting Started

```bash
npm install
npm run dev
```

## Nota sobre la API

La documentación del challenge indica que el body del POST a `/api/candidate/apply-to-job` requiere los campos `uuid`, `jobId`, `candidateId` y `repoUrl`. Sin embargo, al enviar la solicitud, la API devolvió el siguiente error:

```json
{
  "error": "Invalid body",
  "details": {
    "formErrors": [],
    "fieldErrors": {
      "applicationId": ["applicationId is required"]
    }
  }
}
```

El campo `applicationId` no estaba documentado en las instrucciones del challenge, pero sí se obtiene en la respuesta del endpoint `GET /api/candidate/get-by-email`. Fue necesario agregarlo al body del POST para completar el envío correctamente.
