<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Examen Nest

En este repositorio se encuentra mi submission al examen de Nest. El proyecto consiste en una aplicación tipo CRUD que simula una tienda
que vende zapatos. En el proyecto se encuentran los endpoints correspondientes a la creación, modificación, lectura y eliminación de registros.

## Requerimientos

- Postman
- TablePlus
- Docker
- yarn, npm o equivalente

## Pasos de instalación

1. Clonar el proyecto de github, entrar al directorio e instalar las dependencias.

```bash
git clone git@github.com:eric-aduanet/examen-nest.git
cd examen-nest
yarn
```

2. Renombrar el .env.template a .env y rellenar los campos pertinentes.

3. Levantar el contenedor de docker. Para esto debe asegurarse que el daemon de Docker esté en ejecución.

```bash
docker-compose up -d
```

4. Iniciar el servidor de nest.

```bash
yarn start:dev
```

ó

```bash
npm run start:dev
```

4. Importar la colección de Postman (lleva el nombre "Examen Nest.postman_collection.json").

5. Realizar peticiones por medio de postman.

## Endpoints

- **GET /zapatos**: Devuelve todos los zapatos disponibles.
- **GET /zapatos/:id**: Devuelve el zapato dado por el ID (uuid).
- **POST /zapatos**: Dar de alta un nuevo zapato.
- **POST /zapatos/restock**: Restockear zapatos dado un ID.
- **PUT /zapatos/:id**: Actualizar zapato por ID. (No modifica el stock).
- **DELETE /zapato/:id**: Elimina lógicamente un zapato por ID. (No causa conflicto con la tabla de ventas)
- **GET /ventas**: Regresa todas las ventas.
- **GET /ventas/:id**: Regresa la venta por ID numérico (número de venta)
- **POST /ventas**: Crea una nueva venta dado ID de zapato y cantidad vendida.
- **GET /ventas/detalles**: Regresa todas las ventas que cumplan con los filtros dados (marca, género y categoría. Regresa todos si no se proveen filtros).
