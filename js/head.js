//VARIAIS GLOBAIS

const token = 'I7onBMropnRpWKiJr4j1zADqVLxlIl5d';

const id_conteudo = '959';

const id_episodio = '958';


//COLOQUE O ID DA COLUNA NOME DA TABELA CONTEUDO 
const coluna_Nome_Conteudo = '9003';

//DEIXE 1 SE FOR USAR VPS
//SE NÃO FOR USAR VPS MDE PARA 0
const user_vps = 1;

let url_base = 'http://31.220.72.235:8080'; //URL DA SUA VPS

let init = 0;

let statusItens = {
    sucesso: [],
    palyerErro: [],
    notFound: []

}

let tipo = null;

let tipoSecundario = null;

let lista = null;

let tamanhoDaLista = null;

let tamanho = null;

let lista_eps = [];

let dataItems = {
    data: {
        items: []
    }
}
let dataItemsEps = {
    data: {
        items: null
    }
}

//LINK BASE DE FILMES PARA VERIOFICAÇÃO
let linkBaseFilmes = [
    'http://fhd1.oneplayer.site/toktergfer32tgdsvsdven/FHD1/',
    'http://fhd1.oneplayer.site/ertg43r5g34ty34yt543t43wer234t34t345/FHD10/',
    'http://fhd2.oneplayer.site/toktergfer32tgdsvsdven/FHD2/',
    'http://fhd3.oneplayer.site/toktergfer32tgdsvsdven/FHD3/',
    'http://fhd4.oneplayer.site/343rt342wtg34wetg34retg4rghy5rh/FHD4/',
    'http://fhd5.oneplayer.site/45y5ty5rtg345ert45r3t345ty345/FHD5/',
    'http://fhd6.oneplayer.site/toktergfer32tgdsvsdven/FHD6/',
    'http://fhd7.oneplayer.site/toktergfer32tgdsvsdven/FHD7/',
    'http://fhd8.oneplayer.site/toktergfer32tgdsvsdven/FHD8/',
    'http://fhd9.oneplayer.site/toktergfer32tgdsvsdven/FHD9/',
    'http://fhd4.oneplayer.site/toktergfer32tgdsvsdven/FHD4/',
    'http://fhd10.oneplayer.site/343rt342wtg34wetg34retg4rghy5rh/FHD10/',
    'http://fhd11.oneplayer.site/343rt342wtg34wetg34retg4rghy5rh/FHD11/',
    'http://fhd12.oneplayer.site/343rt342wtg34wetg34retg4rghy5rh/FHD12/',
    'http://fhd5.oneplayer.site/tokIadasfIIlIlenIlIlIsf/FHD5/',
    'http://fhd1.oneplayer.site/ertg43r5g34ty34yt543t43wer234t34y3s7/FHD3/',
    'http://fhd1.oneplayer.site/ertg43r5g34ty34yt543t43wer234t34t345/FHD3/',
    'http://fhd4.oneplayer.site/343rt342wtg34wetg34retg4rgh5kh4/FHD4/',
    'http://fhd1.oneplayer.site/ertg43r5g34ty34yt543t43wer234t34y3s7/FHD10/',
    'http://hd5.oneplayer.site/343rt342wtg34wetg34retghksi68ssk/FHD5/',
    'http://hd5.oneplayer.site/FHD5/',
    'http://hd5.oneplayer.site/token/FHD5/',
    'http://fhd1.oneplayer.site/ertg43r5g34ty34yt543t43wer234t34t345/FHD3/',
    'http://fhd4.oneplayer.site/343rt342wtg34wetg34retg4rghy5rh/FHD4/'
]

//LINK BASE DE SÉRIES USADO COMO BASE
let linkBaseSeries = [
    'http://fhd1.oneplayer.site.xyz/ertg43r5g34ty34yt543t43wer234t34t345/SHD11/',
    'http://fhd5.oneplayer.site/45y5ty5rtg345ert45r3t345ty345/SHD12/',
    'http://shd0.oneplayer.site/rfg54ry435y45y45y45y45y45rt23w4r324wt34tr34t3e4wtfg43/SHD0/',
    'http://shd2.oneplayer.site/5yu456y45tge4rtfg4w3ertf34t43retg54y65uj65uji/SHD2/',
    'http://shd1.oneplayer.site/y45y456y45y54eytg345t4rfwserdfwe4rtrf34t65435retyg/SHD1/',
    'http://shd1.oneplayer.site/sfgerg54yrt/SHD1/',
    'http://shd0.oneplayer.site/rfg54ry435y45y45y45y45y45rt23w4r324wt34tr34t3e4wtf582/SHD0/',
    'http://shd8.oneplayer.site/rgdfgret43tfawd32fvdsf/SHD8/',
    'http://shd0.oneplayer.site/rfg54ry435y45y45y45y45y45rt23w4r324wt34tr34t3e4wtf582/SHD0/',
    'http://shd8.oneplayer.site/67i567uyh56r4tgyh54rteh45yhg465uhy456ju56l2q/SHD8/',
    'http://shd1.oneplayer.site/y45y456y45y54eytg345t4rfwserdfwe4rtrf34t65435redso/SHD1/',
    'http://shd7.oneplayer.site/u657uy56y5r4tfg4r3eftg345tgy45hj456th45tjh456uj56ujhryz3/SHD7/',
    'http://shd2.oneplayer.site/5yu456y45tge4rtfg4w3ertf34t43retg54y65uj65npw/SHD2/',
    'http://shd9.oneplayer.site/y456y654uj54tyg34gfwer45r3hj465yh354rtgfwe4rfgtwku51/SHD9/',
    'http://shd13.oneplayer.site/SHD13/',
    'http://shd13.oneplayer.site/SHD13/',
    'http://shd13.oneplayer.site/SHD13/',
    'http://shd12.oneplayer.site/token/SHD13/',
    'http://shd2.oneplayer.site/token/SHD2/',
    'http://shd3.oneplayer.site/token/SHD3/',
    'http://shd4.oneplayer.site/token/SHD4/',
    'http://shd5.oneplayer.site/token/SHD5/',
    'http://shd6.oneplayer.site/token/SHD6/',
    'http://shd7.oneplayer.site/u657uy56y5r4tfg4r3eftg345tgy45hj456th45tjh456uj56ujhryt5/SHD7/',
    'http://shd8.oneplayer.site/rgdfgret43tfawd32fvdsf/SHD8/',
    'http://shd9.oneplayer.site/y456y654uj54tyg34gfwer45r3hj465yh354rtgfwe4rfgtw34er/SHD9/',
    'http://shd10.oneplayer.site/token/SHD10/',
    'http://shd11.oneplayer.site/token/SHD11/',
    'http://shd12.oneplayer.site/token/SHD12/',
    'http://shd12.oneplayer.site/token/SHD12/',
    'http://shd2.oneplayer.site/sfgfe34ew32r/SHD2/',
    'http://shd7.oneplayer.site/bweregffderfggfdf/SHD7/'
]

//VERIFICANDOVPS
if (user_vps === 0) {

    url_base = 'https://api.baserow.io';

}

async function verificarVideo(url) {
    let targetUrl = url;

    // Se estiver no Vercel, passa pelo proxy para evitar Mixed Content (HTTP em HTTPS)
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.hostname.startsWith('192.168.')) {
        targetUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    }

    try {
        const response = await fetch(targetUrl, { method: 'HEAD' });
        // Se o status for entre 200 e 299, o arquivo existe
        return response.ok;
    } catch (error) {
        console.error("Erro ao verificar vídeo via proxy/fetch:", error);
        return false;
    }
}

//ESSA FUNLÇÃO INICIA O PROCESSO SALVANDO OS DADOS PRINCIPAIS DENTRO DAS VARIAVEIS GLOBAIS
document.getElementById('init').addEventListener('click', function initProcesso() {

    lista = document.querySelector('#lista').value.trim().split(','); //LISTA QUE SERA PERCORRIDA

    tipo = document.querySelector('#tipo-conteudo').value.trim(); //TIPO GERAL DA PEQUISA
    tipoSecundario = document.querySelector('#tipo-conteudo-prinicipal').value.trim(); //TIPO GERAL DA PEQUISA

    tamanhoDaLista = lista.length - 1; //DEFINI TAMANHO TOTAL DA LISTA

    console.log(lista, tipo);

    //REMOVER A TELA 1 
    document.getElementById('tela-1').remove();

    iniciarBusca();
});

async function itemselecionado(id) {
    document.querySelector("#name").textContent = "";
    try {

        //CABEÇALHO DA REQUIÇÃO
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjAxZGY4NWE5ODg2OTRjMGU5ZDE3YzM3ZmMwYmJmZSIsIm5iZiI6MTcyNjUyNjk4OC43NDk1NDQsInN1YiI6IjY1ZmY2MDNlMzc4MDYyMDE3YzM5ZjQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YOjsoQ-yyANqpVA0dq99GwNYdUCZ3H9LITQNAyZegxI'
            }
        };

        let url = `https://api.themoviedb.org/3/${tipo}/${id}?language=pt-BR`;

        //FAZENDO A REQUISIÇÃO
        let request = await fetch(url, options);

        //VERIFICA SE REQUISIÇÃO FOI FEITA COM SUCESSO
        if (request.ok) {
            let response = await request.json();

            if (response) {
                // OBJETO COM AS INFORMAÇÕES NECESSÁRIAS
                let tv = {
                    Nome: null,
                    Capa: null,
                    Categoria: null,
                    Sinopse: null,
                    Link: null,
                    Tipo: null,
                    Idioma: null,
                    Views: 0,
                    Temporadas: 0,
                    // Campos novos que você adicionou (TMDB e formatação)
                    Imdb: null,
                    CapaFundo: null,
                    "Data de lançamento": null,
                    "Duração": null
                };

                let contentTela2 = document.getElementById('tela-2');
                contentTela2.innerHTML = '';

                // DADOS DA BUSCA POR ID
                let dados = response;

                // INFORMAÇÕES DE CATEGORIAS
                let lista_temporadas = [];

                if (tipo === 'tv') {
                    // Filtra temporadas, exclui "Especiais" e mapeia para o número de episódios, ignorando temporadas sem episode_count
                    lista_temporadas = dados.seasons.filter(function (season) {
                        return season.name !== 'Especiais' && season.episode_count > 0;
                    }).map(function (season) {
                        return season.episode_count;
                    });
                }

                let total_temporadas = lista_temporadas.length; //GUARDA O TAMANHO DA LISTA DE TEMPÓRADAS

                let controladoraFilmes = true; //CONTROLA O SE O LINK FOI VALIDO OU NÃO


                let categoria = dados.genres.filter(item => item.name).map(item => item.name);

                //EXECULTA ESSE TRECHO SE FOR PARA UM FILEM
                if (tipo === 'movie') {
                    //VERIFICANDO SE LINK DO FILME ESTA ONLINE
                    document.getElementById('status').innerHTML = 'VALIDANDO LINK AGUARDE...';
                    for (const element of linkBaseFilmes) {

                        //VARIAVEIS QUE IRÃO GUARDA AS VARIANTES DA URL ENTRE DUBLADO E LEGENDADO
                        let url = `${element}${dados.imdb_id}.mp4`;
                        console.log(url);

                        let urlLegendada = `${element}${dados.imdb_id}LEG.mp4`;


                        //VARIAVEIS QUE IRÃO GUARDA OS RESULTADOS DE CADA VERIFICAÇÃO 
                        let resultDubaldo = await verificarVideo(url);
                        let resultLegendado = await verificarVideo(urlLegendada);

                        if (resultDubaldo) {

                            tv.Link = url;
                            tv.Idioma = 'DUB';

                            controladoraFilmes = false; //MUDA CONTROLADORA PARA EVITAR O REINICIO DO PROCESSO 

                            console.log(url);
                            break;
                        } else if (resultLegendado) {

                            tv.Link = urlLegendada;
                            tv.Idioma = 'LEG';

                            controladoraFilmes = false; //MUDA CONTROLADORA PARA EVITAR O REINICIO DO PROCESSO 
                            break;
                        }
                    }

                    document.getElementById('status').innerHTML = '';

                }//FIM DO IF QUE VERIFICA SE É UM FILME

                //VALIDANDO LINK DAS SÉRIES

                //VERIFICA SE O TIPO É UMA SÉRIE PARA VALIDAR O LINK E GERAR LISTA DE ÉPISODIOS 
                if (tipo === 'tv') {

                    document.getElementById('status').innerHTML = 'VALIDANDO LINK AGUARDE...';

                    //VERIFICANDO SE LINK DO SÉRIE ESTA ONLINE
                    for (const element of linkBaseSeries) {

                        //VARIAVEIS QUE IRÃO GUARDA AS VARIANTES DA URL ENTRE DUBLADO E LEGENDADO
                        let url = `${element}${dados.id}/1x1.mp4`;

                        let urlLegendada = `${element}${dados.id}/1x1LEG.mp4`;
                        //VARIAVEIS QUE IRÃO GUARDA OS RESULTADOS DE CADA VERIFICAÇÃO 
                        let resultDubaldo = await verificarVideo(url);
                        let resultLegendado = await verificarVideo(urlLegendada);

                        if (resultDubaldo) {
                            tv.Link = element; // Armazena a BASE do link para ser usada na geração dos episódios
                            tv.Idioma = 'DUB';
                            controladoraFilmes = false;
                            break;
                        } else if (resultLegendado) {
                            tv.Link = element; // Armazena a BASE do link para ser usada na geração dos episódios
                            tv.Idioma = 'LEG';
                            controladoraFilmes = false;
                            break;
                        }
                    }

                    document.getElementById('status').innerHTML = '';

                }

                //VERIFICA SE ALGUM LINK FOI VALIDO CASO NÃO SEJA REINICIA TODO PROCESSSO
                if (controladoraFilmes) {

                    // Se for série, e não encontrou link base, adiciona um erro de player e reinicia.
                    if (tipo === 'tv') {
                        statusItens.palyerErro.push(lista[init]);
                    }

                    reinciarProcesso();
                    return true;
                }


                // PREENCHENDO OS DADOS NO OBJETO TV
                tv.Nome = tipo === 'movie' ? dados.title : dados.name;
                tv.Capa = `https://image.tmdb.org/t/p/w780${dados.poster_path}`;
                tv.Categoria = `${categoria.join(', ')}, ${tipoSecundario}`;  // Transformando o array em uma string separada por vírgulas
                tv.Sinopse = dados.overview ? dados.overview : 'Sem descrição para esse conteúdo';
                tv.Tipo = tipo === 'movie' ? 'Filme' : 'Serie';
                tv.Temporadas = lista_temporadas.length; // Garante o número correto de temporadas validadas
                tv.Link = tipo === 'tv' ? tv.Link : tv.Link; // Para série, mantém a URL BASE. Para filme, mantém o link completo.


                // --- CAMPOS NOVOS PARA O BASEROW ---

                // IMDB
                tv["Imdb"] = dados.vote_average ? dados.vote_average.toFixed(1) : "0.0";

                // CAPA DE FUNDO
                tv["Capa de fundo"] = dados.backdrop_path ? `https://image.tmdb.org/t/p/original${dados.backdrop_path}` : '';

                // DATA DE LANÇAMENTO (FORMATADA)
                function formatarDataBR(data) {
                    if (!data) return "Sem data";
                    const d = new Date(data);
                    return d.toLocaleDateString("pt-BR");
                }
                let dataOriginal = tipo === 'movie' ? dados.release_date : dados.first_air_date;
                tv["Data de Lançamento"] = formatarDataBR(dataOriginal);

                // DURAÇÃO
                function formatarDuracao(min) {
                    if (!min) return "Sem duração";
                    return `${min} min`;
                }
                if (tipo === "movie") {
                    tv["Duração"] = formatarDuracao(dados.runtime);
                } else {
                    tv["Duração"] = dados.episode_run_time?.[0] ? formatarDuracao(dados.episode_run_time[0]) : "Sem duração";
                }

                // --- FIM DOS CAMPOS NOVOS ---


                // PREENCHENDO FORMULÁRIO COM AS INFORMAÇÕES ENCONTRADAS
                let contentForm = document.querySelector('#tela-3');
                let nome = document.querySelector('#nome');
                let capa = document.querySelector('#capa');
                let categorias = document.querySelector('#categoria');
                let sinopse = document.querySelector('#sinopse');
                let link = document.querySelector('#link');
                let tipoInput = document.querySelector('#tipo');
                let idioma = document.querySelector('#idioma');
                let tempoTotal = document.querySelector('#temporadaTotal');
                let listaEps = document.querySelector('#listaEps');
                let btn = document.querySelector('#btn-baserow');

                // PREENCHENDO OS CAMPOS DO FORMULÁRIO
                nome.value = tv.Nome;
                capa.value = tv.Capa;
                if (tipo === 'tv') {
                    // Tenta adicionar a network se existir
                    let networkName = dados.networks && dados.networks[0] ? dados.networks[0].name : '';
                    categorias.value = `${tipoSecundario}, ${tv.Categoria}` + (networkName ? `, ${networkName}` : '');
                } else {
                    categorias.value = `${tv.Categoria}`;
                }

                sinopse.value = tv.Sinopse;
                link.value = tv.Link;
                tipoInput.value = tv.Tipo;
                idioma.value = tv.Idioma;
                tempoTotal.value = tv.Temporadas;
                listaEps.value = lista_temporadas.join(', ');

                // Removendo listeners de input anteriores para evitar acúmulo (Opcional)
                // nome.removeEventListener('input', ...);
                // categorias.removeEventListener('input', ...);
                // sinopse.removeEventListener('input', ...);
                // tempoTotal.removeEventListener('input', ...);
                // listaEps.removeEventListener('input', ...);

                // Adicionando listener estático para o botão de cadastro, passando o objeto tv
                // Remove o listener anterior para evitar múltiplas chamadas
                btn.removeEventListener('click', btnClickHandler);
                btn.addEventListener('click', btnClickHandler);

                // Função de click do botão para encapsular a lógica de cadastro/geração
                async function btnClickHandler() {

                    // Atualiza o objeto TV com os valores atuais do formulário antes de processar
                    tv.Nome = nome.value;
                    tv.Capa = capa.value;
                    tv.Categoria = categorias.value;
                    tv.Sinopse = sinopse.value;
                    tv.Link = link.value; // Mantém a base do link da série ou o link completo do filme
                    tv.Tipo = tipoInput.value;
                    tv.Idioma = idioma.value;
                    tv.Temporadas = tempoTotal.value;

                    // Adicionando novamente os campos TMDB atualizados
                    tv["Imdb"] = dados.vote_average ? dados.vote_average.toFixed(1) : "0.0";
                    tv["Capa de fundo"] = dados.backdrop_path ? `https://image.tmdb.org/t/p/original${dados.backdrop_path}` : '';
                    tv["Data de Lançamento"] = formatarDataBR(dataOriginal);
                    if (tipo === "movie") {
                        tv["Duração"] = formatarDuracao(dados.runtime);
                    } else {
                        tv["Duração"] = dados.episode_run_time?.[0] ? formatarDuracao(dados.episode_run_time[0]) : "Sem duração";
                    }

                    // Captura a lista de episódios atualizada manualmente
                    let lista_temporadas_manuais = listaEps.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);


                    //REMOVENDO FORMULARIO DA TELA
                    contentForm.style.display = 'none';

                    //ADICIONANDO STATUS DE GERAÇÃO DE EPS
                    document.getElementById('status').innerHTML = `Gereando lista de episodio de ${lista[init]}`;

                    // Limpa lista de episódios global antes de gerar os novos
                    lista_eps = [];

                    //VERIFICA SE O TIPO É UMA SÉRIE PARA VALIDAR O LINK E GERAR LISTA DE ÉPISODIOS 
                    if (tipo === 'tv') {

                        // A base do link já foi validada e está em tv.Link
                        let element = tv.Link;
                        let idioma_tipo = tv.Idioma === 'LEG' ? 'LEG' : '';

                        //FAZER UM LOOP PERCORRER CADA ITEM CONTENDO OS EPISODIOS E FAZER UM ITEM PARA CADA EP E USAR CHAVE COMO TEMPORADA
                        for (let index = 0; index < lista_temporadas_manuais.length; index++) {

                            let tempo = index + 1; // Temporada (1-based)
                            let total_eps_na_temporada = lista_temporadas_manuais[index];

                            for (let ep = 0; ep < total_eps_na_temporada; ep++) {

                                lista_eps.push({
                                    Nome: tipo === 'movie' ? dados.title : dados.name,
                                    Link: `${element}${dados.id}/${tempo}x${ep + 1}${idioma_tipo}.mp4`,
                                    Temporada: tempo,
                                    Episódio: ep + 1

                                });
                            }

                        }

                        //REMOVENDO DA TELA STATUS
                        document.getElementById('status').innerHTML = "";
                    }

                    //ADICIONA O ITEM SELECIONADO AO OBJETO DATA

                    //VERIFICA SE VALOR NÃO É NULL PARA ADICIONAR O NOVO ITEM A LISTA 
                    if (tv) {

                        // Remove o link base para que o BaseRow não use o link que não é o link do vídeo (apenas para série)
                        if (tipo === 'tv') {
                            tv.Link = 'vazio';
                        }

                        dataItems.data.items.push(tv) //SE EXISTIR ADICIONA OS DADOS ENCONTRADO A LISTA
                        //REMOVE O FORMULARIOA DA TELA
                        document.getElementById('tela-3').style.display = 'none';
                        reinciarProcesso(); //REINICIA O PROCESSO PARA LER NOVO ITEM

                    }

                    // Reinicia tv
                    tv = null;

                }


                // EXIBINDO A TERCEIRA TELA COM FORMULÁRIO PREENCHIDO
                contentForm.style.display = 'flex';
            }




        }

    } catch (error) {
        console.error("Erro em itemselecionado:", error);
        reinciarProcesso();
    }
}

//INICIA A BUSCA 
async function iniciarBusca() {
    //Se a lista estiver vazia ou o item atual for undefined, reinicia o processo (finaliza a busca)
    if (!lista || init > tamanhoDaLista) {
        reinciarProcesso();
        return;
    }

    //ANTES DE INICIAR A BUSCA VERIRIFICA SE NOME EXISTE NO BANCO
    let busca = await buscaNameBaseRow(lista[init].trim()); // TRIM para remover espaços

    if (busca) {

        reinciarProcesso();
        return true;
    }
    document.querySelector("#name").textContent = lista[init];
    document.querySelector("#tela-2").innerHTML = ''; // Limpa resultados anteriores
    document.querySelector("#tela-5").style.display = 'none'; // Esconde botão de pular

    try {

        //CABEÇALHO DA REQUIÇÃO
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjAxZGY4NWE5ODg2OTRjMGU5ZDE3YzM3ZmMwYmJmZSIsIm5iZiI6MTcyNjUyNjk4OC43NDk1NDQsInN1YiI6IjY1ZmY2MDNlMzc4MDYyMDE3YzM5ZjQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YOjsoQ-yyANqpVA0dq99GwNYdUCZ3H9LITQNAyZegxI'
            }
        };

        let url = `https://api.themoviedb.org/3/search/${tipo}?query=${encodeURIComponent(lista[init].trim())}&include_adult=false&language=pt-BR&page=1`; // Codifica a query

        //EXECULTANDO BUSCA DOS ELEMENTO NA API
        let request = await fetch(url, options);

        //VERIFICANDO SE REQUISIÇÃO FOI BEM SUCEDIDA
        if (request.ok) {
            //PEGANDO O RESULTADO DA REQUISIÇÃO
            let response = await request.json();

            //PEGA A SEGUNDA TELA QUE VAI SER PREENCHIDA COM OS RESULTADOS DA BUSCA
            let tela2 = document.querySelector('#tela-2');

            //VERIFICA SE O ITEM RETORNADO NÃO É VAZIO 
            if (response.results.length > 0) {
                for (let item of response.results) {
                    // Se não tiver poster, pula o item (melhoria)
                    if (!item.poster_path) continue;

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
                    button.addEventListener('click', async function () {

                        document.querySelector('#tela-5').style.display = 'none';
                        console.log(item.id)
                        itemselecionado(item.id)
                    });
                    button.textContent = 'Selecionar';

                    // ADICIONANDO O ELEMENTO AO CONTAINER PRINCIPAL
                    divContainer.appendChild(img);
                    divContainer.appendChild(h3);
                    divContainer.appendChild(button);

                    // ADICIONA OS ELEMENTO A TELA 2
                    tela2.appendChild(divContainer);
                }

                document.querySelector('#tela-5').style.display = 'flex';

            } else { //SE FOR VAZIO RETORNO REINICA A BUSCA

                statusItens.notFound.push(lista[init]); //ADICIONA O ELEMENTO NÃO ENCONTRADO AO ARRAY DE STATUS FINAL
                reinciarProcesso();//REINCIA A BUSCA
            }

        }

    } catch (error) {
        console.error("Erro em iniciarBusca:", error);
        statusItens.notFound.push(lista[init]);
        reinciarProcesso();
    }
}

function reinciarProcesso() {

    init = init + 1;

    if (init <= tamanhoDaLista) {

        iniciarBusca();

    } else {

        alert('Toda Lista Foi Lida. Pronto para Cadastrar!');

        let tela4 = document.querySelector('#tela-4');
        tela4.style.display = 'flex';

    }


}

//ESSA FUNÇÃO FOI FEITA PARA PULAR O ELEMETO REPETIDO
function pular() {

    //APAGA O BOTÃO DE PULAR
    document.querySelector('#tela-5').style.display = 'none';
    //APAGA OS ITEM REPETIDOS DA TELA
    document.querySelector('#tela-2').textContent = '';

    reinciarProcesso();

}

//FAZ O ENVIO DA LISTA DE EPIÓDIOS
async function envio(index, lista_eps_quebrada) {

    //DEFININDO CABEÇALHO DE ENVIO PARA CADA ELEMENTO
    dataItemsEps.data.items = lista_eps_quebrada[index];

    let corpo = JSON.stringify(dataItemsEps.data);

    const options = {

        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
        },

        body: corpo

    }

    let urlDeEpisodios = `${url_base}/api/database/rows/table/${id_episodio}/batch/?user_field_names=true`;

    // Se estiver rodando no Vercel, usa o proxy
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.hostname.startsWith('192.168.')) {
        urlDeEpisodios = `/api/proxy?url=${encodeURIComponent(urlDeEpisodios)}`;
    }

    let request = await fetch(urlDeEpisodios, options);

    if (request.ok) {

        return true;
    } else {
        console.error("Erro ao enviar batch de episódios:", await request.text());
        return false;
    }
}


//FUNÇÃO QUE CADASTRAR TODOS OS FILME SELECIONADOS
async function cadastrarBaseRow() {

    document.getElementById('tela-4').style.display = 'none';
    document.getElementById('status').innerHTML = 'CADASTRRANDO NO BANCO DE DADOS...';

    let corpo = JSON.stringify(dataItems.data);

    const options = {

        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
        },

        body: corpo

    }

    let urlRequest = `${url_base}/api/database/rows/table/${id_conteudo}/batch/?user_field_names=true`;

    // Se estiver rodando no Vercel, usa o proxy
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.hostname.startsWith('192.168.')) {
        urlRequest = `/api/proxy?url=${encodeURIComponent(urlRequest)}`;
    }

    const request = await fetch(urlRequest, options);

    if (request.ok) {
        const response = await request.json()

        //VERFICA SE UMA SÉRIE PARA CADSATRAR OS EPISODIOS
        if (tipo === 'tv' && lista_eps.length > 0) {

            document.getElementById('status').innerHTML = 'CADASTRANDO EPISÓDIOS...';
            let lista_eps_quebrada = chunkArray(lista_eps, 99); // Limite de 100 itens por batch, usamos 99 por segurança

            for (let index = 0; index < lista_eps_quebrada.length; index++) {

                document.getElementById('status').innerHTML = `CADASTRANDO EPISÓDIOS: Lote ${index + 1} de ${lista_eps_quebrada.length}`;

                let controladora = await envio(index, lista_eps_quebrada);

                if (controladora) {
                    console.log(`Lote ${index + 1} enviado com sucesso`);
                } else {
                    console.error(`Falha ao enviar o lote ${index + 1}`);
                }

            };

            alert('CONTEUDO E EPISÓDIOS CADASTRADOS! VERIFIQUE SEU APP');
            location.reload();

        } else {

            alert('CONTEUDO CADASTRADO! VERIFIQUE SEU APP');
            location.reload();
        }


    } else {
        console.error("Erro ao cadastrar conteúdo principal:", await request.text());
        document.getElementById('status').innerHTML = 'ERRO NO CADASTRO! Verifique o console.';
        alert('ERRO NO CADASTRO DO CONTEÚDO PRINCIPAL!');
    }
}



//ESSA FUNMÇÃO QUEBRA UM ARRAU EM PEDAÇOS MENORES
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

//ESSA FUNÇÃO VERIFICA SE CONTEUDO EXISTE NO BASEROW
async function buscaNameBaseRow(value) {

    // Se o valor estiver vazio, retorna false para não travar o processo
    if (!value) return false;

    option = {
        method: 'GET',
        headers: {

            Authorization: `Token ${token}`
        }
    }

    // A URL deve ser codificada para funcionar corretamente, especialmente com espaços no nome
    let urlBaseForRequest = url_base;
    let targetUrl = `${url_base}/api/database/rows/table/${id_conteudo}/?user_field_names=true&filter__field_${coluna_Nome_Conteudo}__equal=${encodeURIComponent(value)}`;

    // Se estiver rodando no Vercel (hostname não local), usa o proxy
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.hostname.startsWith('192.168.')) {
        targetUrl = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
    }

    const request = await fetch(targetUrl, option); // REALIZA A REQUISIÇÃO

    if (request.ok) { //VERIFICA SE FOI FEITA COM SUCESSO

        let response = await request.json();

        if (response.count === 0) //VERIFICA SE FOI ENCONTRADO ALGO
        {

            console.log(`Conteúdo "${value}" não encontrado (OK para prosseguir)`);
            return false;
        } else { //FALSE SE ALGO FOR ENCONTRADO

            console.log(`Conteúdo "${value}" já encontrado, pulando...`);
            return true;
        }

    } else {

        console.error("Erro na busca do BaseRow:", await request.text());
        return false; //RETORNA FALSE SE DER FALHA (Permite que o processo tente cadastrar)
    }


}