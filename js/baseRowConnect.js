class baseRow {

    token = 'yKeRmUX2p5NSweOl9TAguRF5djJLPKbJ';

    constructor() {

    }

    //FAZ UMA BUSCA POR ELEMENTOS NA TABELE CONTEUDO
    //FILTRA POR NOME NA COLUNA NOME
    async buscaElemento(nome) {

        const options = {

            method : 'GET',
            headers : {
                Authorization : `Token ${this.token}`
            }
        }

        const urlRequest = `https://api.baserow.io/api/database/rows/table/231423/?user_field_names=true&filters={"filter_type":"AND","filters":[{"type":"equal","field":"Nome","value":"${nome}"}],"groups":[]}`;

        const request = await fetch(urlRequest, options);


        if(request.ok) 
            {
                const dados = await request.json();

                console.log(dados);

                if(dados.count ==  0 ) 
                    {
                        return true;
                    } else 
                    {
                        return false;
                    }

            } else {
                
                return 'error';
            }
    }

    //ESSA FUNÇÃO VAI FAZER CADASTRO DA SÉRIE OU DO FILME NA TABELA CONTEUDO
    async createdConteudo(dados) 
    {
        let corpo = JSON.stringify(dados);
        const options = {

            method : 'POST',
            headers : {
                Authorization : `Token ${this.token}`,
                'Content-Type' : 'application/json'
            },

            body : corpo

        }

        const urlRequest = 'https://api.baserow.io/api/database/rows/table/231423/?user_field_names=true';

        const request = await fetch(urlRequest ,options);

        if(request.ok) 
            {
                const response = await request.json()

                return response;
            }
    }
}