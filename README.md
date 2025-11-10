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



Abrí la app Expo Go y escaneá el código QR, o ejecutala en tu emulador Android/iOS.

Estructura base del proyecto:

cine-app/
 ├── /screens
 │    ├── LoginScreen.js
 │    ├── PeliculasScreen.js
 │    └── AdminUsuariosScreen.js
 ├── /database
 │    └── db.js
 ├── /components
 │    └── BotonPersonalizado.js
 ├── App.js
 ├── app.json
 ├── package.json
 └── README.md


Proyecto desarrollado por Rocío Arruabarrena como práctica integral de desarrollo móvil.