// assets/js/admin.js

// Function to fetch posts for the admin dashboard
async function fetchPosts() {
  try {
      const response = await fetch('http://localhost:5000/posts'); // Backend URL
      const posts = await response.json(); // Parse the response as JSON

      const postsContainer = document.getElementById('post-cards-container');
      postsContainer.innerHTML = ''; // Clear any existing posts

      // Loop through the posts and create post cards for the admin
      posts.forEach(post => {
          const postCard = document.createElement('div');
          postCard.classList.add('post-card');

          // Create the post card content
          postCard.innerHTML = `
              <h3>${post.title}</h3>
              <p>${post.content.slice(0, 100)}...</p> <!-- Display a short excerpt -->
              <a href="edit_post.html?id=${post._id}" class="btn-edit">Edit</a>
              <a href="delete_post.html?id=${post._id}" class="btn-delete">Delete</a>
          `;

          // Append the post card to the container
          postsContainer.appendChild(postCard);
      });
  } catch (error) {
      console.error('Error fetching posts:', error);
  }
}

// Call the function to fetch posts when the page loads
document.addEventListener('DOMContentLoaded', fetchPosts);
