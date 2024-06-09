import http from "node:http"

const users = []

const server = http.createServer((request, response) => {
    const { method, url } = request

    if (method === 'GET' && url === '/users') {
        return response
            .setHeader('Content-type', 'application/json') // formatação de metadados 
            .end(JSON.stringify(users))
    } 

    if(method === 'POST' && url === '/users'){
        users.push({
            id: 1,
            name: 'William',
            email: 'will.ribeiro@live.com'
        })

        return response.writeHead(201).end()
    } 

    return response.writeHead(404).end("Não Encontrado")

    
})

server.listen(3333)  // localhost:3333

/*  
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