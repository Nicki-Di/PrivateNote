#Create MySQL Image for JSP Tutorial Application
FROM mariadb:10.4.21

ENV MYSQL_USER root
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE PrivateNote

ADD SQLscripts.sql /docker-entrypoint-initdb.d
RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/

EXPOSE 3306