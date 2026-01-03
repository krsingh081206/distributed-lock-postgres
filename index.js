const express = require('express');
const { Pool } = require('pg');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/*
const argv = yargs(hideBin(process.argv)).options({
    user: { type: 'string', default: 'user' },
    host: { type: 'string', default: 'localhost' },
    database: { type: 'string', default: 'test_db' },
    password: { type: 'string', default: 'password' },
    port: { type: 'number', default: 5432 },
}).argv; */

const argv = yargs(hideBin(process.argv)).options({
    user: { type: 'string', demandOption: true },
    host: { type: 'string', demandOption: true },
    database: { type: 'string', demandOption: true },
    password: { type: 'string', demandOption: true },
    port: { type: 'number', demandOption: true },
}).argv;

const app = express();
const port = 3000;

const pool = new Pool({
  user: argv.user,
  host: argv.host,
  database: argv.database,
  password: argv.password,
  port: argv.port,
});

app.post('/select-for-update', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('SELECT * FROM items WHERE id = 1 FOR UPDATE');
    // Mock business logic
    await client.query('SELECT pg_sleep(0.1)');
    await client.query('COMMIT');
    res.json({ status: 'ok', lock: 'row' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

app.post('/advisory-lock', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('SELECT pg_advisory_xact_lock(12345)');
        // Mock business logic
        await client.query('SELECT pg_sleep(0.1)');
        await client.query('COMMIT');
        res.json({ status: 'ok', lock: 'advisory' });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
