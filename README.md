# Distributed Lock with PostgreSQL

This project benchmarks two different distributed locking mechanisms in PostgreSQL: `SELECT FOR UPDATE` and `pg_advisory_xact_lock`.

## Prerequisites

- Docker
- k6
- Node.js
- npm

## Setup

1. **Start the PostgreSQL database:**

   ```bash
   docker-compose up -d
   ```

2. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

3. **Run the Node.js application:**

   ```bash
   node index.js --user <user> --host <host> --database <database> --password <password> --port <port>
   ```

   You can also run the application with default credentials:

   ```bash
   node index.js
   ```

## Benchmarking

To run the benchmark, use the following k6 command:

```bash
k6 run benchmark.js
```

This will run a 30-second test with 10 virtual users for each of the two scenarios: `select_for_update` and `advisory_lock`. The results will be displayed in the console.

## Project Structure

- `index.js`: The Node.js application with two REST endpoints.
- `benchmark.js`: The k6 benchmark script.
- `docker-compose.yml`: Docker Compose file for running PostgreSQL.
- `init.sql`: SQL script to create the sample table.
- `package.json`: Node.js project file.
- `README.md`: This file.
