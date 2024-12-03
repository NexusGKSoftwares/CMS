// assets/js/main.js

// Function to fetch posts from the backend
async function fetchPosts() {
  try {
      const response = await fetch('http://localhost:5000/posts'); // Replace with your actual backend URL
      const posts = await response.json(); // Parse the response as JSON

      const postsContainer = document.getElementById('post-cards-container');
      postsContainer.innerHTML = ''; // Clear any existing posts

      // Loop through the posts and create post cards
      posts.forEach(post => {
          const postCard = document.createElement('div');
          postCard.classList.add('post-card');

          // Insert post content into the card
          postCard.innerHTML = `
              <h3>${post.title}</h3>
              <p>${post.content.slice(0, 100)}...</p> <!-- Display a short excerpt -->
              <a href="#">Read more</a>
          `;

          // Append the card to the container
          postsContainer.appendChild(postCard);
      });
  } catch (error) {
      console.error('Error fetching posts:', error);
  }
}

// Call the function to fetch and display posts when the page loads
document.addEventListener('DOMContentLoaded', fetchPosts);
