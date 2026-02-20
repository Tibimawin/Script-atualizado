module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Resposta imediata para Preflight do navegador
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const fetchOptions = {
            method: req.method,
            headers: {}
        };

        // Repassa TODOS os cabeçalhos que o navegador enviar, exceto os de controle do Vercel/Host
        const excludeList = ['host', 'connection', 'x-vercel-id', 'x-vercel-forwarded-for', 'x-real-ip', 'forwarded', 'origin', 'referer'];

        Object.keys(req.headers).forEach(key => {
            if (!excludeList.includes(key.toLowerCase())) {
                // Preserva o nome do cabeçalho ou capitaliza o Authorization que é o mais sensível
                const targetKey = key.toLowerCase() === 'authorization' ? 'Authorization' : key;
                fetchOptions.headers[targetKey] = req.headers[key];
            }
        });

        // Se houver corpo na requisição, passamos adiante
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
            // Repassa o status do servidor original (ex: 401, 200, 206)
            res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Proxy Fatal Error:', error);
        res.status(500).json({ error: 'Proxy Error', details: error.message });
    }
};
