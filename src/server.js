// CommonJs => Padrão de importação
// EsModules são mais comuns => import/export

// Stateful vs Statless

const users = []

import http from 'node:http'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

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
    const { name, email } = req.body

    users.push({
      id: '1',
      name,
      email
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end('Not found')
})

// localhost:3333
server.listen(3333)
