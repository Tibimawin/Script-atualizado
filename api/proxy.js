module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Configuração de CORS para permitir que o navegador envie o Token
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

    // Se for um preflight do navegador, responde ok logo de cara
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const fetchOptions = {
            method: req.method,
            headers: {}
        };

        // Copia os cabeçalhos essenciais do pedido original
        // Importante: Vercel pode colocar os nomes em minúsculo
        const interestingHeaders = ['authorization', 'content-type', 'accept'];
        interestingHeaders.forEach(h => {
            if (req.headers[h]) {
                fetchOptions.headers[h] = req.headers[h];
            }
        });

        // Se houver corpo na requisição (POST/PUT), passa adiante
        if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
            fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        }

        const response = await fetch(url, fetchOptions);
        const data = await response.text();

        // Tentar enviar como JSON se for, caso contrário enviar como texto
        try {
            const jsonData = JSON.parse(data);
            res.status(response.status).json(jsonData);
        } catch (e) {
            res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Proxy logic error:', error);
        res.status(500).json({ error: 'Proxy error', details: error.message });
    }
};
