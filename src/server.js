// CommonJs => Padrão de importação
// EsModules são mais comuns => import/export

// Stateful vs Statless

const users = []

import http from 'node:http'

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
    // responsta só pode ser: string, buffer ou uint8array
    // JSON - transicao de dados entra front e back (Javascript Object Notation)
    // Muito utilizado na transicao de dados de front-back e back-back
    // Se assemelha com muito a como as estruturas de dados são dentro do js
    // representar arrays, objetos, tipos primitivos dentro de uma string
    // transitar dados entre várias aplicações
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: '1',
      name: 'John Doe',
      email: 'email@example.com',
    })

    return res.end('Criação de usuários')
  }

  return res.end('Hello World')
})

// localhost:3333
server.listen(3333)
