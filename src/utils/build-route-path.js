// '/users/:id'
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-z]+)/g // retorno do indice 1
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)') // $1 pega retorno na posicao 1 e coloca como nome (id)

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}  