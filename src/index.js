const BASE_URL = "http://localhost:3000/posts";

function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      const list = document.getElementById('post-list');
      list.innerHTML = '';
      posts.forEach(post => {
        const div = document.createElement('div');
        div.textContent = post.title;
        div.style.cursor = "pointer";
        div.addEventListener('click', () => handlePostClick(post.id));
        list.appendChild(div);
      });
    });
}

function handlePostClick(id) {
  fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById('post-detail');
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <small>By ${post.author}</small>
      `;
    });
}

function addNewPostListener() {
  const form = document.getElementById('new-post-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('new-title').value;
    const author = document.getElementById('new-author').value;
    const content = document.getElementById('new-content').value;

    const newPost = { title, author, content };
    
    // Display immediately (core requirement)
    const list = document.getElementById('post-list');
    const div = document.createElement('div');
    div.textContent = title;
    div.style.cursor = "pointer";
    div.addEventListener('click', () => {
      const detail = document.getElementById('post-detail');
      detail.innerHTML = `<h2>${title}</h2><p>${content}</p><small>By ${author}</small>`;
    });
    list.appendChild(div);

    // Advanced: persist with POST
    fetch(BASE_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPost)
    }).then(() => displayPosts());

    form.reset();
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);
