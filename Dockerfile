FROM php:fpm-alpine

RUN apk add --no-cache zip unzip git
RUN docker-php-ext-install pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

RUN composer install --optimize-autoloader --no-interaction

RUN chown -R www-data:www-data storage bootstrap/cache

#

CMD ["sh", "-lc", "php artisan config:clear && php artisan cache:clear && php artisan route:clear && php -S 0.0.0.0:8000 -t public"]
