class mountDataBase {

    constructor(linkFilmes, linkSeries) {
        this.linkFilmes = linkFilmes;
        this.linkSeries = linkSeries;
    }
    
    // Faz uma busca por um filme ou série dependendo do tipo passado
    async tmdbSearch(tipo, title) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTliMDIwNDU4NThjZTk0NmY2ZmE1OGNhY2FlZjA4MCIsInN1YiI6IjY1ZmY2MDNlMzc4MDYyMDE3YzM5ZjQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.stKRU8uvlBRg2eNzWeIz31t_cZBBp4mPXWzamv-Pblc'
            }
        };
            
        let url = `https://api.themoviedb.org/3/search/${tipo}?query=${title}&include_adult=false&language=pt-BR&page=1`;
        const request = await fetch(url, options);

        if (request.ok) {
            const dados = await request.json();
            return dados.results;
        } else {
            return false;
        }
    }

    // Faz uma requisição para o ID do elemento selecionado
    async tmdbSearchId(tipo, id, obj) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTliMDIwNDU4NThjZTk0NmY2ZmE1OGNhY2FlZjA4MCIsInN1YiI6IjY1ZmY2MDNlMzc4MDYyMDE3YzM5ZjQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.stKRU8uvlBRg2eNzWeIz31t_cZBBp4mPXWzamv-Pblc'
            }
        };

        const url = `https://api.themoviedb.org/3/${tipo}/${id}?language=pt-BR`;
        const request = await fetch(url, options);

        if (request.ok) {
            const dados = await request.json();

            let categoria = dados.genres.filter(item => item.name).map(item => item.name);

            //ESSE SWITCH FILTRA O TIPO PARA ADICIONAR CADA INFORMAÇÃO A SUA POSIÇÃO NO OBJETO
            switch (tipo) {
                case 'tv':
                    obj.nome = dados.name;
                    obj.capa = `https://image.tmdb.org/t/p/w780/${dados.poster_path}`;
                    obj.categoria = categoria.join(', ');
                    obj.sinopse = dados.overview ? dados.overview : 'Sem descrição para esse conteúdo';
                    obj.link = '';
                    obj.tipo = 'Serie';
                    obj.idioma = 'DUB';
                    break;

                case 'movie':
                    obj.nome = dados.title;
                    obj.capa = `https://image.tmdb.org/t/p/w780/${dados.poster_path}`;
                    obj.categoria = categoria.join(', ');
                    obj.sinopse = dados.overview ? dados.overview : 'Sem descrição para esse conteúdo';
                    obj.link = '';
                    obj.tipo = 'Filme';
                    obj.idioma = 'DUB';
                    break;
            }

            switch(tipo) 
            {
                //ESSE CASE VERIFICA SE O QUE ESTA SENDO PASSADO É UM FILME
                //SE FOR UM FILME VERIFICA A URL DA PLAYER ESTA VALIDA
                case 'movie':

                break;
            }

            for (let element of this.linkFilmes) {
                const urlDub = `${element}${dados.imdb_id}.mp4`;
                const isOnline = await this.verificarVideo(urlDub);
                if (isOnline) {
                    obj.link = urlDub; // Salva o link no objeto
                    console.log(`${urlDub} está online`);
                    return urlDub;
                }
            }

            console.log('Nenhum link está acessível');
            return false;

        } else {
            return false;
        }
    }

    // Essa função irá validar os links se estão ativos
    async verificarVideo(url) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.src = url;
            video.onloadeddata = () => resolve(true);
            video.onerror = () => resolve(false);
            video.load();
        });
    }
}
