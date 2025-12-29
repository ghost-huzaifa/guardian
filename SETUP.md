## DB Setup
Run the following command to start a PostgreSQL container and create the `guardian` database:

```bash
docker run --name guardian-db -e POSTGRES_DB=guardian -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
To create the database in an existing PostgreSQL container, run:

```bash
docker exec -it <container_name> psql -U postgres -c "CREATE DATABASE guardian;"
```

## Frontend

Run the development server:

```bash
cd frontend
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
