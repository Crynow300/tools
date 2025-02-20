FROM nginx

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx.key \
    -out /etc/ssl/certs/nginx.crt \
    -subj "/C=${SSL_COUNTRY}/ST=${SSL_STATE}/L=${SSL_CITY}/O=${SSL_ORGANIZATION}/CN=${SSL_COMMON_NAME}"

COPY nginx.conf /etc/nginx/nginx.conf

COPY .htpasswd /etc/nginx/.htpasswd

COPY html /var/www/html

