import {Pool} from "pg";
import {
    DB_HOST, 
    DB_USER, 
    DB_PASSWORD, 
    DB_DATABASE,
} from '../config.js'

export const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: 5432
})