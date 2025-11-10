🎬 CineApp — Gestión y Exploración de Películas

Aplicación móvil creada con React Native (Expo) que combina un sistema local de autenticación usando SQLite y la visualización de películas desde la API de The Movie DB.
El objetivo del proyecto es implementar manejo de roles, CRUD de usuarios y conexión con servicios externos, con un diseño simple y funcional.

Funcionalidades principales:
Sistema de login
Validación de credenciales en SQLite.
Sesión persistente hasta realizar logout.



Redirección según el rol del usuario:

Admin → Panel de gestión de usuarios (CRUD).

User → Pantalla con películas de The Movie DB.



Rol administrador:

Puede crear, editar y eliminar usuarios.

No puede eliminar su propia cuenta.

CRUD completamente local con SQLite.


Rol usuario estándar:

Visualiza películas obtenidas desde la API pública de The Movie DB.

Puede buscar, filtrar y ver detalles de cada película.

Tecnologías utilizadas:

Expo (React Native)

SQLite (expo-sqlite)

React Navigation

The Movie DB API



Instalación y ejecución:

Clonar el repositorio:
git clone https://github.com/tuusuario/cine-app.git
cd cine-app


Instalar dependencias:
npm install

Ejecutar la app:
npx expo start

Configuración de la API de TMDB (src/api/config.js)
Este proyecto utiliza la API pública de The Movie Database (TMDB) para obtener información sobre películas, como títulos, descripciones, imágenes, géneros y más.
Para que la aplicación funcione correctamente, necesitás una API Key de TMDB.

Paso 1: Obtener tu API Key
Entrá a https://www.themoviedb.org
Creá una cuenta gratuita o iniciá sesión.
En tu perfil, abrí Settings → API → Create API Key.
Copia la clave (API Key v3 auth).

Paso 2: Configurar tu clave en el proyecto
En el archivo: config/config.js
Reemplaza 'TU_TMDB_API_KEY_AQUI' por tu clave personal de TMDB.
Ejemplo:
''export const TMDB_API_KEY = '123abc456def789ghi';''


Abrí la app Expo Go y escaneá el código QR, o ejecutala en tu emulador Android/iOS.


Estructura base del proyecto:

📂 proyecto/
 ├── App.js
 ├── components/
 │    └── PeliculaTarjeta.js
 ├── config/
 │    └── config.js
 ├── context/
 │    └── Autenticacion.js
 ├── database/
 │    └── db.js   (maneja usuarios y conexión local)
 ├── screens/
 │    ├── Detalles.js
 │    ├── FormularioUsuario.js
 │    ├── GestionUsuario.js
 │    ├── Login.js
 │    └── Peliculas.js
 ├── services/
 │    └── tmdb.js
 ├── App.js



Proyecto desarrollado por Rocío Arruabarrena como práctica integral de desarrollo móvil.