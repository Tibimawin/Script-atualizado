//VALOR DE INICIALIZAÇÃO DA BUSCA 
let init = 0;

let total_elementos = null;
//LISTA DE CONTEUDO
let lista = null;

//TIPO GLOBAL
let tipoGlobal = 'tv';

//PREENCHER DADOS PARA BANCO
let data = {
    items : []
}

//VARIAIVEIS GLOBAIS
let serieConteudo = {
    nome : null,
    capa : null,
    categoria : null,
    sinopse : null,
    link : null,
    tipo : null,
    idioma : null,
    lista_temporadas : null,
    view : 0,
    listaEps : []
}

//VARIAVEIS GLOBAIS DE LINK PARA TESTE
let linkBaseFilmes = [
'http://fhd1.doramasapp.xyz/toktergfer32tgdsvsdven/FHD1/',
'http://fhd1.doramasapp.xyz/toktergfer32tgdsvsdven/FHD10/',
'http://fhd2.doramasapp.xyz/toktergfer32tgdsvsdven/FHD2/',
'http://fhd1.doramasapp.xyz/eretgfvccdsertgf4356tygfre435tygf/FHD3/',
'http://fhd3.doramasapp.xyz/toktergfer32tgdsvsdven/FHD3/',
'http://fhd5.doramasapp.xyz/tokIadasfIIlIlenIlIlIsf/FHD5/',
'http://fhd4.doramasapp.xyz/toktergfer32tgdsvsdven/FHD4/',
'http://fhd5.doramasapp.xyz/toktergfer32tgdsvsdven/FHD5/',
'http://fhd6.doramasapp.xyz/toktergfer32tgdsvsdven/FHD6/',
'http://fhd7.doramasapp.xyz/toktergfer32tgdsvsdven/FHD7/',
'http://fhd8.doramasapp.xyz/toktergfer32tgdsvsdven/FHD8/',
'http://fhd9.doramasapp.xyz/toktergfer32tgdsvsdven/FHD9/',
'http://fhd4.doramasapp.xyz/toktergfer32tgdsvsdven/FHD4/',
'http://fhd4.doramasapp.xyz/toktergfer32tgdsvsdven/FHD4/',
]

let linkBaseSeries = [
'http://fhd1.doramasapp.xyz/eretgfvccdsertgf4356tygfre435tygf/SHD11/',
'http://shd0.doramasapp.xyz/thefrdfbvdf/SHD0/',
'http://shd2.doramasapp.xyz/token3512353ewf32r52t/SHD2/',
'http://shd1.doramasapp.xyz/token/SHD1/',
'http://shd1.doramasapp.xyz/sfgerg54yrt/SHD1/',
'http://shd8.doramasapp.xyz/rgdfgret43tfawd32fvdsf/SHD8/',
'http://shd2.doramasapp.xyz/token/SHD2/',
'http://shd3.doramasapp.xyz/token/SHD3/',
'http://shd4.doramasapp.xyz/token/SHD4/',
'http://shd5.doramasapp.xyz/token/SHD5/',
'http://shd6.doramasapp.xyz/token/SHD6/',
'http://shd7.doramasapp.xyz/token/SHD7/',
'http://shd8.doramasapp.xyz/token/SHD8/',
'http://shd9.doramasapp.xyz/token/SHD9/',
'http://shd10.doramasapp.xyz/token/SHD10/',
'http://shd11.doramasapp.xyz/token/SHD11/',
'http://shd2.doramasapp.xyz/sfgfe34ew32r/SHD2/',
'http://shd7.doramasapp.xyz/bweregffderfggfdf/SHD7/'
]

let conteudo = { 
Nome: null,
Capa: null,
Categoria: null,
Sinopse: null,
Link: null,
Tipo: null,
Idioma: null,
Views: 0
};

//OBJETO DE LOGS DE STATUS

let logs = {
    sucesso : [],
    playerErro : [],
    existente : [],
    tipoDiferente : []

}