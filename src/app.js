import express from 'express'
import { conn } from './db.js'
import { PORT } from './config.js'

const app = express()

app.get('/', async (req, res) => {
    const [rows] = await conn.query('select * from users')
    res.json(rows)
})

app.get('/ping', async (req, res) => {
    const [result] = await conn.query(`Select "hello world" as Result`);
    res.json(result[0])
})

app.get('/create', async (req, res) => {
    const result = await conn.query('insert into users(name) values ("jhon")')
    res.json(result)
})

app.listen(PORT)