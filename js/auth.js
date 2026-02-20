/**
 * Sistema de Autenticação Simples
 * Gerencia a sessão do usuário localmente
 */
const Auth = {
    // Chave padrão (pode ser alterada futuramente para validar via API)
    // Usando uma chave simples conforme sugerido no plano
    MASTER_KEY: 'admin123',

    SESSION_KEY: 'app_session_token',

    /**
     * Realiza o login salvando a sessão no localStorage
     */
    login(key) {
        if (key === this.MASTER_KEY) {
            const sessionData = {
                authenticated: true,
                timestamp: Date.now()
            };
            localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
            return true;
        }
        return false;
    },

    /**
     * Verifica se existe uma sessão ativa
     */
    check() {
        const session = localStorage.getItem(this.SESSION_KEY);
        if (!session) return false;

        try {
            const data = JSON.parse(session);
            // Sessão expira em 24h
            const isExpired = (Date.now() - data.timestamp) > (24 * 60 * 60 * 1000);

            if (isExpired) {
                this.logout();
                return false;
            }

            return data.authenticated === true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Finaliza a sessão
     */
    logout() {
        localStorage.removeItem(this.SESSION_KEY);
        window.location.href = 'login.html';
    },

    /**
     * Protege a página redirecionando para login se necessário
     * Deve ser chamado no topo de arquivos protegidos
     */
    protect() {
        if (!this.check()) {
            // Se não estiver em login.html, redireciona
            if (!window.location.pathname.includes('login.html')) {
                window.location.href = 'login.html';
            }
        }
    }
};

// Auto-proteção ao carregar o script
// Se não estiver na página de login, verifica o acesso
if (!window.location.pathname.includes('login.html')) {
    Auth.protect();
}
