module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        console.log(`Proxying request: ${req.method} ${url}`);

        // Coleta headers de forma robusta
        const headers = {};
        const headerKeys = ['authorization', 'content-type', 'accept'];

        headerKeys.forEach(key => {
            const val = req.headers[key];
            if (val) {
                // Força o nome do header conforme esperado por muitas APIs (Case-Sensitive em alguns casos)
                const normalizedKey = key === 'authorization' ? 'Authorization' :
                    key === 'content-type' ? 'Content-Type' : key;
                headers[normalizedKey] = val;
                console.log(`Forwarding header: ${normalizedKey}`);
            }
        });

        const fetchOptions = {
            method: req.method,
            headers: headers
        };

        if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
            fetchOptions.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        }

        const response = await fetch(url, fetchOptions);
        const data = await response.text();

        console.log(`Target responded with status: ${response.status}`);

        // Tentar enviar como JSON se for, caso contrário enviar como texto
        try {
            const jsonData = JSON.parse(data);
            res.status(response.status).json(jsonData);
        } catch (e) {
            res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: 'Proxy implementation error', details: error.message });
    }
};
