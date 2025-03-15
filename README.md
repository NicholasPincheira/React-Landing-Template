Instrucciones de Instalación

Sigue estos pasos para clonar el repositorio, configurar el entorno y levantar los contenedores Docker para ejecutar la aplicación.

Clonar el repositorio
En una terminal, clona el repositorio:

git clone https://github.com/NicholasPincheira/React-Landing-Template

Luego, entra en la carpeta del proyecto:

cd tu_repositorio

Copiar el archivo de ejemplo de entorno
Copia el archivo de ejemplo de entorno y configúralo (por ejemplo, para la base de datos, claves, etc.):

cp .env.example .env

Edita el archivo .env para ajustar las variables necesarias (por ejemplo, APP_URL, DB_HOST, etc.). Nota: En nuestro entorno Docker, asegúrate de que la variable DB_HOST esté configurada con el nombre del servicio MySQL (por ejemplo, mysql).

Configurar .env y vite.config.js para agregar TUIP en el lugar indicado

Instalar dependencias de Composer y Node (opcional)
Si bien el proyecto usa Docker, en algunos casos puede ser útil instalar dependencias localmente para ejecutar comandos Artisan, tests, etc.

Si es necesario, puedes instalar Composer y Node localmente, o bien ejecutarlos dentro del contenedor.

Por ejemplo, para instalar las dependencias de Composer en el contenedor, usa:

docker-compose run --rm app composer install

Para instalar las dependencias de Node (dentro del contenedor):

docker-compose run --rm app npm install

Nota: Si prefieres, puedes instalar Composer y Node localmente; pero normalmente es más sencillo hacerlo desde el contenedor para mantener el entorno consistente.

Levantar los contenedores con Docker Compose
Construye y levanta los contenedores con:

docker-compose up -d --remove-orphans

Esto:

Construirá la imagen (usando el Dockerfile).
Levantará los contenedores de app, traefik, mysql (y phpmyadmin si está incluido).
Ejecutar el servidor de Laravel
Si usas el comando "php artisan serve" (como en la opción 1 de nuestra configuración), ya estará corriendo dentro del contenedor.

Si necesitas ejecutar algún comando de Artisan (por ejemplo, migraciones), ingresa al contenedor:

docker-compose exec app php artisan migrate

O bien, para limpiar la caché:

docker-compose exec app php artisan config:clear

Acceder a la aplicación y herramientas
Aplicación Laravel: Accede a través de http://localhost (Traefik enruta las peticiones al servicio "app").

Servidor Vite: Los assets se sirven a través de Vite (normalmente en segundo plano, redirigido por Traefik para rutas como /@vite).

phpMyAdmin (si está incluido): Accede a través de http://localhost:8080

Resumen de Comandos

Clonar y entrar al proyecto: git clone https://github.com/tu_usuario/tu_repositorio.git cd tu_repositorio

Configurar el entorno: cp .env.example .env

Editar .env según sea necesario
(Opcional) Instalar dependencias dentro del contenedor: docker-compose run --rm app composer install docker-compose run --rm app npm install

Levantar los contenedores: docker-compose up -d --remove-orphans

Configurar .env y vite.config.js para agregar TUIP en el lugar indicado

Ejecutar migraciones y otros comandos de Artisan, si es necesario: docker-compose exec app php artisan migrate