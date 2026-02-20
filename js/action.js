//INSTÂNCIA DAS SISTEMA DE BUSCA
let baseRowData = new baseRow();
let dataBase = new mountDataBase(linkBaseFilmes, linkBaseSeries);

// ESSA FUNÇÃO FAZ BUSCA POR ID
async function buscarId(id) {
    try {
        // LIMPANDO A SEGUNDA TELA
        let contentBusca = document.querySelector('#tela-2');
        contentBusca.innerHTML = '';

        let dados = await dataBase.tmdbSearchId(tipo, id, serieConteudo);

        if (dados) {
            if (serieConteudo.link) {
                preencherFormulario(serieConteudo);
            } else {
                console.log('link invalido');
            }
        }
    } catch (error) {
        console.error('Erro ao buscar ID:', error);
    }
}

// ESSA FUNÇÃO VAI PEGAR LISTA QUEBRA ELA EM UM ARRAY E SALVAR EM UMA VARIAVEL GLOBAL
document.querySelector('.btn-salvar').addEventListener('click', function() {
    let contentTela1 = document.querySelector('#tela-1'); // PEGA O CONTAINER PARA REMOVER APOST LISTA SER QUEBRADA EM UM ARRAY

    let listaPura = document.querySelector('#lista').value.trim(); // PEGA A STRING PASSA PELO TEXT AREA

    tipo = document.querySelector('#tipo-conteudo').value.trim(); // PEGA A STRING PASSA PELO TEXT AREA

    lista = listaPura.split(','); // USA O ',' PARA QUEBRA A LISTA EM ARRAY E SALVAR NA VARIAVEL GLOBAL

    // REMOVE PRIMEIRA TELA
    contentTela1.remove();

    total_elementos = lista.length;

    // APÓS SALVAR OS DADOS BASE INICIA A BUSCA PELO PRIMEIRO ELEMENTO
    inicializarBusca();
});

// PEGAR OS ELEMENTOS E CRIA OS RESULTADOS EM TELA
function createElmentBusca(dados) {
    let contentBusca = document.querySelector('#tela-2');
    contentBusca.innerHTML = '';

    for (let item of dados) {
        // DIV QUE IRA CONTE TODO AS INFORAMÇÕES DO FILME OU SÉRIE
        let divContainer = document.createElement('div');
        divContainer.classList.add('content');

        // CARREGA A IMAGEM DO FILME OU SÉRIE
        let img = document.createElement('img');
        img.width = '200';
        img.height = '200';
        img.src = `https://image.tmdb.org/t/p/w780/${item.poster_path}`;

        // CARREGA O TITULO DO FILME OU SÉRIE
        let h3 = document.createElement('h3');
        h3.textContent = tipo === 'tv' ? item.name : item.title;

        // CARREGA A FUNÇÃO DE BUSCA POR ID
        let button = document.createElement('button');
        button.addEventListener('click', async function() {
            buscarId(item.id);
        });
        button.textContent = 'Selecionar';

        // ADICIONANDO O ELEMENTO AO CONTAINER PRINCIPAL
        divContainer.appendChild(img);
        divContainer.appendChild(h3);
        divContainer.appendChild(button);

        // ADICIONA OS ELEMENTO A TELA 2
        contentBusca.appendChild(divContainer);
    }
}

async function preencherFormulario(serieConteudo) {
    // PEGANDO CADA INPUT DO FORMULARIO
    let contentForm = document.querySelector('#tela-3');
    let nome = document.querySelector('#nome');
    let capa = document.querySelector('#capa');
    let categoria = document.querySelector('#categoria');
    let sinopse = document.querySelector('#sinopse');
    let link = document.querySelector('#link');
    let tipo = document.querySelector('#tipo');
    let idioma = document.querySelector('#idioma');

    // PREENCHENDO OS CAMPOS DO FORMULARIO
    nome.value = serieConteudo.nome;
    capa.value = serieConteudo.capa;
    categoria.value = serieConteudo.categoria;
    sinopse.value = serieConteudo.sinopse;
    link.value = serieConteudo.link;
    tipo.value = serieConteudo.tipo;
    idioma.value = serieConteudo.idioma;

    contentForm.style.display = 'flex';

    // Remova listeners anteriores para evitar duplicações
    document.querySelector('#btn-baserow').removeEventListener('click', handleClick);

    // Adiciona o novo listener
    document.querySelector('#btn-baserow').addEventListener('click', handleClick);

    async function handleClick() {
        // ESCONDENDO FORMULARIO
        contentForm.style.display = 'none';

        // PREENCHENDO O OBJETO QUE VAI SER ENVIADO PARA BANCO DE DADOS
        conteudo.Nome = serieConteudo.nome;
        conteudo.Capa = serieConteudo.capa;
        conteudo.Categoria = serieConteudo.categoria;
        conteudo.Sinopse = serieConteudo.sinopse;
        conteudo.Link = serieConteudo.link;
        conteudo.Tipo = serieConteudo.tipo;
        conteudo.Idioma = serieConteudo.idioma;

        // Adicionando uma cópia do objeto ao array para evitar duplicações
        data.items.push(conteudo);

        logs.sucesso.push(lista[init]);

        reiniciar();
    }
}

// ESSA FUNÇÃO INICIALIZA TODO PROCESSO
async function inicializarBusca() {
    if (tipo === 'tv' || tipo === 'movie') {
        let dadosBusca = await dataBase.tmdbSearch(tipo, lista[init]);

        if (dadosBusca) {
            createElmentBusca(dadosBusca);
        }
    }
}

// ESSA FUNÇÃO RESERTA E REINICIA TODO PROCESSO
function reiniciar() {
    // AUMENTANDO MAIS 1 NO VALOR DE INIT PARA PRÓXIMO ELEMENTO SER CONSULTADO
    init = init + 1;

    // Reinicializa os objetos com novos valores nulos
    serieConteudo = {
        nome: null,
        capa: null,
        categoria: null,
        sinopse: null,
        link: null,
        tipo: null,
        idioma: null,
        lista_temporadas: null,
        view: 0,
        listaEps: []
    };

    conteudo = {
        Nome: null,
        Capa: null,
        Categoria: null,
        Sinopse: null,
        Link: null,
        Tipo: null,
        Idioma: null,
        Views: 0
    };

    if (lista[init] !== undefined) {
        inicializarBusca();
    }
}