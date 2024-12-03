// main.js

// Fetch posts and display them on the homepage
document.addEventListener('DOMContentLoaded', function() {
  fetchPosts();
});

// Function to fetch posts
async function fetchPosts() {
  const postsContainer = document.getElementById('posts');
  try {
    const response = await fetch('mongodb://127.0.0.1:27017/CMS/posts');
    const posts = await response.json();
    postsContainer.innerHTML = posts.map(post => {
      return `
        <div class="post">
          <h2><a href="post.html?id=${post._id}">${post.title}</a></h2>
          <img src="${post.image}" alt="${post.title}">
          <p>${post.content.slice(0, 100)}...</p>
        </div>
      `;
    }).join('');
  } catch (error) {
    postsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
  }
}
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const data = {
    username,
    password,
  };

  try {
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById('message').textContent = result.msg;
      document.getElementById('message').style.color = 'green';
    } else {
      document.getElementById('message').textContent = result.msg;
      document.getElementById('message').style.color = 'red';
    }
  } catch (error) {
    document.getElementById('message').textContent = 'An error occurred.';
    document.getElementById('message').style.color = 'red';
  }
});
