// CommonJs => Padrão de importação
// EsModules são mais comuns => import/export

// Stateful vs Statless


import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    // console.log(extractQueryParams(routeParams.groups.query));

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res);
  }

  return res.writeHead(404).end('Not found')
})

// localhost:3333
server.listen(3333)


    // responsta só pode ser: string, buffer ou uint8array
    // JSON - transicao de dados entra front e back (Javascript Object Notation)
    // Muito utilizado na transicao de dados de front-back e back-back
    // Se assemelha com muito a como as estruturas de dados são dentro do js
    // representar arrays, objetos, tipos primitivos dentro de uma string
    // transitar dados entre várias aplicações
