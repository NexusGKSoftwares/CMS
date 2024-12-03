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
  e.preventDefault(); // Prevent the form from submitting normally

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Prepare the data to send
  const data = { username, password };

  try {
    // Send the POST request to register the admin
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json(); // Parse JSON response

    // Display the message on the page
    const messageElement = document.getElementById('message');
    if (response.ok) {
      messageElement.textContent = result.msg;
      messageElement.style.color = 'green';
    } else {
      messageElement.textContent = result.msg;
      messageElement.style.color = 'red';
    }
  } catch (error) {
    // Handle any errors that occur during the fetch request
    document.getElementById('message').textContent = 'An error occurred.';
    document.getElementById('message').style.color = 'red';
  }
});

