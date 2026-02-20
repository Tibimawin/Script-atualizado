module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Extrair headers relevantes para passar adiante
    const headers = { ...req.headers };
    delete headers.host;
    delete headers['x-vercel-id'];
    delete headers['x-vercel-forwarded-for'];
    delete headers['x-real-ip'];
    delete headers['forwarded'];

    try {
        const fetchOptions = {
            method: req.method,
            headers: {
                ...headers,
                'Content-Type': req.headers['content-type'] || 'application/json',
            }
        };

        // Se houver corpo na requisição, passá-lo adiante
        if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
            fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        }

        const response = await fetch(url, fetchOptions);
        const data = await response.text();

        // Repassar os headers de CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');

        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        // Tentar enviar como JSON se for, caso contrário enviar como texto
        try {
            const jsonData = JSON.parse(data);
            res.status(response.status).json(jsonData);
        } catch (e) {
            res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Proxy error', details: error.message });
    }
};
