const addBtn = document.querySelector('#new-toy-btn');
const addToyName = document.querySelector('#add-toy-name');
const addToyImg = document.querySelector('#add-toy-img');
const addToyForm = document.querySelector('.add-toy-form');
const toyForm = document.querySelector('.container');
const toyCollection = document.querySelector('#toy-collection');
const toysURL = "http://localhost:3000/toys";
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch(toysURL)
  .then(resp => resp.json())
  .then(json => {
    for(const toy of json) {
      createToyDiv(toy)
    }
  });
});

function createToyDiv(toy) {
  console.log(toy)
  const div = document.createElement('div');
  div.classList.add('card');
  div.id = toy.id;
  const h2 = document.createElement('h2');
  h2.innerText = toy.name
  const img = document.createElement('img');
  img.classList.add('toy-avatar');
  img.src = toy.image;
  const p = document.createElement('p');
  p.innerText = toy.likes + " likes"
  const btn = document.createElement('button');
  btn.classList.add('like-button');
  btn.innerText = 'Like';
  
  btn.addEventListener('click', increaseLikes)

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(btn);

  toyCollection.appendChild(div);
}

addBtn.addEventListener('click', () => {
  // hide & seek wi the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block';
  } else {
    toyForm.style.display = 'none';
  }
})

addToyForm.addEventListener('submit', event => {
  event.preventDefault();

  let config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': addToyName.value,
      'image': addToyImg.value,
      'likes': 0
    })
  }

  fetch(toysURL, config)
  .then(resp => resp.json())
  .then(json => {
    createToyDiv(json);
  });
});

function increaseLikes() {
  const toyP = this.parentElement.querySelector('p');
  const id = this.parentElement.id;
  const likes = toyP.innerText[0];
  const newLikes = parseInt(likes, 10) + 1;

  const config = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "likes": newLikes
    })
  }
  
  fetch(toysURL + `/${id}`, config)
  .then(res => res.json())
  .then(json => {
    toyP.innerText = newLikes + " likes"
  });
}
