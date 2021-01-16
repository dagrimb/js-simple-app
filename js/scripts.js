


    let pokemonRepository =(function () {
        let pokemonList = [];

        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        //Returns array of all pokemon
        function getAll() {
            return pokemonList; 
        }
        
        //Adds pokemon to array
        function add(pokemon) {
            pokemonList.push(pokemon);
        }

        //Logs details of pokemon to the modal and console
        function showDetails(pokemon) {
            loadDetails(pokemon).then(function () {
                console.log(pokemon);
                showModal(pokemon.name, pokemon.height);
            });
        }
        
        //Create loading message
        function showLoadingMessage() {
            let loadingMessage = console.log("Loading...");
        };            
        
        //Hide loading message
        function hideLoadingMessage() {
            let loadingMessage = null;
        }

        //Show details of pokemon in he JS console when pokemon is clicked in the UI
        function addListener(button, pokemon) {
            button.addEventListener('click', function (event) {
            showDetails(pokemon);
            })
        }

        //Create button
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

        //Fetch data from pokemon API
        function loadList() {
            showLoadingMessage();
            return fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                        add(pokemon);
                        hideLoadingMessage();
                    });
                    }).catch(function (e) {
                        console.error(e);
                        hideLoadingMessage();
                })
            }
            
            function loadDetails (item) {
                showLoadingMessage();
                let url = item.detailsUrl;
                return fetch(url).then(function (response) {
                    return response.json();
                }).then(function (details) {
                    //add pokemon details to the item
                    item.imageUrl = details.sprites.front_default;
                    item.height = details.height;
                    item.types = details.types;
                    hideLoadingMessage();
                }).catch(function (e) {
                    console.error(e);
                    hideLoadingMessage();
                });
            }

            //Create the modal
            function showModal(title, text) {
                let modalContainer = document.querySelector('#modal-container');
                modalContainer.innerHTML = '';

                let modal = document.createElement('div');
                modal.classList.add('modal');
        
                // Add the new modal content
                let closeButtonElement = document.createElement('button');
                closeButtonElement.classList.add('modal-close');
                closeButtonElement.innerText = 'Close';
                closeButtonElement.addEventListener('click', hideModal);

                let titleElement = document.createElement('h1');
                titleElement.innerText = title;

                let contentElement = document.createElement('p');
                contentElement.innerText = text;
       
                modal.appendChild(closeButtonElement);
                modal.appendChild(titleElement);
                modal.appendChild(contentElement);
                modalContainer.appendChild(modal);

                modalContainer.classList.add('is-visible');
            };

                //Hide Modal
                function hideModal() {
                    let modalContainer = document.querySelector('#modal-container');
                    modalContainer.classList.remove('is-visible');
                }

                //Hide Modal when esc key is clicked
                window.addEventListener('keydown', (e) => {
                    let modalContainer = document.querySelector('#modal-container');
                    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                        hideModal();
                    }
                }); 

                modalContainer.addEventListener('click', (e) => {
                    let target = e.target;
                    if (target === modalContainer) {
                        hideModal();
                    }   
                });
        
       
            return {
                getAll: getAll,
                add: add,
                addListItem: addListItem,
                loadList: loadList,
                loadDetails: loadDetails,
                addListener: addListener,
                showModal: showModal
            };
        });

       pokemonRepository.loadList().then(function() {
            //fetches data from the API and adds each Pokemon in the fetched data to array via add()
        
            pokemonRepository.getAll().forEach(function(pokemon) {
                pokemonRepository.addListItem(pokemon);
            });
        });
 
