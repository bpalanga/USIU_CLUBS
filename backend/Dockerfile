FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql

# Set Apache's document root to /public
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Update the default site to use public/ as root
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# Enable fallback to index.php for any request
RUN echo "FallbackResource /index.php" > /etc/apache2/conf-available/fallback.conf && \
    a2enconf fallback

COPY . /var/www/html

EXPOSE 80
