import http from "node:http"
import { json } from "./middlewares/json.js"
import {routes} from './middlewares/routes.js'

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)
    
    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    if (route) {
        return route.handler(request,response)
    }

    return response.writeHead(404).end("Não Encontrado")
})

server.listen(3333)  // localhost:3333

/*  ANOTAÇÕES

    CRUD =>  Create (criar), Read (ler), Update (atualizar) e Delete (apagar)

    HTTP
    - Método HTTP
    - URL

    GET, POST, PUT, PATCH, DELETE

    GET => Buscar uma informação do back-end
    POST => Criar uma informação do back-end
    PUT => Atualizar um recurso no back-end
    PATCH => Atualizar uma informação especifica de uma informação no back-end
    DELETE => Deletar um recurso do back-end

    Stateful -> os dados da aplicação fica armazenado localmente na memoria 
    Stateless -> os dados da aplicação sao armazenados em dispositivos externos (bancos de dados etc.)
    
    Cabeçalhos (Requisição/Resposta) => Metadados 

    HTTP Status Code
*/