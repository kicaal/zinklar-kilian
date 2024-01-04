# Setup

Prueba Técnica Kilian Cabrera Álava

- npm install
- cambiar la variable de entorno de la api key por la que os he pasado por correo, si no sería crear una a traves de las settings Developer Settings - Personal access tokens - Tokens (classic)

- npm run dev

## Descripción

Según la descripción de la prueba + lo hablado en el correo, he generado el contador de extensiones por repo, para ellos he añadido algunas funcionalidades extra que he pensado que podrían añadir valor a la prueba.

- Se ha hecho con React, Arquitectura hexagonal, testing con react testing library.

- Funcionalidad completa.

1. Escribir el owner del repo.
2. Escribir el repo.
3. Aparece un selector de ramas.
4. Seleccionamos un rama.
5. Carga las extensiones de ese repo por rama.

Para el contador he realizado una función recursiva en la que va observando si encuentra un elemento tipo "tree", navega hacia dentro, extrayendo todas lo que hay dentro para su posterior tratamiento.

### ¡Espero que os guste!
