// assets/js/delete_post.js

// Get the post ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');  // Get the ID from the URL

// Function to fetch the post data and display its details
async function fetchPostData() {
    try {
        const response = await fetch(`http://localhost:5000/posts/${postId}`);
        const post = await response.json();

        // Display the post details
        document.getElementById('post-details').innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content.slice(0, 100)}...</p>
        `;
    } catch (error) {
        console.error('Error fetching post data:', error);
    }
}

// Function to handle post deletion
async function handleDeletePost() {
    try {
        const response = await fetch(`http://localhost:5000/posts/delete/${postId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        alert('Post deleted successfully!');
        window.location.href = 'dashboard.html'; // Redirect to the dashboard
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete the post.');
    }
}

// Call the fetchPostData function when the page loads
document.addEventListener('DOMContentLoaded', fetchPostData);

// Attach the delete function to the button
document.getElementById('delete-btn').addEventListener('click', handleDeletePost);
