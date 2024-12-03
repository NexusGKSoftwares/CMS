// Handle admin login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        window.location.href = '/admin/dashboard.html'; // Redirect to admin dashboard
      } else {
        const { message } = await response.json();
        document.getElementById('error').textContent = message;
      }
    } catch (error) {
      document.getElementById('error').textContent = 'An error occurred. Please try again.';
    }
  });
  // Fetch and display posts in the admin dashboard
async function fetchPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();
    
    const postList = document.getElementById('postList');
    posts.forEach(post => {
      const li = document.createElement('li');
      li.textContent = `${post.title} - ${post.createdAt}`;
      postList.appendChild(li);
    });
  }
  
  if (window.location.pathname.includes('dashboard.html')) {
    fetchPosts();
  }
  