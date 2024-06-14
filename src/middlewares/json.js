export async function json(request, response) {
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

    response.setHeader('Content-type', 'application/json') // formatação de metadados
}

/*
    O middleware é como um interceptador, que recebe a requisição que lida com essa requisição
    da melhor forma para a aplicação.
*/