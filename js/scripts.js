


    let pokemonRepository = (function () {
        let pokemonList = [];

        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        function getAll() {
            return pokemonList; 
        }
        //Returns array of all pokemon

        function add(pokemon) {
            pokemonList.push(pokemon);
        }
        //Adds pokemon to array

        function showDetails(pokemon) {
            loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }
        //Logs details of pokemon to the JS console

        function addListener(button, pokemon) {
            button.addEventListener('click', function (event) {
                showDetails(pokemon);
            })
        }
        //Show details of pokemon in he JS console when pokemon is clicked in the UI

        function addListItem(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add('pokemonButton');
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);
            addListener(button, pokemon);
            }
        //Create button

        function loadList() {
            return fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
                }).catch(function (e) {
                    console.error(e);
            })
        }
        //Fetch data from pokemon API

        function loadDetails (item) {
            let url = item.detailsUrl;
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (details) {
                //add pokemon details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            }).catch(function (e) {
                console.error(e);
            });
        }

        return {
            getAll: getAll,
            add: add,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails
        };
    
    })();

        pokemonRepository.loadList().then(function() {
            // fetches data from the API and adds each Pokemon in the fetched data to array via add()
        

        pokemonRepository.getAll().forEach(function(pokemon) {
            pokemonRepository.addListItem(pokemon);

        });
    });
