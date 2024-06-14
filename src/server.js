import http from "node:http"

const users = []

const server = http.createServer(async (request, response) => {
    const { method, url } = request

    const buffers = []

    // garanti que a aplicação não executa a lógica antes de finalizar a leitura da stream por completo
    for await (const chunk of request) {
        buffers.push(chunk)
    }
    
    try {
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        request.body = null
    }
    
    if (method === 'GET' && url === '/users') {
        return response
            .setHeader('Content-type', 'application/json') // formatação de metadados 
            .end(JSON.stringify(users))
    } 

    if(method === 'POST' && url === '/users'){
        const { name, email } = request.body

        users.push({
            id: 1,
            name,
            email
        })

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