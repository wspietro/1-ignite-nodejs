// CommonJs => Padrão de importação
// EsModules são mais comuns => import/export

// Stateful vs Statless

const database = new Database

import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res);

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return res
      .end(JSON.stringify(users))
    // responsta só pode ser: string, buffer ou uint8array
    // JSON - transicao de dados entra front e back (Javascript Object Notation)
    // Muito utilizado na transicao de dados de front-back e back-back
    // Se assemelha com muito a como as estruturas de dados são dentro do js
    // representar arrays, objetos, tipos primitivos dentro de uma string
    // transitar dados entre várias aplicações
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end('Not found')
})

// localhost:3333
server.listen(3333)
