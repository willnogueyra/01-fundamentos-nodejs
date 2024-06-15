import http from "node:http"
import {randomUUID} from "node:crypto"
import { json } from "./middlewares/json.js"
import { Database } from "./middlewares/database.js"

const database = new Database()

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)
    
    if (method === 'GET' && url === '/users') {
        const users = database.select('users')

        return response.end(JSON.stringify(users))
    } 

    if(method === 'POST' && url === '/users'){
        const { name, email } = request.body

        const user = {
            id: randomUUID(),
            name,
            email
        }

        database.insert('users', user)

        return response.writeHead(201).end()
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