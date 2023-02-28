import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformedChunk = Number(chunk.toString()) * -1

    console.log(transformedChunk);

    callback(null, Buffer.from(String(transformedChunk)))
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = []

  // percorrer cada pedacinho da stream (req) e add dentro do array
  // após toda a strem ser lida, vemos o conteúdo por completo
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent);

  return res.end(fullStreamContent)
})

// req => readable stream
// res => writable stream

server.listen(3334)