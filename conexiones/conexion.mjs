import pg from 'pg'

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'majoma',
    database: 'dbeparking'
})

export default pool;
