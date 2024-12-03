// admin.js

// Fetch posts and render them on the admin dashboard
document.addEventListener('DOMContentLoaded', function() {
  fetchPosts();
  document.getElementById('logoutBtn').addEventListener('click', logout);
  document.getElementById('addPostBtn').addEventListener('click', () => {
    window.location.href = 'add_post.html';
  });
});

// Function to fetch posts
async function fetchPosts() {
  const postsList = document.getElementById('postsList');
  const token = localStorage.getItem('jwtToken');

  try {
    const response = await fetch('http://localhost:5000/posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const posts = await response.json();

    postsList.innerHTML = posts.map(post => {
      return `
        <div class="post">
          <h3>${post.title}</h3>
          <button onclick="deletePost('${post._id}')">Delete</button>
          <a href="edit_post.html?id=${post._id}">Edit</a>
        </div>
      `;
    }).join('');
  } catch (error) {
    postsList.innerHTML = '<p>Error fetching posts.</p>';
  }
}

// Function to logout
function logout() {
  localStorage.removeItem('jwtToken');
  window.location.href = '../index.html';
}

// Function to delete a post
async function deletePost(postId) {
  const token = localStorage.getItem('jwtToken');
  try {
    const response = await fetch(`http://localhost:5000/posts/delete/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      alert('Post deleted successfully!');
      fetchPosts(); // Re-fetch posts after deletion
    } else {
      alert('Failed to delete post');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
}
