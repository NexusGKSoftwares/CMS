// Fetch posts and populate the homepage
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/posts'); // Replace with your backend route
      const posts = await response.json();
  
      const postsContainer = document.getElementById('posts');
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <img src="${post.image}" alt="${post.title}" />
          <p>${post.content.substring(0, 100)}...</p>
          <a href="/post/${post.slug}">Read more</a>
        `;
        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  });
  