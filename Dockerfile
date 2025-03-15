# Imagen base de PHP 8.1-FPM
FROM php:8.1-fpm

# Instalar dependencias de PHP necesarias para Laravel
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Node.js y npm (versión 16 LTS, por ejemplo)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

# Instalar Composer (última versión)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer el directorio de trabajo en el proyecto Laravel
WORKDIR /var/www/laravel

# Exponer el puerto PHP-FPM (no es necesario para Vite)
EXPOSE 9000

CMD ["php-fpm"]
