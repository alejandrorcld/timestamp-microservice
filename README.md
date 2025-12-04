# Timestamp Microservice

Proyecto de FreeCodeCamp: Microservicio de marca temporal.

## Endpoints

- `GET /api`  
  Devuelve la fecha actual en formato UNIX y UTC.

- `GET /api/:date`  
  - Si `:date` es un número → se interpreta como milisegundos UNIX.  
  - Si `:date` es una cadena válida → se interpreta como fecha.  
  - Si no es válido → `{ "error": "Invalid Date" }`.

## Ejemplos

- `/api/2015-12-25` → `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`
- `/api/1451001600000` → `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`
