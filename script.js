const catURL = "https://api.thecatapi.com/v1/images/search?size=thumb";

const DOM = {
	resultsContainer: document.querySelector(".js-search_results"),
    searchBtn: document.querySelector(".js-search_btn"),
    inputField: document.querySelector("#number")
}

DOM.searchBtn.addEventListener("click", e => {
console.log(DOM.inputField.value);
    DOM.resultsContainer.innerHTML= "";
	fetchData(catURL)
		.then(res => {
			processResponse(res);
		});
});

function fetchData(url) {
   const myHeaders = new Headers({
      
        'x-api-key': 'ABC123',
      });
      const reqConfig = { method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default' };

      const req = new Request (catURL+"&limit="+DOM.inputField.value, reqConfig);

  return fetch(req).then(response => {
    return response.json();
  }).catch(error => {
    processError();
  })
}

function processResponse(response) {
  /*const dog = Object.create(resultsModel);
  dog.init(response);
    generateImg(dog.url);*/
    for (let i = 0; i < response.length; i++){
        generateImg(response[i].url);
    }
    
};

function processError() {
	DOM.resultsContainer.innerHTML = `<h2>Postoji problem oko dohvaćanja slika!!!</h2>`
}

function generateImg(url) {
	DOM.resultsContainer.innerHTML = DOM.resultsContainer.innerHTML + `<div class="cat-image"> <img src="${url}" alt="Random cat image"></div>`
};