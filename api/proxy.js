module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Permitir CORS para que o navegador não bloqueie a resposta
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const fetchOptions = {
            method: req.method,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            }
        };

        // Repassa cabeçalhos importantes do navegador para o destino
        // Usamos um mapeamento para garantir que fiquem no formato correto (ex: Authorization com A maiúsculo)
        Object.keys(req.headers).forEach(key => {
            const lowKey = key.toLowerCase();
            const protectedHeaders = ['host', 'connection', 'x-vercel-id', 'x-vercel-forwarded-for', 'x-real-ip', 'forwarded', 'origin', 'referer', 'content-length'];

            if (!protectedHeaders.includes(lowKey)) {
                // Normaliza o nome do header para evitar rejeições de APIs sensíveis
                const normalizedKey = lowKey === 'authorization' ? 'Authorization' :
                    lowKey === 'content-type' ? 'Content-Type' :
                        lowKey === 'accept' ? 'Accept' : key;
                fetchOptions.headers[normalizedKey] = req.headers[key];
            }
        });

        // Se houver corpo (POST/PUT), enviamos
        if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
            fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        }

        const response = await fetch(url, fetchOptions);
        const contentType = response.headers.get('content-type');

        // Se for 401, repassamos o erro para o usuário saber que a senha falhou
        if (response.status === 401) {
            const errDetail = await response.text();
            return res.status(401).json({
                error: 'Unauthorized upstream',
                detail: errDetail,
                sentHeaders: fetchOptions.headers
            });
        }

        const data = await response.text();

        // Repassa os cabeçalhos de conteúdo do original (opcional mas bom para vídeos)
        if (contentType) res.setHeader('Content-Type', contentType);

        // Se for JSON, envia como JSON. Senão, envia como texto/binário.
        try {
            const jsonData = JSON.parse(data);
            res.status(response.status).json(jsonData);
        } catch (e) {
            res.status(response.status).send(data);
        }

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({
            error: 'Failed to fetch upstream',
            message: error.message,
            targetUrl: url
        });
    }
};
