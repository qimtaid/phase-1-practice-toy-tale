let addToy = true;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  fetchToys();
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
      const toyCollection = document.getElementById('toy-collection');
      data.forEach(toy => {
          const card = document.createElement('div');
          card.classList.add('card');

          const name = document.createElement('h2');
          name.textContent = toy.name;

          const image = document.createElement('img');
          image.src = toy.image;
          image.classList.add('toy-avatar');

          const likes = document.createElement('p');
          likes.textContent = toy.likes + ' Likes';

          const likeButton = document.createElement('button');
          likeButton.classList.add('like-btn');
          likeButton.id = toy.id;
          likeButton.textContent = 'Like ❤️';

          card.appendChild(name);
          card.appendChild(image);
          card.appendChild(likes);
          card.appendChild(likeButton);

          toyCollection.appendChild(card);
      });
  })
  .catch(error => console.error('Error fetching toys:', error));
}


document.addEventListener("DOMContentLoaded", function() {
  fetchToys();
  document.getElementById('toy-form').addEventListener('submit', handleFormSubmit);
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
      const toyCollection = document.getElementById('toy-collection');
      data.forEach(toy => {
          renderToy(toy);
      });
  })
  .catch(error => console.error('Error fetching toys:', error));
}

function renderToy(toy) {
  const toyCollection = document.getElementById('toy-collection');

  const card = document.createElement('div');
  card.classList.add('card');

  const name = document.createElement('h2');
  name.textContent = toy.name;

  const image = document.createElement('img');
  image.src = toy.image;
  image.classList.add('toy-avatar');

  const likes = document.createElement('p');
  likes.textContent = toy.likes + ' Likes';

  const likeButton = document.createElement('button');
  likeButton.classList.add('like-btn');
  likeButton.id = toy.id;
  likeButton.textContent = 'Like ❤️';
  likeButton.addEventListener('click', handleLike);

  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(likeButton);

  toyCollection.appendChild(card);
}

function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const image = document.getElementById('image').value;

  const formData = {
      name: name,
      image: image,
      likes: 0
  };

  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      renderToy(data);
      event.target.reset();
  })
  .catch(error => console.error('Error adding toy:', error));
}

function handleLike(event) {
  const toyId = event.target.id;
  const likesElement = event.target.previousSibling;
  const currentLikes = parseInt(likesElement.textContent);
  const newLikes = currentLikes + 1;

  fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          "likes": newLikes
      })
  })
  .then(response => response.json())
  .then(data => {
      likesElement.textContent = newLikes + ' Likes';
  })
  .catch(error => console.error('Error updating likes:', error));
}