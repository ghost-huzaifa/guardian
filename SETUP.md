## DB Setup
Run the following command to start a PostgreSQL container and create the `guardian` database:

```bash
docker run --name guardian-db -e POSTGRES_DB=guardian -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```
To create the database in an existing PostgreSQL container, run:

```bash
docker exec -it <container_name> psql -U postgres -c "CREATE DATABASE guardian;"
```
