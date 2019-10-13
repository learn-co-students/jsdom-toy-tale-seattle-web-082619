document.addEventListener("DOMContentLoaded", () => {
  main()
})

function main() {
  getToys()
  addNewToy()
  patchToyLikes()
}

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const URL = 'http://localhost:3000/toys'

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


function getToys(){
  fetch(URL)
  .then(response => response.json())
  .then(json => {
    iterateOverToy(json); 
  })
}

function iterateOverToy(toy){
  for (let i = 0; i <toy.length; i++){
    addToyToPage(toy[i]);
  }
}


function addToyToPage(toy) {

  const cardDiv = document.createElement('div');  
  cardDiv.classList.add("card");
  const h2 = document.createElement('h2');

  const name = toy.name;
  h2.innerText = name;
  const toyImage = document.createElement('img');
  toyImage.classList.add("toy-avatar");
  const image = toy.image;

  toyImage.setAttribute('src', image);
  toyImage.setAttribute('alt',name);

  
  const p = document.createElement('p');
  const button = document.createElement('button');
  button.innerText = "like <3";
  button.classList.add("like-btn");
  

  if((!toy.likes) || (toy.likes === 0)){
    p.textContent = `0 likes`;
  } else {
    p.textContent =  `${toy.likes} likes`;
  }
  



  button.addEventListener('click', (event) => {
    patchToyLikes(toy, p)
  })


  const toyCollection = document.getElementById("toy-collection");
  cardDiv.appendChild(h2);
  cardDiv.appendChild(toyImage);
  cardDiv.appendChild(p);
  cardDiv.appendChild(button);

  toyCollection.appendChild(cardDiv);

}


function patchToyLikes(toy, p){
  toy.likes += 1;

  let config = {
    method: 'PATCH',
    headers:{
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  }


  fetch(`${URL}/${toy.id}`,config)
  .then(response => response.json())
  .then(returnedJson => {
    p.textContent =  `${toy.likes} likes`;
  })
}




function addNewToy(){

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = event.target.elements.name.value;
    const image = event.target.elements.image.value;

    let config = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        image: image
      }) 
    }
    fetch(URL, config)
    .then(res => res.json())
    .then(json => {
      addToyToPage(json);
    })
  })
}
