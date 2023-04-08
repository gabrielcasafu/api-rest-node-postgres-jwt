import { config } from "dotenv";

config()

export const LISTEN_PORT = process.env.LISTEN_PORT || 3000
export const DB_USER = process.env.DB_USER || 'postgres'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'base-api'
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret'