# **LA TABERNA** | Proyecto BackEnd

<br />

## **📌 OBJETIVOS**

-  Construir un Servidor utilizando las tecnologías: **Node**, **Express** y **Sequelize**.
-  Afirmar y conectar los conceptos aprendidos en la carrera.
-  Aprender mejores prácticas.
-  Aprender y practicar el workflow de GIT.
-  Utilizar y practicar testing.

<br />

## **⚠️ IMPORTANTE**

Es necesario contar mínimamente con la última versión estable de NodeJS y NPM. Asegúrate de contar con ella para poder instalar correctamente las dependencias necesarias para correr el proyecto. Actualmente las versiones necesarias son:

-  **Node**: 18.16.0 o mayor
-  **NPM**: 6.14.16 o mayor

Para verificar que versión tienes instalada:

```bash
  node -v
  npm -v
```
<br />

## **📋 PARA COMENZAR...**

1. Clona el repositorio en tu computadora para comenzar a trabajar. 

2. Será necesario que crees, **desde psql (shell o PGAdmin)**, una base de datos llamada **`taberna`**. Si no realizas este paso de manera manual no podrás avanzar con la iniciación proyecto:

   ```bash
    CREATE DATABASE taberna;
   ```

3. En la carpeta **principal del proyecto** deberás crear un archivo llamado: **`.env`** que tenga la siguiente forma:

   ```javascript
    DB_USER=usuarioDePostgres
    DB_PASSWORD=passwordDePostgres
    DB_HOST=localhost:5432
   ```

4. Reemplazar **`usuarioDePostgres`** y **`passwordDePostgres`** con tus propias credenciales para conectarte a Postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

5. Instala las dependencias, ejecutando el comando **`npm install`** en la terminal.

6. Inicializa el servidor, ejecutando el comando **`npm start`** en la terminal. Si el servidor está corriendo, deberías ver algo así:

   ```
    [nodemon] starting `node index.js`
    Server raised in PORT: 3001
   ```