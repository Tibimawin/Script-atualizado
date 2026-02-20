class mountDataBase {
    constructor(linkFilmes, linkSeries) {
        this.linkFilmes = linkFilmes;
        this.linkSeries = linkSeries;
    }

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

            //ESSE ELEMENTOS SÃOSERÃO NECESSÁRIO QUANDO TIPO FOR UMA SÉRIE
            if (tipo === 'tv') {
                // Filtra temporadas, exclui "Especiais" e mapeia para o número de episódios, ignorando temporadas sem episode_count
                let lista_temporadas = dados.seasons.filter(function (season) {
                    return season.name !== 'Especiais' && season.episode_count > 0; // Filtra temporadas que não são "Especiais" e têm episode_count > 0
                }).map(function (season) {
                    return season.episode_count; // Mapeia para o número de episódios
                });

            }

            let categoria = dados.genres.filter(item => item.name).map(item => item.name);




            switch (tipo) {
                case 'tv':
                    obj.nome = dados.name;
                    obj.capa = `https://image.tmdb.org/t/p/w780/${dados.poster_path}`;
                    obj.categoria = categoria.join(', ');
                    obj.sinopse = dados.overview ? dados.overview : 'Sem descrição para esse conteúdo';
                    obj.link = '';
                    obj.tipo = 'Serie';
                    obj.idioma = 'DUB';
                    obj.lista_temporadas = lista_temporadas;

                    break;
                case 'movie':
                    obj.nome = dados.title;
                    obj.capa = `https://image.tmdb.org/t/p/w780/${dados.poster_path}`;
                    obj.categoria = categoria.join(', ');
                    obj.sinopse = dados.overview ? dados.overview : 'Sem descrição para esse conteúdo';
                    obj.link = '';
                    obj.tipo = 'Filme';
                    obj.idioma = 'DUB';
            }

            switch (tipo) {
                case 'movie':
                    for (const element of this.linkFilmes) {
                        const urlDub = `${element}${dados.imdb_id}.mp4`;
                        const urlLeg = `${element}${dados.imdb_id}LEG.mp4`;

                        const testeDub = await this.verificarVideo(urlDub);
                        if (testeDub) {
                            obj.link = urlDub;
                            obj.idioma = 'DUB';
                            break;
                        }

                        const testeLeg = await this.verificarVideo(urlLeg);
                        if (testeLeg) {
                            obj.link = urlLeg;
                            obj.idioma = 'LEG';
                            break;
                        }
                    }
                    break;
                case 'tv':

                    for (const element of this.linkSeries) {
                        const urlDub = `${element}${dados.id}/1x1.mp4`;
                        const urlLeg = `${element}${dados.id}/1x1LEG.mp4`;

                        const testeDub = await this.verificarVideo(urlDub);
                        if (testeDub) {
                            obj.link = `${element}${dados.id}`;
                            obj.idioma = 'DUB';
                            break;
                        } else {

                            const testeLeg = await this.verificarVideo(urlLeg);

                            if (testeLeg) {
                                obj.link = `${element}${dados.id}`;
                                obj.idioma = 'LEG';
                                break;
                            }
                        }
                    }
            }

            console.log("Dados preenchidos em serieConteudo:", obj);
            return true;
        } else {
            return false;
        }
    }

    async verificarVideo(url) {
        let targetUrl = url;

        // Se estiver no Vercel, passa pelo proxy para evitar Mixed Content (HTTP em HTTPS)
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.hostname.startsWith('192.168.')) {
            targetUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
        }

        try {
            const response = await fetch(targetUrl, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.error("Erro ao verificar vídeo via proxy/fetch:", error);
            return false;
        }
    }

    gerarListaDeEpisodios(listEps, linkBase, idioma, listaEps) {
        listEps.forEach(function (element, key) {
            for (let init = 0; init < element; init++) {
                if (idioma === 'DUB') {
                    listaEps.push(`${linkBase}/${key + 1}x${init + 1}.mp4`);
                }
            }
        })
    }
}
